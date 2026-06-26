import useReveal from "../hooks/useReveal";
import Contact from "../components/Contact";

export default function ContactPage() {
  useReveal();

  return (
    <div>
      <Contact />
    </div>
  );
}