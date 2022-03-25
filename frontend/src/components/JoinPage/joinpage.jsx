import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Popup from "../components/popup";

const JoinPage = (props) => {
  const [joinsuccess, setJoinsuccess] = useState(false);
  const navigate = useNavigate();
  const [popupopen, setPopupOPen] = useState(false);
  const [message, setMessage] = useState();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: "onChange",
  });

  const onValid = (data) => {
    const birth = +(data.joinyear + data.joinmonth + data.joindate);
    axios({
      method: "POST",
      url: `/join?password=${data.joinpassword}&name=${data.joinnickname}&loginId=${data.joinid}`,
      data: {
        birthDate: `${birth}`,
        name: `${data.joinnickname}`,
      },
    }).then((res) => {
      if (res.data === "ok") {
        setJoinsuccess(true);
      } else {
        setMessage(res.data.message);
        //아이디가 같은경우
        if (res.data.code === 10000) {
          setMessage("이미 같은 아이디가 있습니다. 아이디를 바꾸어주세요");
          setPopupOPen(true);
        }
        //닉네임이 같은경우
        else if (res.data.code === 10001) {
          setMessage("이미 같은 닉네임이 있습니다. 닉네임을 바꾸어주세요");
          setPopupOPen(true);
        }
      }
    });
  };
  const onInvalid = (errors) => {
    setMessage("빈칸을 모두 채워주세요");
    setPopupOPen(true);
    console.log(errors);
  };

  return (
    <div className=" px-10 py-10 flex justify-center relative">
      {joinsuccess && (
        <Popup
          itemclick={setJoinsuccess}
          popupmsg="가입이 완료되었습니다!"
          navigateurl="/"
        ></Popup>
      )}
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
          <div>
            <label htmlFor="joinnickname">닉네임</label>
            <div className="relative flex items-center shadow-sm">
              <input
                id="joinnickname"
                {...register("joinnickname", {
                  required: "필수항목 입니다",
                })}
                className=" w-full appearance-none border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>
            {errors.joinnickname && (
              <div className=" text-red-500 text-xs font-medium">
                {errors.joinnickname.message}
              </div>
            )}
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
      {popupopen && (
        <div className=" absolute w-96 h-40 bg-blue-300 top-[40%] rounded-md">
          <div className="relative" onClick={() => setPopupOPen(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white absolute right-0 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className=" rounded-md bg-blue-600 text-white flex justify-center">
            <span>market</span>
          </div>
          <div className=" relative flex justify-center">
            <span className=" absolute top-12 font-mono text-sm">
              {message}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinPage;
