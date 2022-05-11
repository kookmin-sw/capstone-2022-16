import React from "react";

const Practice = (props) => {
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };
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

  return (
    <div>
      {getDistance(
        37.58756586741058,
        127.22023558840446,
        37.588503349018715,
        127.21914373392917
      )}
    </div>
  );
};

export default Practice;
<div>hello</div>;
