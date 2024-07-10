import AuthProvider from "@/sections/auth-provider/AuthRediecToLogin";

export default function Home() {
  return (
    <AuthProvider>
      <p className="ml-auto mr-auto text-3xl"> Dương minh tấn</p>
    </AuthProvider>
  );
}
