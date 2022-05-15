import axios from "axios";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";

const ItemDetail = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies] = useCookies([]);
  const [isreserved, setIsreserved] = useState(false);
  useEffect(() => {
    if (cookies.LoginCookie === undefined) navigate("/");
    location.state.reserveMembers.map((item) => {
      if (item.name === localStorage.getItem("name")) setIsreserved(true);
      else setIsreserved(false);
    });
  }, []);
  const reserveItem = async (e) => {
    axios({
      method: "POST",
      url: `/market/reserve?itemId=${location.state.itemId}`,
    }).then((res) => {
      setIsreserved(!isreserved);
    });
  };
  return (
    //

    <div className=" w-full h-[100vh] flex flex-col items-center">
      <div className=" w-full items-center justify-center flex relative bg-blue-500 ">
        <button onClick={() => navigate(-1)} className=" absolute left-3">
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className=" text-white font-bold text-5xl">market</div>
      </div>
      <img
        src={`data:image/png;base64,${location.state.photo}`}
        alt="Red dot"
        className=" w-80 h-80 my-4"
      />
      <div className="border-b border-t p-4 w-full flex justify-between items-center">
        <div className="flex items-center justify-center space-x-3">
          <span>{location.state.name}</span>
        </div>
        <span>판매자</span>
      </div>
      <div className=" w-full p-4">
        <div className="flex w-full justify-between items-center ">
          <h1 className=" mb-4 text-4xl"> {location.state.itemname}</h1>
          <div className="mb-4 text-2xl flex items-center space-x-4">
            <h1 className=" ">{location.state.price}원</h1>
            <button onClick={reserveItem}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={classNames(
                  `h-6 w-6 text-pink-400`,
                  {
                    "fill-current": isreserved,
                  },
                  {
                    "text-blue-400":
                      location.state.name === localStorage.getItem("name"),
                  }
                )}
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
        </div>
        <p className=" font-normal ">{location.state.des}</p>
      </div>
    </div>
  );
};

export default ItemDetail;
