import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const MainPage = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["LoginCookie"]);

  const navigate = useNavigate();
  const logout = () => {
    removeCookie("LoginCookie");
    navigate("/");
  };
  return (
    <div className=" bg-blue-100 w-full h-[100vh] relative">
      <div className=" select-none absolute w-full items-center justify-center flex  bg-blue-500 ">
        <div className=" text-white font-bold text-5xl">market</div>
      </div>
      <div className="flex justify-center items-center h-full">
        <div className=" grid grid-cols-2 grid-rows-2 ml-2">
          <button
            onClick={() => navigate("/map")}
            className=" transition-colors hover:bg-blue-500 mr-2 mb-2 w-40 space-y-4 text-white h-40 rounded-md bg-blue-400 flex flex-col items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className=" text-xl">주변 장터 찾기</span>
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="transition-colors hover:bg-blue-500 w-40 space-y-4 text-white  h-40 rounded-md bg-blue-400 flex flex-col items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className=" text-xl">내 정보</span>
          </button>
          <button
            onClick={() => navigate("/marketreg")}
            className="transition-colors hover:bg-blue-500 space-y-4 text-white w-40 h-40 rounded-md bg-blue-400 flex flex-col items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className=" text-xl">장터 등록 하기</span>
          </button>
          <button
            onClick={() => {
              logout();
            }}
            className="transition-colors hover:bg-blue-500 space-y-4 text-white w-40 h-40 rounded-md bg-blue-400 flex flex-col items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className=" text-xl">로그아웃</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
