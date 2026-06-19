import useReveal from "../hooks/useReveal";
import Shop from "../components/Shop";

export default function ShopPage() {
  useReveal();
  return (
    <div className="pt-20">
      <Shop />
    </div>
  );
}