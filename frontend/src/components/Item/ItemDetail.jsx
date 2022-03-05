import React from "react";
import { useParams } from "react-router-dom";

const ItemDetail = (props) => {
  const params = useParams();
  console.log(params);
  return (
    //
    <div>hello</div>
  );
};

export default ItemDetail;
