import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    // axios({
    //   method: "",
    //   url: ``,
    // }).then((res) => {
    //   console.log(res);
    // });
  }, []);
  return (
    <div className="w-full h-[100vh]">
      <div className=" select-none w-full items-center justify-center flex  bg-blue-500 ">
        <button onClick={() => navigate(-1)} className=" absolute left-3">
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
      <div className=" pt-5 px-5 space-y-8">
        <div className="flex flex-col items-center space-y-10 border-b-[1px] pb-8">
          <div className=" bg-gray-300 rounded-full w-52 h-52"></div>
          <div className="flex flex-col space-y-2">
            <span className=" text-5xl">Annonymous</span>
            <div className=" justify-center cursor-pointer text-xs text-gray-400 flex items-center space-x-2">
              <span>Edit profile</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
          <p>안녕하세요 ... 입니다. 잘부탁드립니다.</p>
        </div>
        <div className="flex justify-around">
          <button
            onClick={() => {
              navigate("1/salelist");
            }}
          >
            <div className=" w-20 h-20 bg-blue-400 rounded-full flex justify-center text-white items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-11 w-11"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <span>판매 내역</span>
          </button>
          <button className="">
            <div className=" w-20 h-20 bg-blue-400 rounded-full flex justify-center text-white items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-11 w-11"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span>구매 내역</span>
          </button>
        </div>
      </div>
    </div> //
  );
};

export default Profile;
