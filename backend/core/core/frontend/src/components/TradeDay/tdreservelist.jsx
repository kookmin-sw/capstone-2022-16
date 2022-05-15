import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const TdReserveList = ({ reservelist }) => {
  const navigate = useNavigate();
  return (
    <li className=" list-none w-full space-y-2">
      {reservelist.map((item) => {
        if (item.reserveConfirmationMember === localStorage.getItem("name")) {
          return (
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

                  <div className="text-lg  bg-gray-200 ml-1 p-1 rounded-md focus:outline-none focus:ring focus:ring-blue-200">
                    {item.name}
                  </div>
                </div>
              </div>
            </ul>
          );
        }
      })}
    </li>
  );
};

export default TdReserveList;
