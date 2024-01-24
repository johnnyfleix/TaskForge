<?php
// Connect to your database (replace placeholders with your credentials)
$conn = new mysqli("your_hostname", "your_username", "your_password", "your_database");

// Check for connection errors
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve submitted username and password (using prepared statements for security)
$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$username = $_POST["username"];
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

// Verify password using password_verify()
if ($row && password_verify($_POST["password"], $row["password"])) {
    // Login successful
    session_start(); // Start session for user authentication
    $_SESSION["user_id"] = $row["id"]; // Store user ID in session
    header("Location: protected_page.php"); // Redirect to protected page
} else {
    // Login failed
    echo "Invalid username or password.";
}

$stmt->close();
$conn->close();
?>
