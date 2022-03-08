import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../input";
const LoginPage = (props) => {
  const { register, handleSubmit } = useForm({ mode: onchange });
  const navigate = useNavigate();
  const onValid = (d) => {
    axios({
      method: "POST",
      url: ``,
      data: {
        id: d.id,
        password: d.password,
      },
    }).then((res) => {});
    console.log(d.id);
    console.log(d.password);
  };
  const onInValid = (error) => {
    console.log(error);
  };

  return (
    <div className="mt-16 px-4 flex flex-col justify-center">
      <h3 className="text-center text-3xl font-bold text-blue-800">
        Welcome to market
      </h3>
      <div className="mt-12">
        <div className="flex flex-col items-center">
          <h5 className="text-sm font-medium text-blue-500">로그인</h5>
        </div>
        <form
          onSubmit={handleSubmit(onValid, onInValid)}
          className="mt-8 flex flex-col space-y-4"
        >
          <Input
            type="text"
            register={register("id", { required: true })}
            name="id"
            placeholder="아이디"
            kind="text"
          />
          <Input
            type="password"
            register={register("password", { required: true })}
            name="password"
            placeholder="비밀번호"
            kind="text"
          />
          <button className=" transition-colors w-full h-12 bg-blue-400 rounded-md border-transparent px-4 font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2">
            로그인
          </button>
        </form>

        <div className="mt-8">
          <div className="flex justify-center mt-5">
            <button className=" border-r-2 pr-5 ">아이디 찾기</button>
            <button className="pl-5 border-r-2 pr-5 ">비밀번호 찾기</button>
            <button className="pl-5" onClick={() => navigate("/join")}>
              <span>회원가입</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
