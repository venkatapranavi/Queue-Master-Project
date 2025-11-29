package com.queueapp.queue_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailNotificationService {

    private final JavaMailSender mailSender;

    @Autowired
    public EmailNotificationService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendTokenNotification(String toEmail, int tokenNumber, String counterNumber, String createdAt, int estimatedWaitTime) {
        String subject = "Queue Token Confirmation - Token #" + tokenNumber;
        String message = "Hello,\n\n" +
                "Thank you for joining the queue. Here are your details:\n\n" +
                "🔹 Token Number: " + tokenNumber + "\n" +
                "🔹 Assigned Counter: " + counterNumber + "\n" +
                "🔹 Time of Entry: " + createdAt + "\n" +
                "⏳ Estimated Wait Time: " + estimatedWaitTime + " minutes\n\n" +
                "You'll be notified when it's your turn.\n\n" +
                "Regards,\nQueue Management System";

        sendEmail(toEmail, subject, message);
    }

    public void sendCompletionNotification(String toEmail, int tokenNumber) {
        String subject = "Queue Service Completed";
        String message = "Hello,\n\n" +
                "Your queue token #" + tokenNumber + " has been marked as completed.\n\n" +
                "Thank you for visiting.\n\n" +
                "Regards,\nQueue Management System";

        sendEmail(toEmail, subject, message);
    }

    private void sendEmail(String to, String subject, String text) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("your-email@gmail.com");
        mailMessage.setTo(to);
        mailMessage.setSubject(subject);
        mailMessage.setText(text);

        mailSender.send(mailMessage);
    }
}
