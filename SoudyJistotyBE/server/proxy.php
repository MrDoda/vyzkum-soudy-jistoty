<?php

// Configuration
$nodeServerURL = 'http://103.45.247.81:8080'; // URL of your Node.js server

// Prepare the request headers
$requestHeaders = [];
foreach (getallheaders() as $name => $value) {
    $requestHeaders[] = "$name: $value";
}

// Prepare the request method, URL, and headers
$context = [
    'http' => [
        'method' => $_SERVER['REQUEST_METHOD'],
        'header' => implode("\r\n", $requestHeaders),
        'content' => file_get_contents('php://input'), // Forward the request body
        'ignore_errors' => true, // Fetch the response even if it's a 4xx/5xx
    ],
];

// Remove the first occurrence of 'api/' from the REQUEST_URI
$modifiedUri = preg_replace('/api\//', '', $_SERVER['REQUEST_URI'], 1);

// Forward query parameters
$queryString = $_SERVER['QUERY_STRING'];
$url = $nodeServerURL . $modifiedUri . (!empty($queryString) ? '?' . $queryString : '');

// Use stream_context_create() to create a context with the specified options
$context = stream_context_create($context);

// Use file_get_contents() to make the request
$response = file_get_contents($url, false, $context);

// Forward the response headers
foreach ($http_response_header as $header) {
    header($header);
}

// Return the response body
echo $response;
