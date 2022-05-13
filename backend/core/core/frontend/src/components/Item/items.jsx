import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Items = ({
  reserveMembers,
  itemname,
  name,
  itemId,
  price,
  soldOut,
  des,
  photo,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() =>
        navigate(`${itemId}`, {
          state: {
            itemname,
            name,
            itemId,
            price,
            soldOut,
            reserveMembers,
            des,
            photo,
          },
        })
      }
    >
      <div className=" flex space-x-2 border-b-2 p-2 border-gray-300 items-center">
        <img
          src={`data:image/png;base64,${photo}`}
          alt="Red dot"
          className="w-14 h-14 rounded-full"
        />
        <div className=" w-full space-y-3">
          <div className=" w-full flex justify-between">
            <h2>{itemname}</h2>
            <h2>{price}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Items;
