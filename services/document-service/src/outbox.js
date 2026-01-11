const amqp = require('amqplib');

const EXCHANGE_NAME = 'university_events';

const createOutboxEvent = async (client, { tenantId, eventType, payload }) => {
  const query = `
    INSERT INTO event_outbox (tenant_id, event_type, payload)
    VALUES ($1, $2, $3)
    RETURNING id
  `;
  const result = await client.query(query, [tenantId, eventType, payload]);
  return result.rows[0];
};

const buildEventPayload = (event) => ({
  eventId: event.id,
  tenantId: event.tenant_id,
  occurredAt: event.created_at.toISOString(),
  payload: event.payload,
});

const createPublisher = async (rabbitUrl) => {
  const connection = await amqp.connect(rabbitUrl);
  const channel = await connection.createChannel();
  await channel.assertExchange(EXCHANGE_NAME, 'topic', { durable: true });

  return {
    async publish(event) {
      const payload = Buffer.from(JSON.stringify(buildEventPayload(event)));
      channel.publish(EXCHANGE_NAME, event.event_type, payload, { persistent: true });
    },
    async close() {
      await channel.close();
      await connection.close();
    },
  };
};

const publishPendingEvents = async (pool, publisher) => {
  const { rows: events } = await pool.query(
    `
      SELECT id, tenant_id, event_type, payload, created_at, retries
      FROM event_outbox
      WHERE status = 'PENDING'
      ORDER BY created_at ASC
      LIMIT 50
    `,
  );

  if (events.length === 0) return;

  for (const event of events) {
    try {
      await publisher.publish(event);
      await pool.query(
        `
          UPDATE event_outbox
          SET status = 'PUBLISHED', published_at = NOW()
          WHERE id = $1
        `,
        [event.id],
      );
    } catch (error) {
      const retries = event.retries + 1;
      const status = retries > 5 ? 'FAILED' : 'PENDING';
      await pool.query(
        `
          UPDATE event_outbox
          SET status = $2, retries = $3, last_error = $4
          WHERE id = $1
        `,
        [event.id, status, retries, error.message],
      );
    }
  }
};

const startOutboxWorker = (pool) => {
  const rabbitUrl = process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672';
  let publisherPromise = null;

  const getPublisher = async () => {
    if (!publisherPromise) {
      publisherPromise = createPublisher(rabbitUrl);
    }
    return publisherPromise;
  };

  const intervalMs = Number(process.env.OUTBOX_POLL_INTERVAL_MS || 5000);

  const timer = setInterval(async () => {
    try {
      const publisher = await getPublisher();
      await publishPendingEvents(pool, publisher);
    } catch (error) {
      console.error('Outbox worker error', error);
      publisherPromise = null;
    }
  }, intervalMs);

  return () => clearInterval(timer);
};

module.exports = {
  createOutboxEvent,
  publishPendingEvents,
  startOutboxWorker,
};
