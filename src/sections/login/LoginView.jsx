"use client";
import Image from "next/image";
import LoginForm from "./LoginForm";
import LoginPic from "../../assets/login2.jpg";
import { useState } from "react";
import RegisterForm from "./RegisterForm";
import IsLogin from "../auth-provider/IsLogin";
const LoginView = () => {
  const [isRegister, setRegister] = useState(false);
  return (
    <IsLogin>
      <div className="flex h-screen ml-auto mr-auto max-w-full lg:max-w-[calc(100%-100px)] w-[1400px]  justify-between p-2 rounded-lg bg-gray-100">
        {isRegister ? (
          <RegisterForm isRegister={isRegister} setRegister={setRegister} />
        ) : (
          <LoginForm isRegister={isRegister} setRegister={setRegister} />
        )}

        <div className=" hidden lg:block lg:basis-1/2">
          <Image
            src={LoginPic}
            alt="HandCraft"
            className="object-cover object-center h-full  w-full  rounded-lg"
            priority
          />
        </div>
      </div>
    </IsLogin>
  );
};

export default LoginView;
