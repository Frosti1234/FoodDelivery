package com.mar.fooddelivery.utilities;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmailUtility {
    private final JavaMailSender emailSender;

    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("fooddelivery123777@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }

    public void sendAccountDataMail(String to, String password) throws MessagingException, MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom("fooddelivery123777@gmail.com");
        helper.setTo(to);
        String subject = "Your account data";
        helper.setSubject(subject);
        String htmlMessage = "Account data:" +
                "Email: " + to + "Password:" + password +
                "<a href=\"http://localhost:4200/\"> link</a></p>";
        message.setContent(htmlMessage, "text/html");
        emailSender.send(message);
    }
}