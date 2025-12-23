<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configuration
$recipient = 'officiallyiraid@gmail.com';
$site_name = 'IRAID';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $post_data = json_decode(file_get_contents('php://input'), true);
    
    if ($post_data) {
        $name = isset($post_data['name']) ? strip_tags(trim($post_data['name'])) : '';
        $email = isset($post_data['email']) ? strip_tags(trim($post_data['email'])) : '';
        $phone = isset($post_data['number']) ? strip_tags(trim($post_data['number'])) : '';
        $message = isset($post_data['message']) ? strip_tags(trim($post_data['message'])) : '';
    } else {
        // Fallback to traditional POST data
        $name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
        $email = isset($_POST['email']) ? strip_tags(trim($_POST['email'])) : '';
        $phone = isset($_POST['number']) ? strip_tags(trim($_POST['number'])) : '';
        $message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';
    }

    // Validate form data
    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo json_encode(['message' => 'Please fill in all required fields.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['message' => 'Please enter a valid email address.']);
        exit;
    }

    // Prepare email
    $subject = "New Contact Form Submission from $site_name";
    
    $email_content = "You have received a new message from your website contact form.\n\n";
    $email_content .= "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone: $phone\n\n";
    $email_content .= "Message:\n$message\n";

    // HTML version of the email
    $email_html = "
    <html>
    <head>
        <title>New Contact Form Submission</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 20px auto; padding: 20px; }
            .header { background: #1A685B; color: white; padding: 20px; }
            .content { padding: 20px; }
            .field { margin-bottom: 10px; }
            .label { font-weight: bold; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Contact Form Submission</h2>
            </div>
            <div class='content'>
                <div class='field'>
                    <span class='label'>Name:</span> $name
                </div>
                <div class='field'>
                    <span class='label'>Email:</span> $email
                </div>
                <div class='field'>
                    <span class='label'>Phone:</span> $phone
                </div>
                <div class='field'>
                    <span class='label'>Message:</span><br>
                    " . nl2br($message) . "
                </div>
            </div>
        </div>
    </body>
    </html>";

    // Email headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Send email
    if (mail($recipient, $subject, $email_html, $headers)) {
        http_response_code(200);
        echo json_encode(['message' => 'Thank you! Your message has been sent.']);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Oops! Something went wrong, please try again later.']);
    }
} else {
    http_response_code(403);
    echo json_encode(['message' => 'There was a problem with your submission, please try again.']);
}
?>