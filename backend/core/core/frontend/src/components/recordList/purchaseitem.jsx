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
          <div className="flex justify-between w-full text-3xl items-center">
            <div className="flex items-center justify-center">
              <img
                src={`data:image/png;base64,${item.image}`}
                className="w-14 h-14 rounded-full
            "
                alt=""
              />
              <span>{item.itemName}</span>
            </div>

            <span>{item.itemPrice} 원</span>
          </div>
        </ul>
      ))}
    </li>
  );
};

export default PurchaseItem;
