import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/auth");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthProvider;
