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
      res.data && setItemlist(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <div className=" overflow-y-scroll h-80">
      <div>
        <div className="flex justify-center bg-gray-200 rounded-t-md text-2xl text mb-4">
          10시
        </div>
        {itemlist.map((item, index) => (
          <div key={index}>
            {!item.soldOut && item.sellingTime === 10 && (
              <div className=" border-2 rounded-md border-gray-300 mb-2 bg-white">
                <Items
                  photo={item.file}
                  key={item.itemId}
                  itemname={item.itemName}
                  name={item.name}
                  itemId={item.itemId}
                  price={item.price}
                  reserveMembers={item.reserveMembers}
                  soldOut={item.soldOut}
                  des={item.description}
                ></Items>
              </div>
            )}
          </div>
        ))}
        <div className=" flex justify-center bg-gray-200 rounded-t-md text-2xl text mb-2">
          14시
        </div>
        {itemlist.map((item, index) => (
          <div key={index}>
            {!item.soldOut && item.sellingTime === 14 && (
              <div className=" border-2 rounded-md border-gray-300 mb-2 bg-white">
                <Items
                  photo={item.file}
                  key={item.itemId}
                  itemname={item.itemName}
                  name={item.name}
                  itemId={item.itemId}
                  price={item.price}
                  reserveMembers={item.reserveMembers}
                  soldOut={item.soldOut}
                  des={item.description}
                ></Items>
              </div>
            )}
          </div>
        ))}
      </div>

      <div
        onClick={() => {
          navigate(`/${params.marketid}/upload`);
        }}
        className=" rounded-b-md cursor-pointer flex justify-center text-white  items-center  bg-blue-300 text-4xl"
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
