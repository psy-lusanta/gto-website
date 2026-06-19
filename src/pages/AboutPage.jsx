import useReveal from "../hooks/useReveal";
import About from "../components/About";

export default function AboutPage() {
  useReveal();

  return (
    <div className="pt-20">
      <About />
    </div>
  );
}