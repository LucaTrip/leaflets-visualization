import React from "react";

import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { GlobalProvider } from "./app/context/GlobalContext";

import Header from "./app/components/Header";
import Home from "./app/components/Home";
import Filters from "./app/components/Filters";

const App = () => {
  return (
    <GlobalProvider>
      <div className="bg-gray-200 h-screen overflow-y-scroll overflow-x-hidden">
        <Header />
        <Filters />
        <Home />
      </div>
    </GlobalProvider>
  );
};

export default App;
