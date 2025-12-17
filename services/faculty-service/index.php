<?php
$service = getenv('SERVICE_NAME') ?: 'php-service';
$response = [
    'service' => $service,
    'message' => 'Stub service running. Replace with Laravel implementation.'
];
header('Content-Type: application/json');
echo json_encode($response);
