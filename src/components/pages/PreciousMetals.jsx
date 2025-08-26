import React, { useRef, useState, useEffect } from "react";
import FadeImage from "../customise/FadeImage";
import Navbar from "../Nabar";
// Importing images
import preciousLFT from "/assets/preciousLFT.webp";
import preciousLFTman from "/assets/preciousLFTman.webp";
import preciousRFT from "/assets/preciousRFT.webp";
import preciousRFTman from "/assets/preciousRFTman.webp";

function PreciousMetals({ goToContact }) {
  const boxRef = useRef(null);
  const [height, setHeight] = useState(10);

  useEffect(() => {
    const updateHeight = () => {
      const width = boxRef.current.offsetWidth;
      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      if (isMobile) {
        setHeight(width * 0.16);
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
      phrase.style.animationDelay = `${index * 0.5}s`;
    });
  }, []);

  return (
    <div className="relative min-h-screen min-w-screen max-h-screen min-w-max  text-white flex flex-col select-none">
      <Navbar goToContact={goToContact} />

      <main className=" p-4 absolute w-full flex-grow flex flex-col items-center justify-center p-4 sm:px-6 lg:px-8 text-center" style={{margin: '50px 0'}}>
        <FadeImage
          text={<div className="year pt-2">c.3,000 BCE</div>}
          direction="up"
        />

        <FadeImage
          text={
            <h1 className="head m-0 p-2 ">
              PRECIOUS <span className="tail">Metals</span>
            </h1>
          }
          direction="up"
        />
        <FadeImage
          text={
            <p className="particles m-0 p-0">
              <span className="">
                The evolution of trade necessitated a more versatile and{" "}
              </span>

              <span className="">universally accepted </span>
              <span className="phrase">form of payment. </span>
              <span className="phrase">This led to the </span>
              <span className="phrase">emergence of </span>
              <span className="phrase">currency, </span>
              <span className="phrase">initially in the </span>
              <span className="phrase">form of small, </span>
              <span className="phrase">shiny objects - bronze, </span>
              <span className="phrase">silver,</span>
              <span className="phrase"> and gold.</span>
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
          className="prebeam"
          style={{
            position: "absolute",
            height: `${height}%`,
            width: "auto",
            left: -70,
            display: "flex",
            float: "left",
            bottom: 0,
          }}
        >
          <FadeImage
            src={preciousLFT}
            className="img-fluid"
            alt="leftarc"
            direction="right"
            style={{ height: "100%", width: "100%", objectFit: "contain" }}
          />
        </div>

        <div
          className="preman"
          style={{
            position: "absolute",
            width: "41.3vw",
            height: "auto",
            bottom: 0,
            left: -23,
            opacity: 1,
          }}
        >
          <FadeImage
            src={preciousLFTman}
            className="img-fluid"
            alt="leftman"
            direction="right"
            style={{ objectFit: "contain" }}
          />
        </div>

        <div
          className="prebeam"
          style={{
            zIndex: 1,
            position: "absolute",
            height: `${height}%`,
            width: "auto",
            right: -75,
            bottom: 0,
          }}
        >
          <FadeImage
            src={preciousRFT}
            className="img-fluid"
            alt="rightarc"
            direction="left"
            style={{ width: "auto", height: "100%", objectFit: "contain" }}
          />
        </div>
        <div
          className="prerman"
          ref={boxRef}
          style={{
            zIndex: 1,
            position: "absolute",
            width: "38vw",
            right: -20,
            bottom: 0,
          }}
        >
          <FadeImage
            src={preciousRFTman}
            className="img-fluid"
            alt="rightman"
            direction="left"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
}

export default PreciousMetals;
