public class NotifyTarget {
    public String name;
    public double targetPrice;
    public String email;

    public NotifyTarget(String name, String targetPrice, String email) {
        this.name = name;
        this.email = email;

        String p = targetPrice;

        if (targetPrice.contains("$")) {
            p = p.substring(1);
        }

        try {
            this.targetPrice = Double.parseDouble(p);
        } catch (Exception e) {
            // DIE
        }
    }
}