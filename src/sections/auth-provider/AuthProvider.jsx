import { redirect } from "next/navigation";
const AuthProvider = ({ children }) => {
  const isLogin = true;
  if (!isLogin) {
    redirect("/auth");
  }
  return <>{children}</>;
};
export default AuthProvider;
