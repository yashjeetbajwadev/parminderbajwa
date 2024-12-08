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

  return <ContactForm />;
}
