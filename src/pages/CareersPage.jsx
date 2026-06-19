import useReveal from "../hooks/useReveal";
import Careers from "../components/Careers";

export default function CareersPage() {
  useReveal();

  return (
    <div className="pt-20">
      <Careers />
    </div>
  );
}