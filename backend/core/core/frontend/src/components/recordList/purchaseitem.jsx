import React from "react";
import { useNavigate } from "react-router-dom";

const PurchaseItem = ({ itemlist }) => {
  const navigate = useNavigate();
  return (
    <li className=" list-none w-full space-y-2">
      {itemlist.map((item) => (
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
              <span className=" text-lg">예약자 : </span>
              {item.reserveMembers.map((member, index) => (
                <button
                  className="text-lg  bg-gray-200 ml-1 p-1 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  key={index}
                  onClick={() => {}}
                >
                  {member}
                </button>
              ))}
            </div>
          </div>
        </ul>
      ))}
    </li>
  );
};

export default PurchaseItem;
