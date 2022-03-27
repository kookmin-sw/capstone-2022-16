import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const SaleList = (props) => {
  const [itemlist, setItemList] = useState([]);
  const navigate = useNavigate();
  const [cookies] = useCookies([]);
  useEffect(() => {
    if (cookies.LoginCookie === undefined) navigate("/");
  }, []);
  useEffect(() => {
    axios({
      method: "GET",
      url: `/member/items`,
    }).then((res) => {
      console.log(res.data);
      setItemList(res.data);
    });
  }, []);
  return (
    <div className=" w-full h-[100vh]">
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
      <div className=" mx-3 flex flex-col items-center h-full text-blue-300 text-4xl">
        <span className="mt-5 font-bold">판매중인 아이템</span>
        <li className=" list-none text-white w-full space-y-2">
          {itemlist.map((item) => (
            <ul
              key={item.itemId}
              className=" bg-blue-300 rounded-md w-full p-2 flex justify-between"
            >
              <span>{item.itemName}</span>
              <span>{item.price} 원</span>
            </ul>
          ))}
        </li>
      </div>
    </div>

    // itemlist.map((item)=>{

    // }
  );
};

export default SaleList;
