import { redirect } from "next/navigation";

const IsLogin = ({ children }) => {
  const token = localStorage.getItem("authToken");

  if (token) {
    redirect("/admin/dashboard");
  }
  return <>{children}</>;
};
export default IsLogin;
