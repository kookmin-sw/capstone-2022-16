import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import JoinPage from "./components/JoinPage/joinpage";
import LoginPage from "./components/LoginPage/loginpage";
import MapPage from "./components/MapPage/mappage";
import ItemsInMarket from "./components/Item/ItemsInMarket";
import ItemDetail from "./components/Item/ItemDetail";
import Upload from "./components/uploadPage/upload";
import MainPage from "./components/mainPage/main";
import Profile from "./components/profilePage/profile";
import { useState } from "react";
import SaleList from "./components/saleList/salelist";
import MarketReg2 from "./components/marketreg/marketreg2";
import ReserveList from "./components/reserveList/reservelist";

function App() {
  const [user, setUser] = useState();
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
          <Route path="main" exact element={<MainPage></MainPage>}></Route>
          <Route path="profile" exact element={<Profile></Profile>}></Route>
          <Route
            path="/:marketid/upload"
            exact
            element={<Upload></Upload>}
          ></Route>
          <Route
            path="marketreg"
            exact
            element={<MarketReg2></MarketReg2>}
          ></Route>
          <Route
            path="profile/:memberid/salelist"
            exact
            element={<SaleList></SaleList>}
          ></Route>
          <Route
            path="profile/:memberid/reservelist"
            exact
            element={<ReserveList></ReserveList>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
