import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReserveItem from "../components/reserveitem";

const ReserveList = (props) => {
  const navigate = useNavigate();
  useEffect(() => {}, []);
  return (
    <div className="w-full h-[100vh] bg-rose-100">
      <div
        onClick={() => {
          navigate("/profile");
        }}
        className=" items-center w-full justify-center flex relative bg-rose-300 "
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
      <ReserveItem></ReserveItem>
      <ReserveItem></ReserveItem>
    </div>
  );
};

export default ReserveList;
