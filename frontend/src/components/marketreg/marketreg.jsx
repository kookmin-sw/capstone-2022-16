import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router-dom";

const MarketReg = (props) => {
  const [marker, setMarkers] = useState({
    position: {
      lat: 33.450701,
      lng: 126.570667,
    },
  });
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  }, []);

  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onValid = (data) => {
    console.log(data);
    axios({
      method: "POST",
      url: ``,
      data: {
        name: data.itemname,
        price: data.itemprice,
        description: data.itemdescription,
      },
    }).then((req) => {
      console.log(req);
    });
  };
  return (
    <div>
      <div className=" items-center justify-center flex relative bg-blue-500 ">
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
      <Map // 지도를 표시할 Container
        center={state.center}
        style={{
          // 지도의 크기
          width: "100%",
          height: "450px",
        }}
        level={2} // 지도의 확대 레벨
        onClick={(_target, mouseEvent) => {
          setMarkers({
            position: {
              lat: mouseEvent.latLng.getLat(),
              lng: mouseEvent.latLng.getLng(),
            },
          });
          console.log(marker);
        }}
      >
        <MapMarker // 마커를 생성합니다
          position={marker.position}
          image={{
            src: "icon/8726082_map_marker_alt_icon.png", // 마커이미지의 주소입니다
            size: {
              width: 40,
              height: 40,
            }, // 마커이미지의 크기입니다
            options: {
              offset: {
                x: 20,
                y: 30,
              }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
            },
          }}
        />
      </Map>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col p-10 space-y-3"
      >
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
        <label htmlFor="itemdes">설명</label>
        <textarea
          {...register("itemdescription", { required: true })}
          id="itemdes"
          cols="30"
          rows="10"
          className="focus:border-blue-400 border-2 border-gray-400 rounded-md outline-none px-2 py-1"
        ></textarea>
        <button className=" transition-colors hover:bg-blue-400 bg-blue-300 text-white text-xl p-2 rounded-md">
          장터 등록
        </button>
      </form>
    </div>
  );
};

export default MarketReg;