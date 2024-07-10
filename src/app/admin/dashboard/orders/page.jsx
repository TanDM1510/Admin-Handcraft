import OrdersView from "@/sections/orders/ordersView";
export const metadata = {
  title: "Đơn hàng",
};
const page = () => {
  return (
    <div>
      <OrdersView />
    </div>
  );
};
export default page;
