import React from "react";
import { Circle, Map, MapMarker } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Popup from "../components/popup";

const TradeMain = (props) => {
  const [checking, setChecking] = useState();
  const [marketlat, setMarketlat] = useState();
  const [marketlng, setMarketlng] = useState();
  const [ispopup, setPopUp] = useState(true);
  const [errorpopup, setErrorPopUp] = useState(false);

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };
  const navigate = useNavigate();
  const getDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  };
  const [marketinfo, setMarketInfo] = useState([]);
  const [state, setState] = useState({
    center: {
      lat: 37.58827661475296,
      lng: 127.2197275271777,
    },
    errMsg: null,
    isLoading: true,
  });
  const chken = (lat1, lng1, lat2, lng2) => {
    const dis = Math.floor(getDistance(lat1, lng1, lat2, lng2) * 1000);
    if (dis < 20) setPopUp(true);
    else {
      setErrorPopUp(true);
    }
  };

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
        setMarketInfo(res.data);
        setMarketlat(res.data[0].latitude);
        setMarketlng(res.data[0].longitude);
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
  return (
    <div className=" w-full h-[100vh] bg-gray-100 box-border">
      {ispopup && (
        <Popup
          itemclick={setChecking}
          popupmsg="입장이 완료되었습니다."
          navigateurl="/tradingchart"
        ></Popup>
      )}
      {errorpopup && (
        <div className=" flex flex-col items-center justify-between w-1/2 h-40 absolute rounded-md bg-blue-300 z-10 top-1/3 left-1/4">
          <div className=" w-full h-7 bg-blue-500 rounded-md"></div>
          <span className="flex justify-center items-center">
            장터 주변이 아닙니다
          </span>
          <button
            onClick={() => {
              setErrorPopUp(false);
            }}
            className=" mb-7 w-1/4 bg-blue-500 px-3 text-white py-1 rounded-md"
          >
            확인
          </button>
        </div>
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
          >
            <MapMarker
              position={state.center}
              image={{
                src: "/icon/299087_marker_map_icon.png", // 마커이미지의 주소입니다
                size: {
                  width: 40,
                  height: 40,
                }, // 마커이미지의 크기입니다
              }}
            />
            {/* 현재 자기 위치 마커에표시*/}
            {marketinfo.map((market) => {
              const position = {
                lat: market.latitude,
                lng: market.longitude,
              };
              const marketId = market.marketId;
              return (
                <div key={marketId} className="relative">
                  <MapMarker
                    className="z-0"
                    position={position}
                    key={marketId}
                  />
                  <Circle
                    center={position}
                    radius={20}
                    strokeWeight={2} // 선의 두께입니다
                    strokeColor={"#75B8FA"} // 선의 색깔입니다
                    strokeOpacity={0.3} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                    strokeStyle={"dash"} // 선의 스타일 입니다
                    fillColor={"#CFE7FF"} // 채우기 색깔입니다
                    fillOpacity={0.5} // 채우기 불투명도 입니다
                  />
                </div>
              );
            })}
          </Map>
          {checking && <div className=" absolute w-10 h-5"></div>}
        </div>
      </div>
      <div className="p-2">
        <p className="flex items-center justify-center my-5">
          장터 근처에 오면 CHECK 버튼을 눌러 입장 신청을 해주세요
        </p>
        <button
          className=" py-2 w-full bg-blue-300 rounded-md text-white text-2xl my-5 hover:bg-blue-400 transition-colors"
          onClick={() => {
            chken(state.center.lat, state.center.lng, marketlat, marketlng);
          }}
        >
          CHECK
        </button>
      </div>
    </div>
  );
};

export default TradeMain;
