import axios from "axios";
import classNames from "classnames";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ReserveItem = ({ reserveitem, reserveOut }) => {
  const navigate = useNavigate();
  console.log(reserveitem);
  return (
    <li className=" list-none w-full space-y-2">
      {reserveitem.map((item) => (
        <ul
          key={item.itemId}
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
                  reserveConfirmationMember: item.reserveConfirmationMember,
                },
              })
            }
          >
            <span>{item.itemName}</span>
            <span>{item.price} 원</span>
          </div>
          <div className="border-b-2 border-gray-300 my-2"></div>
          <div className="flex items-center justify-between text-gray-500">
            <div className="flex">
              <span className=" text-lg">판매자 : </span>

              <div className="text-lg flex items-center  bg-gray-200 ml-1 p-1 rounded-md focus:outline-none focus:ring focus:ring-blue-200">
                {item.name}
                <button
                  onClick={() => {
                    navigate(`/profile/${item.owner}/record`);
                  }}
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
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <button
              onClick={() => {
                reserveOut(item.itemId);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={classNames(`h-6 w-6 text-pink-400`, {
                  "fill-current": true,
                })}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </ul>
      ))}
    </li>
  );
};

export default ReserveItem;
