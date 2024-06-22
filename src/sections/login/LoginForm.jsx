"use client";
import React from "react";
import { Divider, Form, Input } from "antd";
import Link from "next/link";
import google from "../../assets/search.png";
import Image from "next/image";
const LoginForm = ({ isRegister, setRegister }) => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="lg:basis-1/2 w-full bg-gray rounded-lg">
      <p className="font-bold p-10 text-sm  lg:mb-6 mb-10">
        Not a member?{" "}
        <b
          className="text-blue-400 hover:underline cursor-pointer"
          onClick={() => setRegister(!isRegister)}
        >
          Register now{" "}
        </b>
      </p>
      <div className="flex ml-auto mr-auto items-center justify-center flex-col h-2/3 max-w-[calc(100%-50px)] w-[400px]">
        <h1 className="font-bold text-5xl text-center custom-font ">
          HandCraft
        </h1>
        <p className="mb-10 mt-8 lg:mt-5 font-normal text-sm  lg:text-lg text-center ">
          Welcome back you've been missed!
        </p>
        <Form
          name="basic"
          className=" w-full"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            className="w-full"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              className="w-full px-7 py-3 font-bold"
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              placeholder="Password"
              className="px-7 py-3 font-bold"
            />
          </Form.Item>

          <Link
            href={"/#"}
            className=" text-end block hover:text-blue-400 hover:underline"
          >
            Recovery password
          </Link>
          <Form.Item>
            <button
              className="bg-black mt-5 w-full text-white font-bold py-3 transition-all delay-100 ease-in-out duration-150 rounded-lg hover:bg-gray-100 hover:text-black hover:border-white border-2"
              type="submit"
            >
              Login
            </button>
          </Form.Item>
        </Form>
        <Divider>Or Login with</Divider>
        <button
          className="border-white border-2  mt-5 w-full text-black font-bold transition-all delay-100 ease-in-out duration-150 py-3 rounded-lg hover:bg-black hover:text-white"
          type="submit"
        >
          <Image
            src={google}
            alt="Handcraft"
            priority
            className="h-7 w-7 ml-auto mr-auto"
          />{" "}
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
