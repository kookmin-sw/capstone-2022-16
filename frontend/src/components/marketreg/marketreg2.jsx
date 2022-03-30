/* eslint-disable no-undef */
import axios from "axios";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { Circle, Map, MapMarker } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router-dom";
import Popup from "../components/popup";

const MarketReg2 = (props) => {
  const [marketsinfo, setMarketsinfo] = useState([]);

  const navigate = useNavigate();
  const [cookies] = useCookies([]);
  const [isimpossible, setisimpossible] = useState(false);
  const [marketregsuccess, setMarketRegSucess] = useState(false);
  const [popupopen, setPopupOPen] = useState(false);
  const [ismarketexist, setIsMarketExist] = useState(false);
  const [errormsg, setErrorMsg] = useState();
  const { register, handleSubmit } = useForm();
  const [marker, setMarkers] = useState({
    position: {
      lat: 33.450701,
      lng: 126.570667,
    },
  });
  useEffect(() => {
    if (cookies.LoginCookie === undefined) navigate("/");
  }, []);
  const [state, setState] = useState({
    center: {
      lat: 37.58827661475296,
      lng: 127.2197275271777,
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

      axios({
        method: "GET",
        url: `/map?lng=${state.center.lng}&lat=${state.center.lat}`,
      }).then((res) => {
        setMarketsinfo(res.data);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  }, [state.center.lat, state.center.lng]);
  useEffect(() => {
    setTimeout(() => {
      setisimpossible(false);
    }, 1000);
  }, [isimpossible]);

  const onValid = (d) => {
    ismarketexist
      ? axios({
          method: "POST",
          url: `/market/add/?latitude=${marker.position.lat}&longitude=${marker.position.lng}`,
        }).then(() => {
          setPopupOPen(true);
        })
      : setErrorMsg("장터를 오픈할 위치를 선택해주세요") ||
        setisimpossible(true);
  };
  const onCircleClick = useCallback((e) => {
    kakao.maps.event.preventMap();
    setErrorMsg("다른 장터가 주위에 있습니다.");
    setisimpossible(true);
  });
  return (
    <div className=" w-full h-[100vh] bg-gray-100 box-border">
      {popupopen && (
        <Popup
          itemclick={setMarketRegSucess}
          popupmsg="장터등록이 완료되었습니다!"
          navigateurl="/main"
        ></Popup>
      )}
      <div className=" items-center justify-center flex relative bg-blue-500 ">
        <button onClick={() => navigate("/main")} className=" absolute left-3">
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
      <div className="p-2 space-y-3">
        <div className="flex justify-center">
          <span className=" text-gray-700 font-medium mb-4">
            장터를 오픈할 위치를 지정해주세요
          </span>
        </div>
        <div className=" border-4 border-blue-400 rounded-3xl p-2">
          <Map
            className=" rounded-3xl"
            // 지도를 표시할 Container
            id={`map`}
            center={state.center}
            style={{
              // 지도의 크기
              width: "100%",
              height: "450px",
            }}
            level={2} // 지도의 확대 레벨
            onClick={(_target, mouseEvent) => {
              setisimpossible(false);
              setIsMarketExist(true);
              setMarkers({
                position: {
                  lat: mouseEvent.latLng.getLat(),
                  lng: mouseEvent.latLng.getLng(),
                },
              });
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
            {/* 현재 자기 위치 마커에표시*/}
            {marketsinfo.map((market) => {
              const position = {
                lat: market.latitude,
                lng: market.longitude,
              };
              const marketId = market.marketId;
              return (
                <div key={marketId}>
                  <MapMarker
                    className="z-0"
                    position={position}
                    key={marketId}
                  />
                  <Circle
                    center={position}
                    radius={40}
                    strokeWeight={2} // 선의 두께입니다
                    strokeColor={"#75B8FA"} // 선의 색깔입니다
                    strokeOpacity={0.3} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                    strokeStyle={"dash"} // 선의 스타일 입니다
                    fillColor={"#CFE7FF"} // 채우기 색깔입니다
                    fillOpacity={0.5} // 채우기 불투명도 입니다
                    onClick={onCircleClick}
                  />
                </div>
              );
            })}
            {/* 주변 장터의 위치 마커에 표시*/}
          </Map>
        </div>
        <div className="flex mt-3 space-x-2 items-center justify-center">
          <img
            src="http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png"
            alt=""
            className=" w-5 h-7"
          />
          <span>: 다른 장터의 위치</span>
          <img
            src="icon/8726082_map_marker_alt_icon.png"
            alt=""
            className="w-7 h-8"
          />
          <span>: 장터를 오픈할 위치</span>
        </div>

        <form
          onSubmit={handleSubmit(onValid)}
          className="flex flex-col space-y-3"
        >
          <label htmlFor="marketname">장터 이름</label>
          <input
            id="marketname"
            type="text"
            {...register("marketname", { required: true })}
            className=" focus:border-blue-500 border-2 border-gray-700 rounded-md outline-none px-2 py-1"
          />

          <button className=" transition-colors hover:bg-blue-400 bg-blue-300 text-white text-xl p-2 rounded-md">
            장터 등록
          </button>
        </form>
      </div>
      {isimpossible && (
        <div
          className=" font-medium transition-all flex justify-center items-center absolute left-[15%] top-[17%] w-[70%] z-10 rounded-full flex items-center bg-blue-400 text-white text-sm font-bold px-4 py-3"
          role="alert"
        >
          <svg
            className="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
          </svg>
          <p className=" text-center">{errormsg}</p>
        </div>
      )}
    </div>
  );
};

export default MarketReg2;
