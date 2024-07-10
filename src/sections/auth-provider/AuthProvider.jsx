import { redirect } from "next/navigation";
const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    redirect("/auth");
  }
  return <>{children}</>;
};
export default AuthProvider;