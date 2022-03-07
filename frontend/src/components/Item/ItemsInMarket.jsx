import React, { useEffect, useState } from "react";
import Items from "./items";
import dummy from "../../data.json";
import { useParams } from "react-router-dom";
import axios from "axios";
const ItemsInMarket = (props) => {
  const [itemlist, setItemlist] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "/market/1",
    }).then((res) => {
      setItemlist(res.data.items);
    });
  }, []);
  return (
    <div className=" overflow-y-scroll h-80">
      {itemlist.map((item) => (
        <Items
          key={item}
          // description={item.description}
          name={item}
        ></Items>
      ))}
    </div>
  );
};

export default ItemsInMarket;
