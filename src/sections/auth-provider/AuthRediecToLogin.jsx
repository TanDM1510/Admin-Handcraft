"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const AuthProvider = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      router.push("/admin/dashboard");
    } else {
      router.push("/auth");
    }
  }, [router]);
  return <>{children}</>;
};
export default AuthProvider;
