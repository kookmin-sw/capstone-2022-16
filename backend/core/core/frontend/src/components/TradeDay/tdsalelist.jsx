import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TdSaleList = ({ salelist }) => {
  const navigate = useNavigate();

  const soldOut = (itemId, memberId) => {
    axios({
      method: "POST",
      url: `/market/soldout?itemId=${itemId}&memberId=${memberId}`,
    }).then((res) => {
      window.location.reload();
    });
  };
  return (
    <li className=" list-none w-full space-y-2">
      {salelist.map((item, index) => {
        if (!item.soldOut) {
          return (
            <ul
              key={index}
              className=" group bg-white rounded-md w-full p-2 hover:cursor-pointer"
            >
              <div
                className="flex justify-between w-full text-3xl"
                onClick={() =>
                  navigate(`/map/${item.marketId}/${item.itemId}`, {
                    state: {
                      itemname: item.itemName,
                      name: item.name,
                      itemId: item.itemId,
                      price: item.price,
                      soldOut: item.soldOut,
                      reserveMembers: item.reserveMembers,
                      des: item.description,
                      marketId: item.marketId,
                      photo: item.file,
                    },
                  })
                }
              >
                <span>{item.itemName}</span>
                <span>{item.price} 원</span>
              </div>
              <div className="border-b-2 border-gray-300 my-2"></div>
              <div className="flex items-center justify-between text-gray-500">
                <div>
                  <span className=" text-lg">구매자 : </span>
                  <button className="text-lg  bg-gray-200 ml-1 p-1 rounded-md focus:outline-none focus:ring focus:ring-blue-200">
                    {item.reserveConfirmationMember.name}
                  </button>
                </div>
                <div>
                  <button
                    className=" text-white bg-blue-300 rounded-md transition-colors hover:bg-blue-400"
                    onClick={() => {
                      soldOut(
                        item.itemId,
                        item.reserveConfirmationMember.memberId
                      );
                    }}
                  >
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </ul>
          );
        }
      })}
    </li>
  );
};

export default TdSaleList;
