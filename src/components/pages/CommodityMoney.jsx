import React, { useRef, useState, useEffect } from "react";
import FadeImage from "../customise/FadeImage";
import Navbar from "../Nabar";
import commodityLFT from "/assets/commodityLFT.webp";
import coinageLFTman from "/assets/coinageLFTman.webp";
import commodityRFT from "/assets/commodityRFT.webp";
import coinageRFTman from "/assets/coinageRFTman.webp";

export default function CommodityMoney({ goToContact }) {
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
      phrase.style.animationDelay = `${index * 0.5}s`;
    });
  }, []);

  return (
    <div className="relative min-h-screen min-w-screen max-h-screen min-w-max text-white flex flex-col select-none">
      <Navbar goToContact={goToContact} />

      <main className=" w-full absolute p-4 flex-grow  flex flex-col items-center justify-center p-4 sm:px-6 lg:px-8 text-center" style={{margin: '50px 0'}}>
        <FadeImage
          text={<div className="year pt-2">c.5,500 BCE</div>}
          direction="up"
        />

        <FadeImage
          text={
            <h1 className="head m-0 p-2">
              COMMODITY <span className="tail">Money</span>
            </h1>
          }
          direction="up"
        />
        <FadeImage
          text={
            <p className="particles m-0 p-0">
              <span className="">
                Commodity money developed when societies began using objects
                with{" "}
              </span>
              <span className="phrase">intrinsic value as </span>
              <span className="phrase">currency. Ancient civilizations </span>
              <span className="phrase">like the </span>
              <span className="phrase">Sumerians and Egyptians </span>
              <span className="phrase">used items like grain, </span>
              <span className="phrase">cattle, </span>
              <span className="phrase">honey or </span>
              <span className="phrase">animal pelts.</span>
            </p>
          }
          direction="up"
        />
      </main>

      <div
        style={{
          position: "relative",
          height: "100vh",
          width: "100vw",
          zIndex: 1,
        }}
      >
        <div
          className="combeam"
          style={{
            position: "absolute",
            height: `${height}%`,
            width: "auto",
            left: -50,
            display: "flex",
            float: "left",
            bottom: 0,
            opacity: 1,
          }}
        >
          <FadeImage
            src={commodityLFT}
            className="img-fluid "
            alt="leftarc"
            direction="right"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div
          className="comleft"
          style={{
            position: "absolute",
            width: "41vw",
            height: "auto",
            left: -60,
            bottom: 0,
          }}
        >
          <FadeImage
            src='/assets/commoditylftman.webp'
            className="img-fluid"
            alt="leftman"
            direction="right"
            style={{ width: "100%", objectFit: "contain" }}
          />
        </div>

        <div
          className="combeam"
          style={{
            zIndex: 1,
            position: "absolute",
            height: `${height}%`,
            width: "auto",
            right: -35,
            bottom: 0,
            opacity: 1,
          }}
        >
          <FadeImage
            src={commodityRFT}
            className="img-fluid"
            alt="rightarc"
            direction="left"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>

        <div
          className="comright"
          ref={boxRef}
          style={{
            zIndex: 2,
            position: "absolute",
            bottom: 0,
            width: "36vw",
            height: "auto",
            right: 0,
          }}
        >
          <FadeImage
            src='/assets/commodityRftMan.webp'
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
