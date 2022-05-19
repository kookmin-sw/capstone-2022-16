import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TdSaleList = ({ salelist }) => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);
  const [memberdata, setMemberData] = useState({
    memberId: null,
    name: null,
    fasion: null,
  });
  const getFasion = (memberId, Popup) => {
    axios({
      method: "GET",
      url: `/member/profile?memberId=${memberId}`,
    }).then((res) => {
      setMemberData(res.data);
      setPopup(true);
    });
  };
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
      {popup && (
        <div className=" absolute flex flex-col items-center justify-between w-1/2 h-52 rounded-md bg-blue-300 z-10 top-1/3 left-1/4 pb-4 space-y-2">
          <div className=" w-full h-7 bg-blue-500 rounded-md"></div>
          <span className=" text-xl">상대방 착용의상 정보</span>
          <p className=" text-lg text-gray-700 opacity-80">
            {memberdata.fasion}
          </p>
          <button
            className=" text-sm mb-7 w-2/6 bg-blue-500 px-3 text-white py-1 rounded-md my-4"
            onClick={() => {
              setPopup(false);
            }}
          >
            확인
          </button>
        </div>
      )}
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
                <div className="flex">
                  <span className=" text-lg">구매자 : </span>
                  <div className=" flex items-center text-lg  bg-gray-200 ml-1 p-1 rounded-md focus:outline-none focus:ring focus:ring-blue-200">
                    {item.reserveConfirmationMember.name}
                    <button
                      onClick={() => {
                        getFasion(item.reserveConfirmationMember.memberId);
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
                <div className="flex items-center space-x-2">
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
                  <button>
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
                        d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
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
