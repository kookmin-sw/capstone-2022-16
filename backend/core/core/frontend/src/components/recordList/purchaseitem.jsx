import React from "react";
import { useNavigate } from "react-router-dom";

const PurchaseItem = ({ itemlist }) => {
  return (
    <li className=" list-none w-full space-y-2">
      {itemlist.map((item, index) => (
        <ul
          key={index}
          className=" group bg-white rounded-md w-full p-2 hover:cursor-pointer"
        >
          <div className="flex justify-between w-full text-3xl">
            <img src={`data:image/png;base64,${item.image}`} alt="" />
            <span>{item.itemName}</span>
            <span>{item.itemPrice} 원</span>
          </div>
        </ul>
      ))}
    </li>
  );
};

export default PurchaseItem;
