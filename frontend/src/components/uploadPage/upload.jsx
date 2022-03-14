import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Upload = (props) => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({ mode: onchange });
  const onValid = (data) => {
    console.log(data);
    axios({
      method: "POST",
      url: ``,
      data: {
        name: data.itemname,
        price: data.itemprice,
        description: data.itemdescription,
      },
    })
      .then((req) => {
        console.log(req);
      })
      .then((res) => {
        if (res.data === "") {
          //데이터를 성공적으로 찾았을경우
          navigate("/map");
        } else {
        }
      });
  };
  return (
    <div className=" w-full h-[100vh]">
      <div
        onClick={() => {
          navigate(-1);
        }}
        className=" items-center justify-center flex relative bg-blue-500 "
      >
        <button className=" absolute left-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className=" text-white font-bold text-5xl">market</div>
      </div>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col p-10 space-y-3"
      >
        <label htmlFor="itemname">물건 이름</label>
        <input
          id="itemname"
          type="text"
          {...register("itemname", { required: true })}
          className=" border-2 border-blue-400 rounded-md outline-none px-2 py-1"
        />
        <label htmlFor="itemprice">가격</label>
        <input
          {...register("itemprice", { required: true })}
          id="itemprice"
          type="text"
          className="border-2 border-blue-400 rounded-md outline-none px-2 py-1"
        />
        <label htmlFor="itemdes">설명</label>
        <textarea
          {...register("itemdescription", { required: true })}
          id="itemdes"
          cols="30"
          rows="10"
          className="border-2 border-blue-400 rounded-md outline-none px-2 py-1"
        ></textarea>
        <button className=" bg-blue-400 text-white text-xl p-2 rounded-md">
          물품 등록
        </button>
      </form>
    </div>
  );
};

export default Upload;
