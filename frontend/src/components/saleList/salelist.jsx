import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SaleList = (props) => {
  const [itemlist, setItemList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios({
      method: "GET",
      url: `/member/items`,
    }).then((res) => {
      console.log(res);
    });
  });
  return (
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

    // itemlist.map((item)=>{

    // }
  );
};

export default SaleList;
