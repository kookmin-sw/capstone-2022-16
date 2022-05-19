import React from "react";
import { useNavigate } from "react-router-dom";

const Popup = (props) => {
  const navigate = useNavigate();
  return (
    <div className=" flex flex-col items-center justify-between w-2/4 h-40 absolute rounded-md bg-blue-300 z-10 top-1/3 left-1/4">
      <div className=" w-full h-7 bg-blue-500 rounded-md"></div>
      <span className="flex justify-center items-center text-sm">
        {props.popupmsg}
      </span>
      <button
        onClick={() => {
          props.itemclick(false);
          navigate(`${props.navigateurl}`);
        }}
        className=" mb-7 w-1/4 bg-blue-500 px-3 text-white py-1 rounded-md text-sm"
      >
        확인
      </button>
    </div>
  );
};

export default Popup;
