import React, { useRef, useState, useEffect } from "react";
import FadeImage from "../customise/FadeImage";
import Navbar from "../Nabar";
import usdollarsLFT from "/assets/usdollarsLFT.webp";
import usdollarsLFTman from "/assets/usdollarsLFTman.webp";
import usdollarsRFT from "/assets/usdollarsRFT.webp";
import usdollarsRFTman from "/assets/usdollarsRFTman.webp";

function UsDollars({ goToContact }) {
  const boxRef = useRef(null);
  const [height, setHeight] = useState(10);

  useEffect(() => {
    const updateHeight = () => {
      const width = boxRef.current.offsetWidth;
      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      if (isMobile) {
        setHeight(width * 0.165);
      } else {
        setHeight(width * 0.18);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);
  useEffect(() => {
    const phrases = document.querySelectorAll(".phrase");
    phrases.forEach((phrase, index) => {
      phrase.style.animationDelay = `${index * 0.3}s`;
    });
  }, []);

  return (
    <div className="relative min-h-screen min-w-screen max-h-screen min-w-max  text-white flex flex-col select-none">
      <Navbar goToContact={goToContact} />
      <main className="p-4 w-full absolute flex-grow flex flex-col items-center justify-center p-4 sm:px-6 lg:px-8 text-center" style={{margin: '50px 0'}}>
        <FadeImage
          text={<div className="year pt-2 ">c.1944</div>}
          direction="up"
        />
        <FadeImage
          text={
            <h1 className="head m-0 p-1">
              US <span className="tail">DOLLARS</span>
            </h1>
          }
          direction="up"
        />
        <FadeImage
          text={
            <p className="particles m-0 p-1">
              <span className="">
                The U.S. dollar became the global standard after World War II &nbsp;
              </span>
              <span className="">where most currencies </span>
              <span className="">were pegged to the </span>
              <span className="phrase">dollar, which was </span>
              <span className="phrase">convertible to gold. </span>
              <span className="phrase">This made the U.S. </span>
              <span className="phrase">dollar the world's </span>
              <span className="phrase">reserve </span>
              <span className="phrase">currency, providing </span>
              <span className="phrase">stability in </span>
              <span className="phrase">international trade. </span>
              <span className="phrase">The gold </span>
              <span className="phrase">convertibility was </span>
              <span className="phrase">ended in 1971, </span>
              <span className="phrase">but the dollar </span>
              <span className="phrase">remained the </span>
              <span className="phrase">dominant global currency.</span>
            </p>
          }
          direction="up"
        />
      </main>
      <div
        style={{
          position: "relative",
          height: "100vh",
          width: "100%",
          zIndex: 1,
        }}
      >
        <div
          className="usbeam"
          style={{
            position: "absolute",
            height: `${height}%`,
            width: "auto",
            left: -8,
            display: "flex",
            float: "left",
            bottom: -10,
          }}
        >
          <FadeImage
            src={usdollarsLFT}
            className="img-fluid"
            alt="leftarc"
            direction="right"
            style={{ height: "100%", width: "100%", objectFit: "contain" }}
          />
        </div>
        <div
          className="usleft"
          style={{
            position: "absolute",
            height: "auto",
            width: "39.7%",
            left: -20,
            bottom: 0,
          }}
        >
          <FadeImage
            src={usdollarsLFTman}
            className="img-fluid"
            alt="leftman"
            direction="right"
            style={{ width: "100%", objectFit: "contain" }}
          />
        </div>

        <div
          className="usbeam"
          style={{
            zIndex: 1,
            position: "absolute",
            height: `${height}%`,
            width: "auto",
            right: -20,
            bottom: 0,
          }}
        >
          <FadeImage
            src={usdollarsRFT}
            className="img-fluid"
            alt="rightarc"
            direction="left"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>

        <div
          className="usright"
          ref={boxRef}
          style={{
            zIndex: 2,
            position: "absolute",
            width: "36vw",
            height: "auto",
            right: 0,
            bottom: 0,
          }}
        >
          <FadeImage
            src={usdollarsRFTman}
            className="img-fluid"
            alt="rightman"
            direction="left"
            style={{ width: "100%", objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
}

export default UsDollars;
