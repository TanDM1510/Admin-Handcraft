import ProductsFilter from "../products/ProductsFilter";
import UsersHeader from "./UsersHeader";

const UsersView = () => {
  return (
    <div>
      <UsersHeader />
      <ProductsFilter />
      {/* <UsersTable /> */}
    </div>
  );
};
export default UsersView;
