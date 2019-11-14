import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.Date;
import java.util.Scanner;
import java.util.Timer;
import java.util.TimerTask;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Attributes;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;


/**
 * 
 * @author Steven Yun
 * @date November 11 2019
 *  
 * Prompts user for url of the item they wish to track. Program works with urls from amazon.com, walmart.com and bestbuy.com.
 * The prices will be written to a file every hour along with the current date at the time of the price update. 
 */
public class HTMLscraper extends TimerTask {
	
	// decides case from user inputted url
	private static int siteID(String url)
	{
		int ans = 0;
		if(url.contains("amazon.com"))
		{
			ans = 1;
		}
		else if(url.contains("walmart.com"))
		{
			ans = 2;
		}
		else if(url.contains("bestbuy.com"))
		{
			ans = 3;	
		}
		return ans;
	}
	
	// prompts user for input for url
	private static String readInput()
	{
		@SuppressWarnings("resource")
		Scanner input = new Scanner(System.in);
		System.out.println("Please enter the url: ");
		String url = input.nextLine();
		return url;
	}
	
	// returns the price from a given site and its url, price stored in BigDecimal object
	private static BigDecimal getPrice(int siteNum, String url)
	{
		BigDecimal currPrice;
		switch(siteNum) {
		case 1:
			try {
		
				Document page = Jsoup.connect(url).userAgent("user").get();
				Elements price = page.select(".a-size-medium.a-color-price:contains($)");
				
				System.out.println("The current price of your item is: " + price.get(0).text());
				
				// convert string to a price format, number object
				String temp = price.get(0).text();
				NumberFormat fixedPrice = NumberFormat.getCurrencyInstance();
				Number num = fixedPrice.parse(temp);
				currPrice = new BigDecimal(num.toString()); // for comparison
				return currPrice;
			}
			catch(Exception e) {
				e.printStackTrace();
			}
			break;
		case 2:
			try {
				
				Document page = Jsoup.connect(url).userAgent("user").get();
	
				Elements price = page.select(".price.display-inline-block.arrange-fit.price--stylized:contains($)");
	
				// convert string to a price format, number object
				String temp = price.get(0).text();
				int len = temp.length()/2;
				String temp1 = temp.substring(0,len);
				System.out.println("The current price of your item is: " + temp1);
				NumberFormat fixedPrice = NumberFormat.getCurrencyInstance();
				Number num = fixedPrice.parse(temp1); 
				
				currPrice = new BigDecimal(num.toString()); // for comparison
				return currPrice;
			}
			catch(Exception e) {
				e.printStackTrace();
			}
			break;
			
		case 3:
			try {
				
				Document page = Jsoup.connect(url).userAgent("user").get();
				Elements price = page.select(".priceView-hero-price.priceView-customer-price");
				
				// convert string to a price format, number object
				String temp = price.text();
				

				NumberFormat fixedPrice = NumberFormat.getCurrencyInstance();
				Number num = fixedPrice.parse(temp);				
				currPrice = new BigDecimal(num.toString()); // for comparison
				System.out.println("The current price of your item is: $" + currPrice);

				return currPrice;
			}
			catch(Exception e) {
					e.printStackTrace();
			}
			break;
		}
		return currPrice = new BigDecimal("NULL");
	}
	
	// creates a new file for an item, if file already exists creates a new file
	public static String createFile() {
		String finalFile = ""; 
		try{    
			  int nameCount = 0;
			  String filename = "item.txt";
			  String itemName = "item";
			  File temp = new File(filename);
			  boolean x = temp.exists();
			  while (x == true){
				  nameCount++;
				  filename = itemName + nameCount + ".txt";
				  temp = new File(filename);
				  x = temp.exists();
			  	}
			  finalFile = filename;
	           FileWriter fw=new FileWriter(filename);    
	           fw.write("Prices are recorded every hour.\n");    
	           fw.close();    
	          }
		  catch(Exception e)
		  	{System.out.println(e);}    
	         System.out.println("Success...");  
		return finalFile;
		
	}
	
	// records current price and date to file
	public static void writeToFile(String f, BigDecimal p) {
		
		Date now = new Date();
		try {
			FileWriter fw = new FileWriter(f, true);
			fw.write("The price as of " + now + " is $" + p.toString() + "\n");
			fw.close();
		}
		catch(Exception e)
		{System.out.println(e);}
	}

	public static void main(String[] args) throws InterruptedException {
		
		System.out.println("Running...");

		String url = readInput();
		int site = siteID(url);
		BigDecimal price = getPrice(site, url);
		String fileName = createFile();
	

		
		// updates and writes current price to file every 3 seconds for 5 iterations
		for (int i = 0; i <= 5; i++) {
			System.out.println("Updating to the most recent price...." + i);
			writeToFile(fileName, price);
			Thread.sleep(2000);
			price = getPrice(site, url);
			
			if (i == 5) {
				System.out.println("The price has been updated to the most current price.");
				System.exit(0);
			}
		}
		
		System.out.println("done.");

	}

	@Override
	public void run() {
		Date now = new Date(); // initialize date
		System.out.println("Time is :" + now); // Display current time
	}

}
