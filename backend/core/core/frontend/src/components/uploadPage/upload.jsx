import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Popup from "../components/popup";
import imageCompression from "browser-image-compression";
const Upload = (props) => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm({ mode: onchange });
  const params = useParams();
  const [cookies] = useCookies([]);
  const [uploadsuccess, setUploadSucess] = useState(false);
  const [popupopen, setPopupOPen] = useState(false);
  const [photopopup, setPhotoPopup] = useState(false);
  const [photo, setPhoto] = useState();
  const [photoPreview, setPhotoPreview] = useState("");
  useEffect(() => {
    if (cookies.LoginCookie === undefined) navigate("/");
  }, []);
  const formData = new FormData();

  const onValid = (data) => {
    formData.append("photo", photo);
    formData.append("description", data.itemdescription);
    formData.append("marketId", params.marketid);
    formData.append("itemName", data.itemname);
    formData.append("price", data.itemprice);
    formData.append("sellingTime", data.saletime);
    for (let value of formData.values()) {
      console.log(value);
    }
    axios({
      method: "POST",
      url: `/market/save`,
      data: formData,
    }).then((res) => {
      setPopupOPen(true);
    });
  };
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

  return (
    <div className=" w-full h-[100vh] relative">
      {popupopen && (
        <Popup
          itemclick={setUploadSucess}
          popupmsg="아이템등록이 완료되었습니다!"
          navigateurl="/map"
        ></Popup>
      )}
      {photopopup && (
        <div className="flex bg-blue-300 rounded-xl text-white absolute top-44 left-1/2 -translate-y-1/2 -translate-x-1/2 py-1 px-4 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
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
          파일크기가 2MB를 넘을 수 없습니다
        </div>
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
