import React from "react";

const Input = ({
  placeholder,
  label,
  name,
  kind = "text",
  register,
  ...rest
}) => {
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      {kind === "text" ? (
        <div className="relative flex items-center  rounded-md shadow-sm">
          <input
            placeholder={placeholder}
            id={name}
            {...rest}
            {...register}
            className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>
      ) : null}
      {kind === "join" ? (
        <div className="relative flex items-center shadow-sm">
          <input
            id={name}
            {...rest}
            {...register}
            className=" w-full appearance-none border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>
      ) : null}
    </div>
  );
};
export default Input;
