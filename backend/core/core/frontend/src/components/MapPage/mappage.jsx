import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import { Outlet, useNavigate } from "react-router-dom";

const MapPage = (props) => {
  const [marketsinfo, setMarketsinfo] = useState([]);
  const [overlayPos, setOverlayPos] = useState([]);
  const [currentmarketid, setCurrentMarketid] = useState(1);
  const navigate = useNavigate();
  const [cookies] = useCookies([]);
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
  const [hasChild, setHasChild] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);

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
        console.log(res.data);
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
            {marketsinfo.map((market) => {
              const position = {
                lat: market.latitude,
                lng: market.longitude,
              };
              const marketId = market.marketId;
              return (
                <MapMarker
                  className="z-0"
                  position={position}
                  key={marketId}
                  onClick={() => {
                    setOverlayPos(position);
                    setCurrentMarketid(marketId);
                    navigate("/map");
                    navigate(`${marketId}`);
                    setHasChild(true);
                  }}
                />
              );
            })}
          </Map>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <img
            src="/icon/299087_marker_map_icon.png"
            className="w-7 h-7"
            alt=""
          />
          <span>: 현재 위치</span>
          <img
            src="http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png"
            alt=""
            className=" w-5 h-7"
          />
          <span>: 다른 장터의 위치</span>
        </div>
        {!hasChild ? (
          <>
            <div className="transition-all  w-full relative flex justify-center items-center">
              <span className=" absolute top-40">장터 아이템을 표시</span>
            </div>
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default MapPage;
