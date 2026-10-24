<?php
// Prevent direct access to this file
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // -------------------------------------------------------------
    // 1. Recipient Email Address
    // -------------------------------------------------------------
    $to_email = "inexterior123@gmail.com";

    // -------------------------------------------------------------
    // 2. Get and Sanitize Form Data
    // -------------------------------------------------------------
    $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $email    = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    $subject  = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $message  = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_FULL_SPECIAL_CHARS);

    // -------------------------------------------------------------
    // 3. Form Validation
    // -------------------------------------------------------------
    if (empty($username) || empty($email) || empty($subject) || empty($message)) {
        echo "<script>
                alert('Please fill in all required fields.');
                window.history.back();
              </script>";
        exit;
    }

    if (!$email) {
        echo "<script>
                alert('Please enter a valid email address.');
                window.history.back();
              </script>";
        exit;
    }

    // -------------------------------------------------------------
    // 4. Email Subject and Body
    // -------------------------------------------------------------
    $email_subject = "New Contact Form Message: " . $subject;

    $email_body  = "You have received a new message from your website contact form.\n\n";
    $email_body .= "--------------------------------------------------\n";
    $email_body .= "Name:    " . $username . "\n";
    $email_body .= "Email:   " . $email . "\n";
    $email_body .= "Subject: " . $subject . "\n";
    $email_body .= "--------------------------------------------------\n\n";
    $email_body .= "Message:\n" . $message . "\n";

    // -------------------------------------------------------------
    // 5. Email Headers
    // -------------------------------------------------------------
    $headers  = "From: Website Contact Form <noreply@" . $_SERVER['HTTP_HOST'] . ">\r\n";
    $headers .= "Reply-To: " . $username . " <" . $email . ">\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // -------------------------------------------------------------
    // 6. Send Email
    // -------------------------------------------------------------
    if (mail($to_email, $email_subject, $email_body, $headers)) {
        echo "<script>
                alert('Thank you! Your message has been sent successfully.');
                window.location.href = 'index.html';
              </script>";
    } else {
        echo "<script>
                alert('Failed to send your message. Please try again later.');
                window.history.back();
              </script>";
    }

} else {
    // Redirect if accessed directly
    header("Location: index.html");
    exit;
}
?>