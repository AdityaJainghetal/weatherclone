import "./App.css";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";



import DetailedCity from "./components/DetailedView/detailedCity";
import Weather from "./components/weather";
import SomethingWentWrong from "./components/SomethingWentWrong/somethingWentWrong";
function App() {
  return (
    <div className="App">
      <header>
        <h1 className="app-heading"> 
        <a href="/"> Weather Forecast App </a>
        </h1>
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Weather />} />
            <Route path="/details/:city" element={<DetailedCity />} />
            <Route path="/details" element={<SomethingWentWrong />} />
          </Routes>
        </Router>
      </Suspense>
      <footer>
        <div className="my-footer">
          Developed by{" "}
          <a href="https://github.com/AdityaJainghetal/portfolio2" target="_blank">
            {" "}
            Aditya Jain{" "}
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
