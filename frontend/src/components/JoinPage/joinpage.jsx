import React from "react";
import { useForm } from "react-hook-form";

const JoinPage = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: "onChange",
  });

  const onValid = (data) => {};
  const onInvalid = (errors) => {};

  return (
    <div className=" px-10 py-10 flex justify-center">
      <div className=" w-[460px]">
        <h1 className=" cursor-pointer text-center font-bold text-blue-500 text-5xl mb-10">
          <a href="/">market</a>
        </h1>
        <form
          action=""
          onSubmit={handleSubmit(onValid, onInvalid)}
          className=" space-y-5 font-bold"
        >
          <div>
            <label htmlFor="joinid">아이디</label>
            <div className="relative flex items-center shadow-sm">
              <input
                id="joinid"
                {...register("joinid", {
                  required: "필수항목 입니다",
                  minLength: { value: 6, message: "6자 이상이여야합니다" },
                  maxLength: { value: 16, message: "16자 이하여야합니다" },
                })}
                className=" w-full appearance-none border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>
            {errors.joinid && (
              <div className=" text-red-500 text-xs font-medium">
                {errors.joinid.message}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="joinpassword">비밀번호</label>
            <div className="relative flex items-center shadow-sm">
              <input
                id="joinpassword"
                {...register("joinpassword", {
                  required: "필수항목 입니다.",
                  minLength: { value: 8, message: "8자 이상이여야 합니다" },
                  maxLength: { value: 16, message: "16자 이하여야 합니다" },
                })}
                type="password"
                className=" w-full appearance-none border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>
            {errors.joinpassword && (
              <div className=" text-red-500 text-xs font-medium">
                {errors.joinpassword.message}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="joinpasswordcheck">비밀번호 재확인</label>
            <div className="relative flex items-center shadow-sm">
              <input
                id="joinpasswordcheck"
                {...register("joinpasswordcheck", {
                  required: "필수항목 입니다.",
                  minLength: { value: 8, message: "8자 이상이여야 합니다" },
                  maxLength: { value: 16, message: "16자 이하여야 합니다" },
                })}
                type="password"
                className=" w-full appearance-none border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>
            {(errors.joinpasswordcheck && (
              <div className=" text-red-500 text-xs font-medium">
                {errors.joinpasswordcheck.message}
              </div>
            )) ||
              (watch("joinpassword") !== watch("joinpasswordcheck") && (
                <div className=" text-red-500 text-xs font-medium">
                  비밀번호가 일치하지 않습니다.
                </div>
              ))}
          </div>

          <div className=" w-full">
            <label htmlFor="birth">생년월일</label>
            <div className="flex space-x-5">
              <div className="flex-1 relative flex items-center shadow-sm">
                <input
                  {...register("joinyear", {
                    required: "태어난 년도 4자리를 정확하게 입력하세요",
                  })}
                  placeholder="년(4글자)"
                  maxLength="4"
                  className="  w-full appearance-none border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>
              <select
                placeholder="월"
                name="joinmonths"
                id="month-select"
                className=" flex-1 border-[1px]  pl-3 shadow-sm"
                {...register("joinmonth", {
                  required: "태어난 월을 선택하세요",
                })}
              >
                <option value>월</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <div className=" flex-1 relative flex items-center shadow-sm">
                <input
                  {...register("joindate", {
                    required: "태어난 날짜 2자리를 입력하세요",
                  })}
                  placeholder="일"
                  maxLength="2"
                  className=" w-full appearance-none border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">셩별</label>
            <select {...register("joinsex")} className=" pl-3 w-full h-12">
              <option value="남">남</option>
              <option value="여">여</option>
            </select>
          </div>
          <button className=" text-center bg-blue-400 w-full h-12 rounded-md text-white font-bold">
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinPage;
