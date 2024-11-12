import React from "react";
import load from "/public/assets/Frame 29.gif";

const Preloader = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000", 
        zIndex: 9999,
      }}
    >
      <img
        src={load}
        alt="Loading..."
        style={{ width: "150px", height: "150px" }} 
      />
    </div>
  );
};

export default Preloader;
