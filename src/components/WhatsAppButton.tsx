import { FaWhatsapp } from "react-icons/fa";
import { whatsappUrl } from "@/data/portfolio";

/** Floating click-to-chat button; renders nothing until profile.whatsapp is set. */
export default function WhatsAppButton() {
  if (!whatsappUrl) return null;
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="wa-fab"
      aria-label="Chat with me on WhatsApp"
      title="Chat on WhatsApp"
    >
      <FaWhatsapp aria-hidden="true" />
    </a>
  );
}
