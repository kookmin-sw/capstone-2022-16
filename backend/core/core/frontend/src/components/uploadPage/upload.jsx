import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Popup from "../components/popup";
const Upload = (props) => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm({ mode: onchange });
  const params = useParams();
  const [cookies] = useCookies([]);
  const [uploadsuccess, setUploadSucess] = useState(false);
  const [popupopen, setPopupOPen] = useState(false);
  const formData = new FormData();
  formData.append("chan", 1000);
  useEffect(() => {
    if (cookies.LoginCookie === undefined) navigate("/");
  }, []);

  const onValid = (data) => {
    const formData = new FormData();
    formData.append("photo", data.photo[0]);
    formData.append("description", data.itemdescription);
    formData.append("marketId",params.marketid);
    formData.append("itemName",data.itemname);
    formData.append("price",data.itemprice);
    formData.append("sellingTime",data.saletime);
    axios({
      method: "POST",
      url: `/market/save`,
      data: formData,
    }).then((res) => {
      setPopupOPen(true);
    });
  };
  const photo = watch("photo");
  const [photoPreview, setPhotoPreview] = useState("");
  useEffect(() => {
    if (photo && photo.length > 0) {
      const file = photo[0];
      setPhotoPreview(URL.createObjectURL(file));
    }
  }, [photo]);

  return (
    <div className=" w-full h-[100vh]">
      {popupopen && (
        <Popup
          itemclick={setUploadSucess}
          popupmsg="아이템등록이 완료되었습니다!"
          navigateurl="/map"
        ></Popup>
      )}
      <div
        onClick={() => {
          navigate(-1);
        }}
        className=" items-center justify-center flex relative bg-blue-500 "
      >
        <button className=" absolute left-3">
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
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col p-10 space-y-3"
      >
        <div>
          {photoPreview ? (
            <img
              src={photoPreview}
              className=" aspect-square  rounded-md text-gray-600"
            />
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
                {...register("photo")}
                accept="image/*"
                className="hidden"
                type="file"
              />
            </label>
          )}
        </div>

        <label htmlFor="itemname">물건 이름</label>
        <input
          id="itemname"
          type="text"
          {...register("itemname", { required: true })}
          className=" focus:border-blue-400 border-2 border-gray-400 rounded-md outline-none px-2 py-1"
        />
        <label htmlFor="itemprice">가격</label>
        <input
          {...register("itemprice", { required: true })}
          id="itemprice"
          type="text"
          className="focus:border-blue-400 border-2 border-gray-400 rounded-md outline-none px-2 py-1"
        />
        <label htmlFor="saletime">판매 시간</label>
        <select id="saletime" {...register("saletime", { required: true })}>
          <option value="10">10:00</option>
          <option value="13">13:00</option>
          <option value="18">18:00</option>
        </select>
        <label htmlFor="itemdes">설명</label>
        <textarea
          {...register("itemdescription", { required: true })}
          id="itemdes"
          cols="30"
          rows="10"
          className="focus:border-blue-400 border-2 border-gray-400 rounded-md outline-none px-2 py-1"
        ></textarea>
        <button className=" transition-colors hover:bg-blue-400 bg-blue-300 text-white text-xl p-2 rounded-md">
          물품 등록
        </button>
      </form>
    </div>
  );
};

export default Upload;