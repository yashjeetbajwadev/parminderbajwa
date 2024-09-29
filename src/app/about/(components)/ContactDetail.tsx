import { cn } from '@/lib/utils';
import { Copy, Mail, MapPin, Phone } from 'lucide-react';
import { useAlert } from '@/components/custom/Alert';

function ContactDetail({ className }: { className?: string }) {
    const { callAlert } = useAlert();

    const handleCopy = (text: string, message: string) => {
        try {
            if (!navigator.clipboard) {
                console.error('Clipboard API not available');
                callAlert('Error', 'Sorry, your browser does not support copying to clipboard');
                return;
            }   
            navigator.clipboard.writeText(text);
            console.log('Copied to clipboard');
            callAlert('Copied', message);
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
        }
    };

    return (
        <div className={cn("grid justify-center", className)}>
            {/* Phone Section */}
            <div 
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => handleCopy("02102496278", "Phone number copied to clipboard")}
            >
                <Phone className="h-4 w-4" />
                <a href="tel:02102496278">021 0249 6278</a>
                <Copy className="h-4 w-4" />
            </div>

            {/* Email Section */}
            <div 
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => handleCopy("p.bajwa@barfoot.co.nz", "Email copied to clipboard")}
            >
                <Mail className="h-4 w-4" />
                <a href="mailto:p.bajwa@barfoot.co.nz">p.bajwa@barfoot.co.nz</a>
                <Copy className="h-4 w-4" />
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
