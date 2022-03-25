import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import { Outlet, useNavigate } from "react-router-dom";

const MapPage = (props) => {
  const [marketsinfo, setMarketsinfo] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [overlayPos, setOverlayPos] = useState([]);
  const [currentmarketid, setCurrentMarketid] = useState(1);
  const navigate = useNavigate();
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
        url: `/map/?lng=${state.center.lng}&lat=${state.center.lat}`,
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
                    setIsOpen(true);
                    setOverlayPos(position);
                    setCurrentMarketid(marketId);
                  }}
                />
              );
            })}
            {/* 주변 장터의 위치 마커에 표시*/}
            {isOpen && (
              <CustomOverlayMap position={overlayPos} className="z-10 relative">
                <div className="absolute w-40 h-24 box-border text-xs bg-blue-200 font-medium rounded-lg shadow-md p-3">
                  <div className=" space-y-2">
                    <div className="flex justify-between">
                      <div>장터 이름</div>
                      <div
                        onClick={() => {
                          setIsOpen(false);
                        }}
                        title="닫기"
                      >
                        X
                      </div>
                    </div>
                    <div className=" flex  items-center space-x-3">
                      {/*  판매자 프로필 */}
                      <img
                        src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxEHBhAIBw8OFRUODw8QEBMSEBAPEA4SFhMWFhYSFx8YHTQgGRoxHRMTITEhJSkuLi4uFx8zODMsNyktLisBCgoKDg0OGhAQGjYlHyU1Ky0tKy0wKy0tLi0tLS0rLS0tLS0tLS0tKy03NystLSsrNS0tLS03Kzc3LS0rLS0tN//AABEIAOEA4QMBIgACEQEDEQH/xAAaAAEAAgMBAAAAAAAAAAAAAAAABAUCAwYB/8QAMxABAAECAwUFBwQDAQAAAAAAAAECAwQRcQUhMTJBEhNRYXI0gZGhsdHhIkKSwSMzghT/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAwIBBAX/xAAcEQEBAQEBAQEBAQAAAAAAAAAAAQIRAzESQSH/2gAMAwEAAhEDEQA/AOsAe980AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHvHgscLs/d27/8fu5bx2S1At2qrk5W4mdISKdn3J6RGs/ZbUxFMZUxlo9Y/ak84qJ2fcjhETpLRcs1Wv8AZTMfRfExnGUn7L5xzotMVs+Ko7VjdPh0nTwVkx2Zyno3L1O5seAOuAAAAAAAAAAAAAAAAAAANlm33t2KI6yCds3DZR39f/Pl5rAiMoyjoJW9Xk5ABx0AAQto4bt0d7Rxjj5wmhLws7HOjdirXc36qI8d2ktKzzgAAAAAAAAAAAAAAAAACZsunPE5+FMz/X9oabsqcsRMeNM/WHNfHc/VqAkuAAAAAAq9rU5XqavGnL4T+UFYbWn/ACUx5T9fwr1c/ENfQB1wAAAAAAAAAAAAAAAAbsJc7rEU1T45TpO5pAjohFwGI7612auNO6fOPFKRv+PRL0AAAABoxl/uLOccZ3U/cLeK3H3O8xU5dP0/D85oz14tHnt6AAAAAAAAAAAAAAAAAAAAztXJtVxXRxhcYXFU4iMuE9Y+ykexOW+HLOu51x0IqLW0K7cZVZVa8fik07Tp/dTV7piWPzVZuJwgztOn9tNXvyhHu7Qrr3UZU6b5c/NLuLDEYmmxT+rj0jrKnvXZvXO3X+IjwYTPanOp4pM8T1roA6yAAAAAAAAAAAAAAAAAAAAAADKmmauWJnSM2cWK54UV/wAZBqG2cPXHGiv+MsJomnmiY1jIOMQAAAAAAAAAAAAAAAAAAABnatTdq7NuM/6WVjZ0U772+fDp+XLZHZm1W0W5uTlREzpCVb2dVVvrmI+crSmmKYypiI03PWLtSec/qJb2dRTzZz78o+TfRYoo5aafhvbBztakkAHHQAGFVmmvmppn3Q0V7Poq4RMaT90oOlkqsubNmN9uqJ13SiXbNVqcrkTH0XxMZxlLU1WLiOdFtf2fTXvt/pn5K69Yqs1ZXI0npLcsqdzY1AOuAAAAAAAAAADdhcPOIudmOEcZ8GleYSz3NiKevGdXNXjWc9rOzaizR2bcfedWYJLAAAAAAAAAAAADyuiK6ezXGcS9AU2Mwv8A56s6eWeHl5Iy/vW4u2poq6/LzUMx2ZynpuUzeo7zyvAGmQAAAAAAAHtPNGroXPU80aw6FjanmAMKAAAAAAAAAAAAAACixW7E1+qfqvVHi/aq/VLeGPT40gNpAAAAAAAAMqeaNYdA5+nmjWHQMbU8wBhQAAAAAAAAAAAAAAUeL9qr9UrxR4v2qv1S3hj0+NIDaQAAAAAAADKnmjWHQOfo541h0DG1PMAYUAAAAAAAAAAAAAAFHi/aq/VK8UeL9qr9Ut4Y9PjSA2kAAAAAAAAyo541h0AMbU8wBhQAAAAAAAAAAAAAAUeL9qr9Ug3hj0+NIDaQAAAD/9k="
                        alt=""
                        className=" w-10 h-10 rounded-full"
                      />
                      <div>판매 물품</div>
                      <button
                        onClick={() => {
                          navigate(`${currentmarketid}`);
                          setHasChild(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </CustomOverlayMap>
            )}
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
            <div className=" bg-blue-300 flex items-center justify-center">
              <h3 className=" font-semibold text-lg">장터 이름</h3>
            </div>
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
