import ProductView from "@/sections/products/product/ProductView";

export default function Page({ params }) {
  return (
    <div>
      <ProductView id={params} />
    </div>
  );
}
