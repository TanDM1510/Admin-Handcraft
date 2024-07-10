import OrderDetailView from "@/sections/orders/order-detail/OrderDetailView";
export const metadata = {
  title: "Đơn hàng",
};
export default function Page({ params }) {
  return (
    <div>
      <OrderDetailView id={params} />
    </div>
  );
}
