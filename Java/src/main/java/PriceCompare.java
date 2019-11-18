import java.io.*;

public class PriceCompare {
  public boolean comparePrice(double targetPrice, String itemName) {
      System.out.println(targetPrice + " | " + itemName);
    try {
      BufferedReader fr = new BufferedReader(new FileReader("./items.txt"));
      String line;

      while ((line = fr.readLine()) != null) {
        String[] parts = line.split(",");
        String item = parts[0];
        String price = parts[1];
        if(price.contains("$")){
            price = price.substring(1);
        }
        if (item.toLowerCase().equals(itemName.toLowerCase())) {
            System.out.println(price + " | " + targetPrice + " | " + item);
          return Double.parseDouble(price) <= targetPrice;
        }
      } 
      fr.close();
    } catch(Exception e) {
      // DIE
    }
    return false;
  }
}