import useReveal from "../hooks/useReveal";
import Brands from "../components/Brands";

export default function BrandsPage() {
  useReveal();

  return (
    <div className="pt-20">
      <Brands />
    </div>
  );
}