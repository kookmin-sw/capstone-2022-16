import React from "react";
import { useNavigate } from "react-router-dom";

const SaleItem = ({ SoldOut, itemlist, onRemove }) => {
  const navigate = useNavigate();
  return (
    <li className=" list-none w-full space-y-2">
      {itemlist.map((item) => (
        <ul
          key={item.itemId}
          className=" bg-white rounded-md w-full p-2"
          onClick={() =>
            navigate(`/map/5/${item.itemId}`, {
              state: {
                itemname: item.itemName,
                name: item.name,
                itemId: item.itemId,
                price: item.price,
                soldOut: item.soldOut,
                reserved: item.reserved,
                reserveMember: item.reserveMember,
                des: item.des,
              },
            })
          }
        >
          <div className="flex justify-between w-full text-3xl">
            <span>{item.itemName}</span>
            <span>{item.price} 원</span>
          </div>
          <div className="border-b-2 border-gray-300 my-2"></div>
          <div className="flex items-center justify-between text-gray-500">
            <span className=" text-lg">구매자 : chanw12</span>
            <button
              className="hover:bg-blue-400 transition-colors bg-blue-300 rounded-md text-2xl p-1"
              onClick={() => {
                SoldOut(item.itemId);
                onRemove(item.itemId);
              }}
            >
              판매
            </button>
          </div>
        </ul>
      ))}
    </li>
  );
};

export default SaleItem;
