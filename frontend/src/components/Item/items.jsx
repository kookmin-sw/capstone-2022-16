import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Items = ({
  description,
  itemname,
  name,
  itemId,
  price,
  soldOut,
  reserved,
  des,
}) => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
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
            reserved,
            itemname,
            des,
          },
        })
      }
    >
      <div className=" flex space-x-2 border-b-2 p-2 border-gray-300 items-center">
        <img
          src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA4MDlfMjg0%2FMDAxNjI4NTEwNjAyNDA4.GgeIKeGBu5yYWX9045TbFhmMZfewgDis7M6fD9iZsdAg.a1bapsTv33BhVcxbzawB9SRdUVcpo306y7KJgGzWO2Qg.JPEG.soeunkim764%2F0A39D13C-8535-4526-ADAB-0CC5926B05E5.jpeg&type=sc960_832"
          alt=""
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
