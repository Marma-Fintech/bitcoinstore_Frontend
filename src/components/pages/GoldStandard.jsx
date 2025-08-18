import React, { useRef, useState, useEffect } from "react";
import FadeImage from "../customise/FadeImage";
import Navbar from "../Nabar";
// Importing images
import goldLFT from "/assets/goldLFT.webp";
import goldstdLFTman from "/assets/goldstdLFTman.webp";
import goldRFT from "/assets/goldRFT.webp";
import goldstdRFTman from "/assets/goldstdRFTman.webp";

export default function GoldStandard({ goToContact }) {
  const boxRef = useRef(null);
  const [height, setHeight] = useState(10);

  useEffect(() => {
    const updateHeight = () => {
      const width = boxRef.current.offsetWidth;
      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      if (isMobile) {
        setHeight(width * 0.17);
      } else {
        setHeight(width * 0.19);
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
      phrase.style.animationDelay = `${index * 0.5}s`;
    });
  }, []);

  return (
    <div className="relative min-h-screen min-w-screen max-h-screen min-w-max  text-white flex flex-col select-none">
      <Navbar goToContact={goToContact} />
      <main className=" w-full absolute flex-grow flex flex-col items-center justify-center  p-4 sm:px-6 lg:px-8 text-center" style={{margin: '50px 0'}}>
        <FadeImage
          text={<div className="year  pt-2">c.1870 CE</div>}
          direction="up"
        />

        <FadeImage
          text={
            <h1 className="head m-0 p-2">
              GOLD <span className="tail">STANDARD</span>
            </h1>
          }
          direction="up"
        />
        <FadeImage
          text={
            <p className="particles m-0 p-0 ">
              <span className="">
                The gold standard was a monetary system where a{" "}
              </span>

              <span className="">country's currency </span>
              <span className="phrase">value was directly </span>
              <span className="phrase">linked to a specific </span>
              <span className="phrase">amount of gold. </span>
              <span className="phrase">Governments agreed </span>
              <span className="phrase">to convert currency </span>
              <span className="phrase">into gold </span>
              <span className="phrase">at a fixed rate, </span>
              <span className="phrase">ensuring that </span>
              <span className="phrase">paper money </span>
              <span className="phrase">could be </span>
              <span className="phrase">exchanged for </span>
              <span className="phrase">physical gold.</span>
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
          className="goldbeam"
          style={{
            position: "absolute",
            height: `${height}%`,
            width: "auto",
            left: 0,
            display: "flex",
            float: "left",
            bottom: 0,
          }}
        >
          <FadeImage
            src={goldLFT}
            className="img-fluid"
            alt="leftarc"
            direction="right"
            style={{ height: "100%", width: "100%", objectFit: "contain" }}
          />
        </div>

        <div
          className="goldman"
          style={{
            position: "absolute",
            bottom: 0,
            left: -30,
            width: "38.9%",
          }}
        >
          <FadeImage
            src={goldstdLFTman}
            className="img-fluid"
            alt="leftman"
            direction="right"
            style={{ width: "100%", objectFit: "contain" }}
          />
        </div>

        <div
          className="goldbeam"
          style={{
            zIndex: 1,
            position: "absolute",
            height: `${height}%`,
            width: "auto",
            right: 0,
            bottom: 0,
          }}
        >
          <FadeImage
            src={goldRFT}
            className="img-fluid"
            alt="rightarc"
            direction="left"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
        <div
          className="goldrman"
          ref={boxRef}
          style={{
            zIndex: 2,
            position: "absolute",
            bottom: 0,
            width: "36vw",
            right: 0,
          }}
        >
          <FadeImage
            src={goldstdRFTman}
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
