import React, { useRef, useState, useEffect } from "react";
import Navbar from "../Nabar";
import "../Stylepages/BarterSystem.css";
import "../Stylepages/common.css";
import FadeImage from "../customise/FadeImage";
import BPLEFT from "/assets/BPLEFT.webp";
import BARTERLEFT from "/assets/BARTERLEFT.webp";
import BPRFT from "/assets/BPRFT.webp";
import BARTERRFT from "/assets/BARTERRFT.webp";

export default function BarterSystem({ goToContact }) {
  const boxRef = useRef(null);
  const [height, setHeight] = useState(10);
  // fucntion to contact Us

  useEffect(() => {
    const updateHeight = () => {
      const width = boxRef.current.offsetWidth;
      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      if (isMobile) {
        setHeight(width * 0.16);
      } else {
        setHeight(width * 0.15);
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
    <div className="relative min-h-screen min-w-screen max-h-screen min-w-max m-0 p-0 text-white flex flex-col">
      <Navbar goToContact={goToContact} />
      <main className="absolute flex-grow flex flex-col items-center justify-center p-4 sm:px-6 lg:px-8 text-center w-full" style={{margin: '50px 0'}}>
        <FadeImage
          text={<div className="year pt-2">c.9,000 BCE</div>}
          direction="up"
        />
        <FadeImage
          text={
            <h1 className="head m-0 p-2">
              BARTER <span className="tail">system</span>
            </h1>
          }
          direction="up"
        />
        <FadeImage
          text={
            <p className="particles m-0 p-0" style={{ textAlign: "center" }}>
              <span>The earliest form of trade,</span>
              <span> ancient Mesopotamians </span>
              <span>and Egyptians </span>
              <span className="phrase">exchanged goods </span>
              <span className="phrase">and services directly, </span>
              <span className="phrase">such as trading </span>
              <span className="phrase">livestock </span>
              <span className="phrase">for grains or </span>
              <span className="phrase">labor for tools.</span>
            </p>
          }
          direction="up"
        />
      </main>

      <div style={{ position: "absolute", height: "100vh", width: "100%" }}>
        <div
          className="barbeam"
          style={{
            position: "absolute",
            height: `${height}%`,
            width: "auto",
            left: 0,
            display: "flex",
            float: "left",
            bottom: 0,
            opacity: 1,
          }}
        >
          <FadeImage
            src={BPLEFT}
            className="img-fluid"
            alt="leftarc"
            direction="right"
            style={{ height: "100%", width: "100%", objectFit: "contain" }}
          />
        </div>
        <div
          className="barleft"
          style={{
            position: "absolute",
            width: "43vw",
            height: "auto",
            bottom: 0,
          }}
        >
          <FadeImage
            src={BARTERLEFT}
            className="img-fluid"
            direction="right"
            alt="leftarc"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>

        <div
          className="barbeam"
          style={{
            zIndex: 2,
            position: "absolute",
            height: `${height}%`,
            width: "auto",
            right: 0,
            bottom: 0,
            opacity: 1,
          }}
        >
          <FadeImage
            src={BPRFT}
            className="img-fluid"
            alt="rightarc"
            direction="left"
            style={{ height: "100%", width: "100%", objectFit: "contain" }}
          />
        </div>

        <div
          className="barright"
          ref={boxRef}
          style={{
            position: "absolute",
            width: "42vw",
            height: "auto",
            right: -20,
            bottom: 0,
            zIndex: 2,
          }}
        >
          <FadeImage
            src={BARTERRFT}
            className="img-fluid"
            alt="rightarc"
            direction="left"
            style={{ height: "100%", width: "100%", objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
}
