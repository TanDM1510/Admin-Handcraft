import UpdateProductView from "@/sections/products/updateProduct/UpdateProductView";

export default function Page({ params }) {
  return (
    <div>
      <UpdateProductView id={params} />
    </div>
  );
}
