import axios from "axios";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
  const navigate = useNavigate();
  const memberId = localStorage.getItem("memberId");
  const [cookies] = useCookies([]);
  useEffect(() => {
    if (cookies.LoginCookie === undefined) navigate("/");
  }, []);
  return (
    <div className="w-full h-[100vh]">
      <div className=" select-none w-full items-center justify-center flex  bg-blue-500 ">
        <button onClick={() => navigate("/main")} className=" absolute left-3">
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
            <span className=" text-5xl">{localStorage.getItem("name")}</span>
            <div className=" justify-center cursor-pointer text-xs text-gray-400 flex items-center space-x-2"></div>
          </div>
        </div>
        <div className="flex justify-around">
          {/* 멤버 아이디 받아와서 바꾸기 */}
          <button
            onClick={() => {
              navigate(`${memberId}/salelist`);
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
          <button
            className=""
            onClick={() => {
              navigate(`${memberId}/reservelist`);
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <span>찜 목록</span>
          </button>
          <button
            className=""
            onClick={() => {
              navigate(`${memberId}/record`);
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
