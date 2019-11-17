import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.Date;
import java.util.Scanner;
import java.util.Timer;
import java.util.TimerTask;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Attributes;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/** to do
 *  item name from user
 *  exception 
 */

/**
 * 
 * @author Steven Yun
 * @date November 11 2019
 * @version 1.5
 * 
 *          Prompts user for url of the item they wish to track. Program works
 *          with urls from amazon.com, walmart.com and bestbuy.com. The prices
 *          will be written to a file every hour along with the current date at
 *          the time of the price update.
 */
public class HTMLscraper extends TimerTask {

    /**
     * Given a url, return an int to use in switch statement matching website If url
     * is not from one of predetermined urls, print error message and exit program
     * 
     * @param String url
     * @return int to match site to scrape
     */
    private int siteID(String url) {
        int ans = 0;
        if (url.contains("amazon.com")) {
            ans = 1;
        } else if (url.contains("walmart.com")) {
            ans = 2;
        } else if (url.contains("bestbuy.com")) {
            ans = 3;
        }

        return ans;
    }

    /**
     * Returns the current price of an item the user wishes to track
     * 
     * @param int    siteNum site: to scrape
     * @param String url: of item
     * @return BigDecimal object that has current price of item
     */
    private double getPrice(int siteNum, String url) {
        double currPrice;
        switch (siteNum) {
        case 1:
            try {
                Document page = Jsoup.connect(url).userAgent("user").get();
                Elements price = page.select(".a-size-medium.a-color-price:contains($)");
                System.out.println("The current price of your item is: " + price.get(0).text());

                // convert string to a price format, number object
                String temp = price.get(0).text().substring(1);
                currPrice = Double.parseDouble(temp); // for comparison
                return currPrice;
            } catch (Exception e) {
                e.printStackTrace();
            }
            break;
        case 2:
            try {
                Document page = Jsoup.connect(url).userAgent("user").get();
                Elements price = page.select(".price.display-inline-block.arrange-fit.price--stylized:contains($)");
                
                // convert string to a price format, number object
                String temp = price.get(0).text().substring(1);
                currPrice = Double.parseDouble(temp); // for comparison
                return currPrice;
            } catch (Exception e) {
                e.printStackTrace();
            }
            break;
        case 3:
            try {

                Document page = Jsoup.connect(url).userAgent("user").get();
                Elements price = page.select(".priceView-hero-price.priceView-customer-price");

                // convert string to a price format, number object
                String temp = price.get(0).text().substring(1);
                currPrice = Double.parseDouble(temp); // for comparison
                return currPrice;
                
            } catch (Exception e) {
                e.printStackTrace();
            }
            break;
        }
        return -1.0;
    }

    /**
     * Attempts to create a file, if file already exists creates a new file
     * 
     * @param name of item from user
     * @return finalFile, name of file
     */
    private String createFile(String itemX) {
        // file name is item name
        String finalFile = "";
        try {
            int nameCount = 0;
            String filename = itemX + ".txt";
            String itemName = itemX;
            File temp = new File(filename);
            boolean x = temp.exists();
            while (x == true) {
                nameCount++;
                filename = itemName + nameCount + ".txt";
                temp = new File(filename);
                x = temp.exists();
            }
            finalFile = filename;
            FileWriter fw = new FileWriter(filename);
            fw.close();
        } catch (Exception e) {
            System.out.println(e);
        }
        System.out.println("\nFile for price history has been created.");
        System.out.println("File name: " + finalFile + "\n");
        return finalFile;
    }

    /**
     * Writes the current price of the item and current date to file
     * 
     * @param f: file name
     * @param p: price
     */
    private void writeToFile(String f, BigDecimal p) {

        Date now = new Date();
        try {
            FileWriter fw = new FileWriter(f, true);
            fw.write(p.toString() + "\t" + now + "\n"); // format: price "tab" date "newline"
            fw.close();
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public double scrapeItem(String name, String url) {
        int site = siteID(url);
        double price = getPrice(site, url);
        int inside = 0;
        //update  items.txt
        if(price != -1.0){
            try{
                BufferedReader file = new BufferedReader(new FileReader("./items.txt"));
                StringBuffer inputBuffer = new StringBuffer();
                String line;
                while((line = file.readLine()) != null){
                    if(line.toLowerCase().contains(name.toLowerCase())){
                        String[] newLine = line.split(",");
                        newLine[1] = "$" + Double.toString(price);
                        String newString = newLine[0] + "," + newLine[1] + "," + newLine[2] + "\n";
                        inputBuffer.append(newString);
                        inside = 1;
                    }else{
                        inputBuffer.append(line + '\n');
                    }
                }
                file.close();
                if(inside == 0){
                    String newVal = name + "," + price + "," + url + "\n";
                    inputBuffer.append(newVal);
                }
                BufferedWriter file2 = new BufferedWriter(new FileWriter("./items.txt"));
                file2.write(inputBuffer.toString());
                file2.flush();
                file2.close();
            }catch(Exception e){
                // DIE
            }
        }

        return price;
    }

    public List<ScrapeItem> getItemsToScrape() {
        List<ScrapeItem> items = new ArrayList<>();

        try {
            BufferedReader fr = new BufferedReader(new FileReader("./scrapingitems.txt"));

            String line;

            while ((line = fr.readLine()) != null) {
                String[] parts = line.split(",");
                items.add(new ScrapeItem(parts[0], parts[1]));
            }
            fr.close();
        } catch (IOException ex) {
            // DIE
        }

        return items;
    }

    public List<NotifyTarget> getNotifyTargets() {
        List<NotifyTarget> targets = new ArrayList<>();

        try {
            BufferedReader fr = new BufferedReader(new FileReader("./notifytargets.txt"));

            String line;

            while ((line = fr.readLine()) != null) {
                String[] parts = line.split(",");
                targets.add(new NotifyTarget(parts[0], parts[1], parts[2]));
            }
            fr.close();
        } catch (IOException ex) {
            // DIE
        }

        return targets;
    }

    @Override
    public void run() {
        PriceCompare comparator = new PriceCompare();
        SendEmail emailer = new SendEmail();

        for (ScrapeItem i : getItemsToScrape()) {
            scrapeItem(i.name, i.site);
        }

        for (NotifyTarget target : getNotifyTargets()) {
            if (comparator.comparePrice(target.targetPrice, target.name)) {
                emailer.email(target.email, target.name);
            }
        }
        // all item name + asking price + email
        // loop over all throught items.txt
    }

    
    
    
}