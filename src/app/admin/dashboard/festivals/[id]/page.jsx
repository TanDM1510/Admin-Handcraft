import FestivalDetailView from "@/sections/festival/FestivalDetail/FestivalDetailView";
import ProductView from "@/sections/products/product/ProductView";

export default function Page({ params }) {
  return (
    <div>
      <FestivalDetailView id={params} />
    </div>
  );
}
