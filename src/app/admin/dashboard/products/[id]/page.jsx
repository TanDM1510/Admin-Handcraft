import ProductView from "@/sections/products/product/ProductView";
export const metadata = {
  title: "Sản phẩm",
};
export default function Page({ params }) {
  return (
    <div>
      <ProductView id={params} />
    </div>
  );
}
