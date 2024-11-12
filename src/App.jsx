import "./App.css";
import React, { useEffect, useState } from "react";
import Home from "./components/pages/Home";
import BarterSystem from "./components/pages/BarterSystem";
import CommodityMoney from "./components/pages/CommodityMoney";
import PreciousMetals from "./components/pages/PreciousMetals";
import PaperMoney from "./components/pages/PaperMoney";
import Coinage from "./components/pages/Coinage";
import GoldStandard from "./components/pages/GoldStandard";
import UsDollars from "./components/pages/UsDollars";
import Bitcoin from "./components/pages/Bitcoin";
import ContactUs from "./components/pages/ContactUs";
import Preloader from "./components/customise/Preloader";

// Importing background image
import bgMotion from "/public/assets/bg motion.webp";
import smoke from "/public/assets/smoke effect.gif";

function App() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // New loading state
  const [currentSection, setCurrentSection] = useState(0);
  const [startTouchY, setStartTouchY] = useState(null);

  const sections = [
    <Home
      goToSection={() => setCurrentSection(1)}
      goToContact={() => setCurrentSection(sections.length - 1)}
    />,
    <BarterSystem goToContact={() => setCurrentSection(sections.length - 1)} />,
    <CommodityMoney
      goToContact={() => setCurrentSection(sections.length - 1)}
    />,
    <PreciousMetals
      goToContact={() => setCurrentSection(sections.length - 1)}
    />,
    <Coinage goToContact={() => setCurrentSection(sections.length - 1)} />,
    <PaperMoney goToContact={() => setCurrentSection(sections.length - 1)} />,
    <GoldStandard goToContact={() => setCurrentSection(sections.length - 1)} />,
    <UsDollars goToContact={() => setCurrentSection(sections.length - 1)} />,
    <Bitcoin goToContact={() => setCurrentSection(sections.length - 1)} />,
    <ContactUs goToContact={() => setCurrentSection(sections.length - 1)} />,
  ];

  // Preload all images and sections
  useEffect(() => {
    const loadImages = () => {
      const images = [bgMotion, smoke];
      const promises = images.map((image) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = image;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      Promise.all(promises).then(() => {
        setIsLoaded(true);
      });
    };

    loadImages();
  }, []);

  useEffect(() => {
    const handleScroll = (e) => {
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSection = Math.min(
        Math.max(currentSection + direction, 0),
        sections.length - 1
      );

      if (nextSection !== currentSection && !isTransitioning) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentSection(nextSection);
          setIsTransitioning(false);
        }, 1000);
      }
    };

    const handleTouchStart = (e) => {
      setStartTouchY(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
      if (startTouchY === null) return;

      const currentTouchY = e.touches[0].clientY;
      const direction = startTouchY > currentTouchY ? 1 : -1;
      const nextSection = Math.min(
        Math.max(currentSection + direction, 0),
        sections.length - 1
      );

      if (nextSection !== currentSection && !isTransitioning) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentSection(nextSection);
          setIsTransitioning(false);
        }, 1000);
      }

      setStartTouchY(null);
    };

    window.addEventListener("wheel", handleScroll);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [currentSection, sections.length, isTransitioning, startTouchY]);

  return (
    <>
      {!isLoaded && <Preloader />}{" "}
      {/* Show Preloader until images are loaded */}
      {isLoaded && (
        <>
          <div
            style={{
              overflow: "hidden",
              position: "fixed",
              width: "100vw",
              height: "100dvh",
            }}
          >
            <img
              src={bgMotion}
              alt="smoke background"
              className="bg-cover w-full h-full object-cover"
            />
            <img className="smoke-layer" src={smoke} alt="smoke background" />
          </div>

          <div
            className={`relative inset-0 bg-black transition-opacity duration-1000 ${
              isTransitioning ? "opacity-100" : "opacity-0"
            }`}
          ></div>

          <div
            className="relative h-full w-full items-center justify-center"
            style={{
              position: "fixed",
            }}
          >
            {sections[currentSection]}
          </div>
        </>
      )}
    </>
  );
}

export default App;
