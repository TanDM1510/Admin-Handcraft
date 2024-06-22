import ProductTable from "../products/ProductTable";
import ProductsFilter from "../products/ProductsFilter";
import UsersHeader from "./UsersHeader";
import UsersTable from "./UsersTable";

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
