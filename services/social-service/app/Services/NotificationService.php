<?php

namespace App\Services;

use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

class NotificationService
{
    protected $connection;
    protected $channel;

    public function __construct()
    {
        $host = env('RABBITMQ_HOST', 'rabbitmq');
        $port = env('RABBITMQ_PORT', 5672);
        $user = env('RABBITMQ_USER', 'guest');
        $pass = env('RABBITMQ_PASSWORD', 'guest');

        try {
            $this->connection = new AMQPStreamConnection($host, $port, $user, $pass);
            $this->channel = $this->connection->channel();
            $this->channel->queue_declare('notifications', false, true, false, false);
        } catch (\Exception $e) {
            // Log error or handle gracefully if RabbitMQ is down
            // In production, we'd use a robust connection manager
        }
    }

    public function sendNotification(array $data)
    {
        if (!$this->channel) {
            return;
        }

        $msg = new AMQPMessage(json_encode($data), ['delivery_mode' => AMQPMessage::DELIVERY_MODE_PERSISTENT]);
        $this->channel->basic_publish($msg, '', 'notifications');
    }

    public function __destruct()
    {
        if ($this->channel) {
            $this->channel->close();
        }
        if ($this->connection) {
            $this->connection->close();
        }
    }
}
