import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.Scanner;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class HTMLscraper {

	public static void main(String[] args) {
		
		System.out.println("Running...");
		//String url = "https://www.amazon.com/Kamikara-Penguin-Action-Haruki-Nakamura/dp/B077JGWRH8/ref=sr_1_4";
		
		Scanner input = new Scanner(System.in);
		System.out.print("Please enter the url: ");
		
		String url = input.nextLine();
		
		try {
		
			Document page = Jsoup.connect(url).userAgent("user").get();
			//Elements price = page.select("a-section:contains($)");
			Elements price = page.select(".a-size-medium.a-color-price:contains($)");

			System.out.println("Current price is " + price.get(0).text());
			
			// convert string to a price format, number object
			String temp = price.get(0).text();
			NumberFormat fixedPrice = NumberFormat.getCurrencyInstance();
			Number num = fixedPrice.parse(temp);
			
			BigDecimal currPrice = new BigDecimal(num.toString()); // for comparison
			//System.out.println("SUCCESS = " + currPrice.toString());
			
			//prints all prices, for testing
			/*
			for(int i = 0; i <price.size(); i++)
			{
				//System.out.println(title.get(i).text());
				System.out.println(price.get(i).text());
		
			}*/
		}
		catch(Exception e) {
			e.printStackTrace();
		
		}
		System.out.println("done"); 
	}
	
}
