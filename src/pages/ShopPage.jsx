import useReveal from "../hooks/useReveal";
import Shop from "../components/Shop";

export default function ShopPage() {
  useReveal();
  return (
    <div>
      <Shop />
    </div>
  );
}