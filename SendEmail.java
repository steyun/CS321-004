
import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;
import javax.activation.*;

public class SendEmail {
   
   public void email(String e, String product){
      // Recipient's email ID needs to be mentioned.
      String to = e;

      // Sender's email ID needs to be mentioned
      //no real email yet
      String from = "web@gmail.com";

      // Assuming you are sending email from localhost
      String host = "localhost";

      // Get system properties
      Properties properties = System.getProperties();

      // Setup mail server
      properties.setProperty("mail.smtp.host", host);

      // Get the default Session object.
      Session session = Session.getDefaultInstance(properties);

      try {
         // Create a default MimeMessage object.
         MimeMessage message = new MimeMessage(session);

         // Set From: header field of the header.
         message.setFrom(new InternetAddress(from));

         // Set To: header field of the header.
         message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));

         // Set Subject: header field
         message.setSubject("Price Monitor FeedBack");

         // Now set the actual message
         message.setText("The Product " + product +" has fallen bellow your requested price");

         // Send message
         Transport.send(message);
         System.out.println("Sent message successfully....");
         
      } catch (MessagingException mex) {
         mex.printStackTrace();
      }
   }
}
