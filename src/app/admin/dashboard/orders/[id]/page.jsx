import OrderDetailView from "@/sections/orders/order-detail/OrderDetailView";

export default function Page({ params }) {
  return (
    <div>
      <OrderDetailView id={params} />
    </div>
  );
}
