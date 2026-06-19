import useReveal from "../hooks/useReveal";
import Contact from "../components/Contact";

export default function ContactPage() {
  useReveal();

  return (
    <div className="pt-20">
      <Contact />
    </div>
  );
}