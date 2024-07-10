import { redirect } from "next/navigation";
const AuthProvider = ({ children }) => {
  const isLogin = false;
  if (!isLogin) {
    redirect("/auth");
  }
  return <>{children}</>;
};
export default AuthProvider;
