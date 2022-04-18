import React from "react";

const ReserveItem = (props) => {
  return (
    <div className="m-5 bg-white h-28 rounded-md">
      <div className="flex justify-between items-center text-gray-600">
        <span className=" ml-5 mt-2">초콜릿</span>
        <div className="flex items-center">
          <span className="mr-5 mt-2">1000</span>
          <button className=" mt-2 mr-3 text-pink-300">
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className=" border-b mt-2 mx-2"></div>
      <p className=" ml-5 mt-2">
        description descriptiondescription description description description
        description description description description description
      </p>
    </div>
  );
};

export default ReserveItem;
