import React from "react";
import { Link } from "react-router-dom";
import pgNotFound from "./404.gif";
import "./somethingwentWrong.css";
const SomethingWentWrong = () => {
  return (
    <>
      <Link className="goHomeLink" to={`/`}>
        Go Home{" "}
      </Link>

      <div>
        <img srcSet={pgNotFound} className="Img_404" alt="Page not found" />
      </div>
    </>
  );
};

export default SomethingWentWrong;
