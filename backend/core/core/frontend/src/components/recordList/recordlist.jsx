import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PurchaseItem from "./purchaseitem";

const RecordList = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    axios({
      method: "GET",
      url: `/member/myBought`,
    }).then((res) => {
      console.log(res.data);
    });
  });
  return (
    <div className=" w-full h-[100vh] box-border bg-gray-300">
      <div
        onClick={() => {
          navigate("/profile");
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
      <div className=" mx-3 flex flex-col items-center  text-4xl">
        <span className="mt-5 font-bold text-blue-300 ">판매한 아이템</span>
      </div>
      <div className=" mx-3 flex flex-col items-center  text-4xl">
        <span className="mt-5 font-bold text-blue-300 ">구매한 아이템</span>
      </div>
    </div>
  );
};

export default RecordList;
