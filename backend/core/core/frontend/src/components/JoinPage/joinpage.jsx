import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Popup from "../components/popup";
import imageCompression from "browser-image-compression";

const JoinPage = (props) => {
  const [joinsuccess, setJoinsuccess] = useState(false);
  const navigate = useNavigate();
  const [popupopen, setPopupOPen] = useState(false);
  const [message, setMessage] = useState();
  const [photoPreview, setPhotoPreview] = useState("");
  const [photo, setPhoto] = useState();
  const handlingDataForm = async (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);

    // Blob를 구성하기 위한 준비, 이 내용은 저도 잘 이해가 안가서 기술하지 않았습니다.
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ia], {
      type: "image/jpeg",
    });
    const file = new File([blob], "image.jpg");

    // 위 과정을 통해 만든 image폼을 FormData에 넣어줍니다.
    // 서버에서는 이미지를 받을 때, FormData가 아니면 받지 않도록 세팅해야합니다.
    setPhoto(file);
  };

  const handleFileOnChange = async (e) => {
    let file = e.target.files[0]; // 입력받은 file객체

    // 이미지 resize 옵션 설정 (최대 width을 100px로 지정)
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 400,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      setPhoto(compressedFile);

      // resize된 이미지의 url을 받아 fileUrl에 저장
      const promise = imageCompression.getDataUrlFromFile(compressedFile);
      promise.then((result) => {
        setPhotoPreview(result);
      });
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        // 변환 완료!
        const base64data = reader.result;

        // formData 만드는 함수
        handlingDataForm(base64data);
      };
    } catch (error) {
      console.log(error);
    }
  };

  const deletePhoto = () => {
    setPhotoPreview(null);
  };
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
            <label htmlFor="">성별</label>
            <select {...register("joinsex")} className=" pl-3 w-full h-12">
              <option value="남">남</option>
              <option value="여">여</option>
            </select>
          </div>
          <div>
            <label>프로필 사진</label>
            {photoPreview ? (
              <div className="flex justify-center">
                <img
                  src={photoPreview}
                  className=" aspect-square  rounded-md max-w-sm"
                  onClick={deletePhoto}
                />
              </div>
            ) : (
              <label className="w-full flex items-center justify-center border-2 border-dashed border-gray-300 py-6 h-48 rounded-md text-gray-600 hover:text-blue-400 hover:border-blue-400 hover:transition-colors cursor-pointer">
                <svg
                  className="h-12 w-12"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <input
                  id="uphoto"
                  {...register("photo")}
                  accept="image/*"
                  className="hidden"
                  type="file"
                  onChange={handleFileOnChange}
                />
              </label>
            )}
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
