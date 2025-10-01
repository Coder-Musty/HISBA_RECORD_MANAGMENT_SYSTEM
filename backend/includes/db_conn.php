<?php
// Database configuration
$host = 'localhost';
$db_name = 'hrms'; 
$username = 'root';
$password = '';

// Create a database connection
$conn = new mysqli($host, $username, $password, $db_name);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
