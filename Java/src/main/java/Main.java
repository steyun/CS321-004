import org.rapidoid.http.Req;
import org.rapidoid.http.Resp;
import org.rapidoid.setup.On;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Timer;

public class Main {

    public static void main(String[] args) {

        On.get("/items").json((Req req) -> {
            Resp resp = req.response();
            resp.result(readFile());
            resp.header("Access-Control-Allow-Origin", "*");
            return resp;
        });

        On.post("/newitem").json((Req req) -> {
            Map<String, Object> vals = req.posted();
            
            saveNewItem((String)vals.get("info"));

            return true;
        });

        On.post("/notify").json((Req req) -> {
            Resp resp = req.response();
            resp.result(true);
            resp.header("Access-Control-Allow-Origin", "*");
            Map<String, Object> vals = req.posted();
            System.out.println("WHY THE FUCK YOU NO WORK");
            addNotifyTarget((String)vals.get("info"));

            return resp;
        });

        Timer timer = new Timer();

        // Run the scraper every minute
         timer.schedule(new HTMLscraper(), 30000, 30000);
    }

    public static List<Item> readFile() {
        List<Item> items = new ArrayList<>();

        try {
            BufferedReader fr = new BufferedReader(new FileReader("./items.txt"));

            String line;

            while ((line = fr.readLine()) != null) {
                String[] parts = line.split(",");
                items.add(new Item(parts[0], parts[1], parts[2]));
            }
            fr.close();
        } catch (IOException ex) {
            // DIE
        }

        return items;
    }

    public static void saveNewItem(String info) {
        try {
            BufferedWriter fw = new BufferedWriter(new FileWriter("./scrapingitems.txt", true));
            
            fw.write(info + "\n");
            fw.close();
        } catch (IOException ex) {
            // DIE
        }
    }

    public static void addNotifyTarget(String info) {
        System.out.println(info);
        try {
            BufferedWriter fw = new BufferedWriter(new FileWriter("./notifytargets.txt", true));

            fw.write(info + "\n");
            fw.close();
        } catch (IOException ex) {
            // DIE
        }
    }

    public static class Item {
        public String name;
        public String price;
        public String site;

        public Item(String name, String price, String site) {
            this.name = name;
            this.price = price;
            this.site = site;
        }
    }
}