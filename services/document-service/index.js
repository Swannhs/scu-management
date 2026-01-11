const { createApp } = require('./src/app');
const pool = require('./src/db');
const { startOutboxWorker } = require('./src/outbox');

const port = process.env.PORT || 3000;

const app = createApp({ pool });

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Document service listening at http://localhost:${port}`);
  });

  startOutboxWorker(pool);
}

module.exports = { app, createApp };
