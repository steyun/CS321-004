import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.Scanner;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;


/**
 * 
 * @author Steven Yun
 * very ugly version
 *  
 *  --- 
 *  to do:
 *  ~ write to .txt
 *  ~ fix target scraping
 *  ~ periodic scraping (hourly)
 *  ~ clean up tests + comment 
 *  ---
 */


// prompts user for url input, returns the current price and prints out price
public class HTMLscraper implements Runnable {
	
	/*Thread t = new Thread()
	{
	    @Override
	    public void run() {
	        while(true) {
	            try {
	                Thread.sleep(1000*60*60);
	                //your code here...
	            } catch (InterruptedException ie) {
	            }
	        }
	    }
	};
	t.start();*/
	

	public static void main(String[] args) {
		Runnable r = new HTMLscraper();
		Thread t = new Thread(r); //{
		    /*@Override
		    public void run() {
		        while(true) {
		            try {
		            	System.out.println("hey");
		            	Thread.sleep(2000); 
		                
		            } 
		            catch (InterruptedException ie) {
		            	
		            }
		        }
		    }
		};*/
		
		int site = 0;
		System.out.println("Running...");
		//String url = "https://www.amazon.com/Kamikara-Penguin-Action-Haruki-Nakamura/dp/B077JGWRH8/ref=sr_1_4";
		
		Scanner input = new Scanner(System.in);
		System.out.print("Please enter the url: ");
		String url = input.nextLine();
		if(url.contains("amazon.com"))
		{
			site = 1;
		}
		else if(url.contains("walmart.com"))
		{
			
			site = 2;
		}
		else if(url.contains("target.com"))
		{
			site = 3;
			
		}
		//t.start();
		switch(site) {
		case 1:
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
			break;
		case 2:
			try {
				
			Document page = Jsoup.connect(url).userAgent("user").get();
			//Elements price = page.select("a-section:contains($)");
			Elements price = page.select(".price.display-inline-block.arrange-fit.price--stylized:contains($)");

			
			
			// convert string to a price format, number object
			String temp = price.get(0).text();
			int len = temp.length()/2;
			String temp1 = temp.substring(0,len);
			System.out.println("Current price is " + temp1);
			NumberFormat fixedPrice = NumberFormat.getCurrencyInstance();
			Number num = fixedPrice.parse(temp1); 
			
			BigDecimal currPrice = new BigDecimal(num.toString()); // for comparison
			//System.out.println("SUCCESS = " + currPrice.toString());
			 
			//prints all prices, for testing
			/*
			for(int i = 0; i <price.size(); i++)
			{
				//System.out.println(title.get(i).text());
				System.out.println(price.get(i).text());
		
			}*/
			break;
			}
		
			catch(Exception e) {
				e.printStackTrace();
		
			}
			break;
		case 3:
			try {
				
				Document page = Jsoup.connect(url).userAgent("user").get();
				Elements price = page.select("[data-test = 'product-price']");
				//Elements price = page.select("div.h-text-bold.style__PriceFontSize-gob4i1-0.eLdTvF");
				
				System.out.println("Current price is " + price.text());
				
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
				break;
		}
		System.out.println("done."); 
	}

	@Override
	public void run() {
		// TODO Auto-generated method stub
		
	}

	/*
	@Override
	public void run() {
		// TODO Auto-generated method stub
		//while(true) {
		Scanner input = new Scanner(System.in);
		System.out.print("Please enter the url: ");
		
		String url = input.nextLine();
		while(true) {
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
				
				for(int i = 0; i <price.size(); i++)
				{
					//System.out.println(title.get(i).text());
					System.out.println(price.get(i).text());
			
				}
			}
			catch(Exception e) {
				e.printStackTrace();
			
			}}
        }
    
	}*/


	
}
