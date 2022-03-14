import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import JoinPage from "./components/JoinPage/joinpage";
import LoginPage from "./components/LoginPage/loginpage";
import MapPage from "./components/MapPage/mappage";
import ItemsInMarket from "./components/Item/ItemsInMarket";
import ItemDetail from "./components/Item/ItemDetail";
import { useState } from "react";
import Upload from "./components/uploadPage/upload";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<LoginPage></LoginPage>}></Route>
          <Route path="join" exact element={<JoinPage></JoinPage>}></Route>
          <Route path="map" element={<MapPage></MapPage>}>
            <Route
              path=":marketid"
              element={<ItemsInMarket></ItemsInMarket>}
            ></Route>
          </Route>
          <Route
            path="/map/:marketid/:itemid"
            element={<ItemDetail></ItemDetail>}
          ></Route>
          <Route path="upload" exact element={<Upload></Upload>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
