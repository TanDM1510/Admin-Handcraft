import { useEffect } from "react";
import { useRouter } from "next/navigation";

const IsLogin = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  return <>{children}</>;
};

export default IsLogin;
