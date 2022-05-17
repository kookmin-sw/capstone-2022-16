import classNames from "classnames";
import React from "react";
import { useNavigate } from "react-router-dom";

const SaleItem = ({ ReserveComplete, itemlist }) => {
  const navigate = useNavigate();

  return (
    <li className=" list-none w-full space-y-2">
      {itemlist.map((item) => {
        if (!item.soldOut) {
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
                  <span className=" text-lg">예약자 : </span>
                  {item.reserveMembers.map((member, index) => (
                    <div
                      key={index}
                      className={classNames(
                        "text-lg flex bg-gray-200 ml-1 p-1 rounded-md focus:outline-none focus:ring focus:ring-blue-200",
                        {
                          "bg-blue-300": true,
                        }
                      )}
                    >
                      <button
                        onClick={() => {
                          ReserveComplete(item.itemId, member.memberId);
                        }}
                      >
                        {member.name}
                      </button>
                      <button
                        onClick={() => {
                          navigate(`/profile/${member.memberId}/record`);
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
                  ))}
                </div>
              </div>
            </ul>
          );
        }
      })}
    </li>
  );
};

export default SaleItem;
