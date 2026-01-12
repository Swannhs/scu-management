import json
import os
import threading
import time

import pika
from sqlalchemy.orm import Session

import database
from models import EventOutbox

RABBITMQ_URL = os.getenv("RABBITMQ_URL", "amqp://guest:guest@rabbitmq:5672")

def enqueue_event(db: Session, tenant_id: str, event_type: str, payload: dict) -> EventOutbox:
    outbox = EventOutbox(
        tenant_id=tenant_id,
        event_type=event_type,
        payload=payload,
        status="PENDING",
        retries=0
    )
    db.add(outbox)
    return outbox

def _publish_event(event: EventOutbox) -> None:
    connection = pika.BlockingConnection(pika.URLParameters(RABBITMQ_URL))
    channel = connection.channel()

    channel.exchange_declare(exchange="university_events", exchange_type="topic", durable=True)
    channel.basic_publish(
        exchange="university_events",
        routing_key=event.event_type,
        body=json.dumps(event.payload),
        properties=pika.BasicProperties(delivery_mode=2),
    )
    connection.close()

def process_outbox_batch() -> None:
    db = database.SessionLocal()
    try:
        pending_events = db.query(EventOutbox).filter(EventOutbox.status == "PENDING").order_by(EventOutbox.created_at.asc()).limit(50).all()
        for event in pending_events:
            try:
                _publish_event(event)
                event.status = "PUBLISHED"
            except Exception:
                event.status = "FAILED"
                event.retries = event.retries + 1
            db.add(event)
        db.commit()
    finally:
        db.close()

def start_outbox_worker() -> None:
    def _worker_loop():
        while True:
            process_outbox_batch()
            time.sleep(5)

    thread = threading.Thread(target=_worker_loop, daemon=True)
    thread.start()
