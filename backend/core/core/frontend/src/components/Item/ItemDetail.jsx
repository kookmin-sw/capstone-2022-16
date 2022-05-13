import axios from "axios";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";

const ItemDetail = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies] = useCookies([]);
  const [isreserved, setIsreserved] = useState(false);
  useEffect(() => {
    if (cookies.LoginCookie === undefined) navigate("/");
    location.state.reserveMembers.map((item) => {
      if (item === localStorage.getItem("name")) setIsreserved(true);
      else setIsreserved(false);
    });
  }, []);
  const reserveItem = async (e) => {
    axios({
      method: "POST",
      url: `/market/reserve?itemId=${location.state.itemId}`,
    }).then((res) => {
      console.log(res.data);
    });
  };
  return (
    //

    <div className=" w-full h-[100vh] flex flex-col items-center">
      <div className=" w-full items-center justify-center flex relative bg-blue-500 ">
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
      <img
        src="https://us.123rf.com/450wm/martialred/martialred1507/martialred150700888/42620709-landschaft-foto-bild-flach-symbol-f%C3%BCr-apps-und-websites.jpg"
        alt=""
        className=" w-80"
      />
      <div className="border-b-2 p-4 w-full flex justify-between items-center">
        <div className="flex items-center justify-center space-x-3">
          <img
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIHBg8SBw4PEhATDg0PFRAPEA8ODQ0RFREWFhURExYYKCggGBslHRUfITEhJSkrLi4uFx8zODMtNyg5OisBCgoKDg0OFw8QGjIlHSItNy0tKy4tKzctLy0tKzgtLS0tLSstLi0rNy0tLC0tKy0rOC0tKy03LS0rLTctKy0rN//AABEIAOAA4QMBIgACEQEDEQH/xAAaAAEAAgMBAAAAAAAAAAAAAAAABAUCAwYB/8QANhABAAECAgYIBAUFAQAAAAAAAAECAwQRBSExUWFxEhMiMkGRocEzcoGxNFJiotEUQoLh8SP/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAwIBBAX/xAAdEQEBAQEAAgMBAAAAAAAAAAAAAQIRAzESIUET/9oADAMBAAIRAxEAPwDrAH0XzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAe00zVPZiZ5a26nB3KtlE/XKHOu8aBInBXI/s8piWmuiaJ7cTHOMjsOViA64AAAAAAAAAAAAAAAAAAAAAAJ+F0f0ozv6v0+P1Z6OwuURXcjX4Ru4rBLW/yK5x+1jbtxbjKiIjkyBNQeVUxVGVURMcXoCBidHRMZ2NU/l8J5KyqOjOVW10SHj8L1tHSojtR+6FM7/KnrH7FSAqkAAAAAAAAAAAAAAAAAANuEtddfiPDbPKGpYaIo7VU8oZ1eRrM7VlGqNQCC4AAAAACm0hZ6rETlsnXHujLTS1Gdqmd1WXnCrXzexDU5QBpkAAAAAAAAAAAAAAAAWeiPhVfNH2VifomvK5VG+Iny/wCs79N49rMBBYAAAAABE0p+F/ypVCz0tX2KaeOfkrFsekd+wBtgAAAAAAAAAAAAAAAAZ2LnU3YqjwnzhgDroaKorpiadkxm9VOAxfUz0bnd3/l/0tonONSGpxfN7ABl0AAJnKNYrdIYzOJotTzn2h2TrlvEXGXuvvzMbNkcmkF4hQB1wAAAAAAAAAAAAAAAAAASMNjKrGqNdO6fZHHLOuy8XNrHUXNs5Tun+UiKoq2TDniJy2MXxtzyOimctrRdxdFrbVE8I1ypJnPaH8y+RLxOOqvRlR2afWUQG5OMW9AHXAAAAAAAAAAAAAAAAAAAZ2bNV6rK3H8Qs8Po+m3rudqf2s3UjUzarLdmq7P/AJ0zP2Srejaqu/MR6ytYjKNQnd1SYiDToymO9VVPLKGcaOo/V5pY58q18YiTo6jj5sKtGUz3aqo55SnB8qfGKq5oyqO5MT6Si3bNVr4lMx9l+TGca3Zus3Ec6Le/o+m58Pszw2eSsv2KrFWVyPr4SpNSp3NjWA0yAAAAAAAAAAAAAAJGDwk4ic51U79/CHmDw/8AUXOEbZ9l1RTFFMRTGUQxrXPpTOe/by3bi1RlbjKGQIqgAAAAAAADG5RFynKuM4ZAKfGYObE5066fWOaK6GqOlTlVsU2Nw39PX2e7OzhwVzrv1UtZ59xHAUTAAAAAAAAAACmOlVEU7Z1Cbou10rs1TsjZzly3kdk7eLDDWYsWoiPrO+W0HnegAAAAAAAAAAAAYX7UXrUxV4+k72YDnrlE265irbE5PFhpWzlMVRyn2V70S9iFnKAOsgAAAAAAAC60fb6GFp46/NS7XQ0R0aIiPCIhPyVTxx6AkqAAAAAAAAAAAAAA1Yu31uHqjhn9YULo3P3aehdqjdVMeqvjqfkjEBRIAAAAAAABlajO7T80fd0Cgs/Gp+an7r9LyK+MATUAAAAAAAAAAAAAAFHjIyxVfzLxR438XXz9lPH7Y8nppAVRAAAAf//Z"
            alt=""
            className=" w-10 h-10 rounded-full"
          />
          <span>{location.state.name}</span>
        </div>
        <span>판매자 정보</span>
      </div>
      <div className=" w-full p-4">
        <div className="flex justify-between items-center">
          <h1 className=" mb-4 text-2xl">{location.state.itemname}</h1>
          <div className="mb-4 text-2xl flex items-center space-x-4">
            <h1 className=" ">{location.state.price}원</h1>
            <button onClick={reserveItem}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={classNames(
                  `h-6 w-6 text-pink-400`,
                  {
                    "fill-current": isreserved,
                  },
                  {
                    "text-blue-400":
                      location.state.name === localStorage.getItem("name"),
                  }
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <p className=" font-normal ">{location.state.des}</p>
      </div>
    </div>
  );
};

export default ItemDetail;
