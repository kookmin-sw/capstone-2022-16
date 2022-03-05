import React from "react";
import Items from "./items";
import dummy from "../../data.json";
import { useParams } from "react-router-dom";
const ItemsInMarket = (props) => {
  const params = useParams();
  return (
    <div className=" overflow-y-scroll h-80">
      {dummy.items.map((item) => (
        <Items
          key={item.id}
          description={item.description}
          name={item.name}
        ></Items>
      ))}
    </div>
  );
};

export default ItemsInMarket;
