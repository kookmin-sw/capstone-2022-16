import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReserveItem from "../components/reserveitem";

const ReserveList = (props) => {
  const navigate = useNavigate();
  const [reserveitem, setReserveItem] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: `/member/reserveitems`, //여기에서 받아올때 어떤 상점에 등록되어있는지 있는지
    }).then((res) => {
      setReserveItem(res.data);
      console.log(res.data);
    });
  }, []);
  const reserveOut = (itemId) => {
    axios({
      method: "POST",
      url: `/market/reserve?itemId=${itemId}`,
    }).then(window.location.reload());
  };
  return (
    <div className="w-full h-[100vh] bg-gray-300 ">
      <div
        onClick={() => {
          navigate("/profile");
        }}
        className=" items-center w-full justify-center flex relative bg-blue-500 "
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
        <span className="mt-5 font-bold text-blue-300 ">찜한 아이템</span>
        <ReserveItem
          reserveOut={reserveOut}
          reserveitem={reserveitem}
        ></ReserveItem>
      </div>
    </div>
  );
};

export default ReserveList;
