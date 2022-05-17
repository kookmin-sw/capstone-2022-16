import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import SaleItem from "./saleitem";

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
      setItemList(res.data);
      console.log(res.data);
      itemlist.filter((item) => item.soldOut === true);
    });
  }, []);
  const ReserveComplete = (itemId, member) => {
    axios({
      method: "POST",
      url: `/market/Confirm?itemId=${itemId}&memberId=${member}`,
    }).then(() => {
      window.location.reload();
    });
  };
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
        <span className="mt-5 font-bold text-blue-300 ">판매중인 아이템</span>
        <SaleItem
          ReserveComplete={ReserveComplete}
          itemlist={itemlist}
        ></SaleItem>
      </div>
    </div>
  );
};

export default SaleList;
