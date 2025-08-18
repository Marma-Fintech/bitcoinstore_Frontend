import React, { useRef, useState, useEffect } from "react";
import FadeImage from "../customise/FadeImage";
import Navbar from "../Nabar";
import bitcoinLeft from "/assets/bitcoinbeamLft.webp";
import bitcoinLFTman from "/assets/Group 208.webp";
import bitcoinRight from "/assets/bitcoinbeamrft.webp";
import bitcoinRHSman from "/assets/Group 209.webp";

export default function Bitcoin({ goToContact }) {
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
    <div className="relative min-h-screen min-w-screen max-h-screen min-w-max text-white flex flex-col select-none">
      <Navbar goToContact={goToContact} />

      <main className="p-4 flex-grow absolute flex flex-col items-center justify-center p-4 sm:px-6 lg:px-8 text-center w-full" style={{margin: '50px 0'}}>
        <FadeImage
          text={<div className="year pt-2 ">2009</div>}
          direction="up"
        />
        <FadeImage
          text={<h1 className="head m-0 p-2 ">BITCOIN</h1>}
          direction="up"
        />
        <FadeImage
          text={
            <p className="particles m-0 p-0" style={{ textAlign: "center" }}>
              <span className="">
                Operating on a peer-to-peer network without the{" "}
              </span>
              <span className="">need for a central </span>
              <span className="">authority or government, </span>
              <span className="phrase">bitcoin emerged in 2009. </span>
              <span className="phrase">Using blockchain </span>
              <span className="phrase">technology to securely </span>
              <span className="phrase">record transactions </span>
              <span className="phrase">and control the </span>
              <span className="phrase">creation of new units, </span>
              <span className="phrase">bitcoin is not backed </span>
              <span className="phrase">by any physical asset </span>
              <span className="phrase">or government, </span>
              <span className="phrase">and its value is </span>
              <span className="phrase">determined by supply, </span>
              <span className="phrase">demand, and </span>
              <span className="phrase">market speculation. </span>
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
          className="bitbeam"
          style={{
            position: "absolute",
            height: `${height}dvh`,
            width: "auto",
            left: -35,
            bottom: 0,
            display: "flex",
            float: "left",
            opacity: 1,
          }}
        >
          <FadeImage
            src={bitcoinLeft}
            className="img-fluid"
            alt="leftarc"
            direction="right"
            style={{ height: "100%", width: "100%", objectFit: "contain" }}
          />
        </div>
        <div
          className="bitleft"
          style={{
            position: "absolute",
            width: "36.5vw",
            left: 0,
            height: "auto",
            bottom: 0,
          }}
        >
          <FadeImage
            src={bitcoinLFTman}
            className="img-fluid"
            direction="right"
            alt="leftman"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>

        <div
          className="bitbeam"
          style={{
            zIndex: 1,
            position: "absolute",
            height: `${height}dvh`,
            width: "auto",
            right: -30,
            bottom: 0,
            opacity: 1,
          }}
        >
          <FadeImage
            src={bitcoinRight}
            className="img-fluid"
            alt="rightarc"
            direction="left"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
        <div
          className="bitright"
          ref={boxRef}
          style={{
            position: "absolute",
            width: "36vw",
            height: "auto",
            right: 0,
            bottom: 0,
            zIndex: 2,
          }}
        >
          <FadeImage
            src={bitcoinRHSman}
            className="img-fluid"
            alt="rightman"
            direction="left"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
}
