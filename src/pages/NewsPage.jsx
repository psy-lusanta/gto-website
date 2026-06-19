import useReveal from "../hooks/useReveal";
import News from "../components/News";

export default function NewsPage() {
  useReveal();

  return (
    <div className="pt-20">
      <News />
    </div>
  );
}