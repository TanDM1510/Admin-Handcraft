import UpdateProductView from "@/sections/products/updateProduct/UpdateProductView";
export const metadata = {
  title: "Sản phẩm",
};
export default function Page({ params }) {
  return (
    <div>
      <UpdateProductView id={params} />
    </div>
  );
}
