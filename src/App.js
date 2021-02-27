/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import MyTable from "./components/MyTable/MyTable";
import Search from "./components/Search/Search";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="container">
          <Search />
          <MyTable />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
