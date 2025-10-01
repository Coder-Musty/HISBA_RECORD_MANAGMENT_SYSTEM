<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once './includes/db_conn.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set content type to JSON
header('Content-Type: application/json');
header('Content-Allowed-Method: POST');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $fullname = trim($_POST['FullName']);
    $nin = trim($_POST['nin']);
    $email = trim($_POST['email']); // Note: You'll need to add email field to your HTML
    $phone = trim($_POST['phone']);
    $address = trim($_POST['Address']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    
    // Initialize response array
    $response = array('success' => false, 'message' => '', 'errors' => array());
    
    // Validate form data
    $errors = array();
    
    // Validate Full Name
    if (empty($fullname)) {
        $errors['FullName'] = "Full Name is required";
    } elseif (strlen($fullname) > 50) {
        $errors['FullName'] = "Full Name must be less than 50 characters";
    }
    
    // Validate NIN
    if (empty($nin)) {
        $errors['nin'] = "NIN is required";
    } elseif (!is_numeric($nin) || strlen($nin) != 11) {
        $errors['nin'] = "NIN must be 11 digits";
    }
    
    // Validate Phone
    if (empty($phone)) {
        $errors['phone'] = "Phone number is required";
    }
    
    // Validate Address
    if (empty($address)) {
        $errors['Address'] = "Address is required";
    } elseif (strlen($address) > 50) {
        $errors['Address'] = "Address must be less than 50 characters";
    }
    
    // Validate Password
    if (empty($password)) {
        $errors['password'] = "Password is required";
    } elseif (strlen($password) < 8) {
        $errors['password'] = "Password must be at least 8 characters long";
    } elseif (!preg_match('/[A-Z]/', $password)) {
        $errors['password'] = "Password must contain at least one uppercase letter";
    } elseif (!preg_match('/[0-9]/', $password)) {
        $errors['password'] = "Password must contain at least one number";
    } elseif (!preg_match('/[^A-Za-z0-9]/', $password)) {
        $errors['password'] = "Password must contain at least one special character";
    }
    
    // Validate Confirm Password
    if ($password !== $confirm_password) {
        $errors['confirm_password'] = "Passwords do not match";
    }
    
    // Check if email already exists (you'll need to add email field to your form)
    if (!empty($email)) {
        $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();
        
        if ($stmt->num_rows > 0) {
            $errors['email'] = "Email already exists";
        }
        $stmt->close();
    }
    
    // Check if NIN already exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE nin = ?");
    $stmt->bind_param("s", $nin);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows > 0) {
        $errors['nin'] = "NIN already registered";
    }
    $stmt->close();
    
    // If there are errors, return them
    if (!empty($errors)) {
        $response['success'] = false;
        $response['message'] = 'Please fix the errors below';
        $response['errors'] = $errors;
        echo json_encode($response);
        exit;
    }
    
    // Hash password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    // Default role for new users
    $role = 'regular';
    
    // Insert user into database
    $stmt = $conn->prepare("INSERT INTO users (fullname, nin, email, phone, address, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sisssss", $fullname, $nin, $email, $phone, $address, $hashed_password, $role);
    
    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = 'Account created successfully! You can now login.';
    } else {
        $response['success'] = false;
        $response['message'] = 'Error creating account: ' . $stmt->error;
    }
    
    $stmt->close();
    $conn->close();
    
    echo json_encode($response);
    exit;
}
?>