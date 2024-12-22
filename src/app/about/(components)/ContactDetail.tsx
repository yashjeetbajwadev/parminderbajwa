import { cn } from "@/lib/utils";
import { Copy, Mail, MapPin, Phone } from "lucide-react";
import { useAlert } from "@/components/custom/Alert";
import { Button } from "@/components/ui/button";

function ContactDetail({ className }: { className?: string }) {
  const { callAlert } = useAlert();

  const handleCopy = (text: string, message: string) => {
    try {
      if (!navigator.clipboard) {
        console.error("Clipboard API not available");
        callAlert(
          "Error",
          "Sorry, your browser does not support copying to clipboard"
        );
        return;
      }
      navigator.clipboard.writeText(text);
      console.log("Copied to clipboard");
      callAlert("Copied", message);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  return (
    <div
      className={cn(
        "grid justify-center text-sm md:text-base text-gray-800",
        className
      )}
    >
      {/* Phone Section */}
      <div className="flex items-center space-x-2">
        <Phone className="h-4 w-4" />
        <a href="tel:+642102496278">(+64) 21 024 96278</a>
        <Button
          buttonevent="contact phone number"
          variant="ghost"
          className="p-0 m-0 h-min"
          onClick={(e) => {
            e.preventDefault();
            handleCopy("02102496278", "Phone number copied to clipboard");
          }}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      {/* Email Section */}
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4" />
        <a href="mailto:p.bajwa@barfoot.co.nz">p.bajwa@barfoot.co.nz</a>
        <Button
          buttonevent="contact email"
          variant="ghost"
          className="p-0 m-0 h-min"
          onClick={(e) => {
            e.preventDefault();
            handleCopy("p.bajwa@barfoot.co.nz", "Email copied to clipboard");
          }}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>

      {/* Location Section */}
      <div className="flex items-center space-x-2">
        <MapPin className="h-4 w-4" />
        <span>Auckland, New Zealand</span>
      </div>
    </div>
  );
}

export default ContactDetail;
