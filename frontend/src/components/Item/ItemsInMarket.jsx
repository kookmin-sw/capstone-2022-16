import React, { useEffect, useState } from "react";
import Items from "./items";
import dummy from "../../data.json";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
const ItemsInMarket = (props) => {
  const params = useParams();
  const [itemlist, setItemlist] = useState([]);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    if (cookies.LoginCookie === undefined) navigate("/");
  }, []);
  useEffect(() => {
    axios({
      method: "GET",
      url: `/market?id=${params.marketid}`,
    }).then((res) => {
      console.log(res);
      res.data && setItemlist(res.data);
    });
  }, []);
  return (
    <div className=" overflow-y-scroll h-80">
      {itemlist.map((item) => (
        <Items
          key={item.itemId}
          itemname={item.itemName}
          name={item.name}
          itemId={item.itemId}
          price={item.price}
          reserved={item.reserved}
          soldOut={item.soldOut}
          des={item.description}
        ></Items>
      ))}
      <div
        onClick={() => {
          navigate(`/${params.marketid}/upload`);
        }}
        className=" rounded-b-md cursor-pointer flex justify-center text-white  items-center  bg-blue-500 text-4xl"
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
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>
    </div>
  );
};

export default ItemsInMarket;
