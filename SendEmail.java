import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;

public class tesMePls {
   public void email(String sendTo, String product, double price, String url){
      // Recipient's email ID needs to be mentioned.
      String to = sendTo;

      // Sender's email ID needs to be mentioned
      //no real email yet
      final String from = "emailjavatext@gmail.com";
      final String fromPassword = "CS321Team8CKMS";

      // Sets up the Email Properties
      Properties properties = new Properties();
      properties.put("mail.smtp.auth","true");
      properties.put("mail.smtp.starttls.enable", "true");
      properties.put("mail.smtp.host", "smtp.gmail.com");
      properties.put("mail.smtp.port","587");


      // Set the Session properties
      Session session = Session.getInstance(properties, new Authenticator() {
          @Override
          protected PasswordAuthentication getPasswordAuthentication() {
              return new PasswordAuthentication(from,fromPassword);
          }
      });
      
      try {
         // Create a default MimeMessage object.
         MimeMessage message = new MimeMessage(session);

         // Set From: header field of the header.
         message.setFrom(new InternetAddress(from));

         // Set To: header field of the header.
         message.setRecipient(Message.RecipientType.TO, new InternetAddress(to));

         // Set Subject: header field
         message.setSubject("Price Monitor FeedBack");

         // Now set the actual message
         message.setText("The Product " + product +" has fallen bellow your requested price to " + price + "\n" + url);

         // Send message
         Transport.send(message);
         
      } catch (Exception e) {
         e.printStackTrace();
      }
   }
   
}