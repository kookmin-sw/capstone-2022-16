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
  const SoldOut = (itemId) => {
    axios({
      method: "POST",
      url: `/market/soldout?itemId=${itemId}`,
    }).then((res) => {
      if (res.data === "OK") {
        console.log(res);
        
      }
    });
  };
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
              <div className=" space-x-4">
                <span>{item.price} 원</span>
                <button
                  className=" hover:text-red-200 transition-colors"
                  onClick={() => SoldOut(item.itemId)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
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
                </button>
              </div>
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
