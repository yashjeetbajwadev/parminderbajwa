import { ContactForm } from "./ContactmeForm";
import { ContactModal } from "./ContactMeModal";

interface ContactMeProps {
  openInModal?: boolean;
  className?: string;
}

export function ContactMe({
  openInModal = false,
  className,
}: Readonly<ContactMeProps>) {
  if (openInModal) {
    return <ContactModal className={className} />;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Get in touch!</h2>
      <ContactForm />
    </div>
  );
}
