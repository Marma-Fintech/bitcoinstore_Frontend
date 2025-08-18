import "./App.css";
import React, { useEffect, useState, useRef } from "react";
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
import bgMotion from "/assets/bg motion.webp";

function App() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const scrollCooldownRef = useRef(false);
  const scrollAccumulatorRef = useRef(0);
  const animationRef = useRef(null);
  const lastScrollTimeRef = useRef(Date.now());
  const [isMouseWheel, setIsMouseWheel] = useState(false);

  // Function to navigate to contact page
  const goToContact = () => {
    setCurrentSection(sections.length - 1); // Go to last section (ContactUs)
  };

  const sections = [
    <Home goToContact={goToContact} />,
    <BarterSystem goToContact={goToContact} />,
    <CommodityMoney goToContact={goToContact} />,
    <PreciousMetals goToContact={goToContact} />,
    <Coinage goToContact={goToContact} />,
    <PaperMoney goToContact={goToContact} />,
    <GoldStandard goToContact={goToContact} />,
    <UsDollars goToContact={goToContact} />,
    <Bitcoin goToContact={goToContact} />,
    <ContactUs goToContact={goToContact} />,
  ];

  // Auto-detect mouse wheel vs touchpad
  useEffect(() => {
    let recentEvents = [];
    let detectionTimeout = null;

    const detectInputDevice = (e) => {
      recentEvents.push({
        deltaY: e.deltaY,
        deltaMode: e.deltaMode,
        time: Date.now(),
      });

      if (recentEvents.length > 5) {
        recentEvents.shift();
      }

      if (detectionTimeout) {
        clearTimeout(detectionTimeout);
      }

      detectionTimeout = setTimeout(() => {
        const largeDeltas = recentEvents.filter(
          (evt) => Math.abs(evt.deltaY) >= 100
        ).length;
        const lineModeEvents = recentEvents.filter(
          (evt) => evt.deltaMode === 1
        ).length;

        if (largeDeltas >= 1 || lineModeEvents >= 1) {
          if (!isMouseWheel) {
            setIsMouseWheel(true);
            console.log("Auto-detected: Mouse Wheel");
          }
        } else {
          const smallDeltas = recentEvents.filter(
            (evt) => Math.abs(evt.deltaY) < 10
          ).length;
          if (smallDeltas >= 3 && recentEvents.length >= 4) {
            if (isMouseWheel) {
              setIsMouseWheel(false);
              console.log("Auto-detected: Touchpad");
            }
          }
        }
      }, 300);
    };

    window.addEventListener("wheel", detectInputDevice, { passive: true });

    return () => {
      window.removeEventListener("wheel", detectInputDevice);
      if (detectionTimeout) {
        clearTimeout(detectionTimeout);
      }
    };
  }, [isMouseWheel]);

  // Handle wheel events with improved sensitivity
  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();

      if (scrollCooldownRef.current) return;

      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTimeRef.current;

      // Improved cooldown timing - longer for touchpad to prevent double scrolling
      const minScrollDelay = isMouseWheel ? 50 : 150;
      if (timeSinceLastScroll < minScrollDelay) {
        return;
      }

      // Better sensitivity thresholds
      const minDelta = isMouseWheel ? 1 : 3;
      if (Math.abs(e.deltaY) < minDelta) return;

      // Improved accumulator logic for touchpad
      if (timeSinceLastScroll > 300) {
        scrollAccumulatorRef.current = 0;
      }

      scrollAccumulatorRef.current += Math.abs(e.deltaY);
      lastScrollTimeRef.current = now;

      // Higher threshold for touchpad to prevent accidental scrolling
      const scrollThreshold = isMouseWheel ? 5 : 20;
      if (scrollAccumulatorRef.current < scrollThreshold) return;

      scrollAccumulatorRef.current = 0;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSection = Math.min(
        Math.max(currentSection + direction, 0),
        sections.length - 1
      );

      if (nextSection !== currentSection) {
        setIsTransitioning(true);
        scrollCooldownRef.current = true;

        let startTime = null;
        const animationDuration = 200; // Consistent timing for all devices

        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }

        const animate = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / animationDuration, 1);

          setTransitionProgress(progress);

          if (progress < 1) {
            animationRef.current = requestAnimationFrame(animate);
          } else {
            setCurrentSection(nextSection);
            setIsTransitioning(false);
            setTransitionProgress(0);

            // Longer cooldown for touchpad to prevent double scrolling
            const cooldownTime = isMouseWheel ? 300 : 800;
            setTimeout(() => {
              scrollCooldownRef.current = false;
            }, cooldownTime);
          }
        };

        animationRef.current = requestAnimationFrame(animate);
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("mousewheel", handleScroll, { passive: false });

    console.log(`Scroll mode: ${isMouseWheel ? "Mouse Wheel" : "Touchpad"}`);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("mousewheel", handleScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentSection, sections.length, isMouseWheel]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (scrollCooldownRef.current) return;

      let direction = 0;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        direction = 1;
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        direction = -1;
      } else {
        return;
      }

      const nextSection = Math.min(
        Math.max(currentSection + direction, 0),
        sections.length - 1
      );

      if (nextSection !== currentSection) {
        setIsTransitioning(true);
        scrollCooldownRef.current = true;

        setTimeout(() => {
          setCurrentSection(nextSection);
          setIsTransitioning(false);

          setTimeout(() => {
            scrollCooldownRef.current = false;
          }, 300);
        }, 200);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSection, sections.length]);

  // Separate mobile touch scrolling - doesn't interfere with wheel events
  useEffect(() => {
    let touchStartY = 0;
    let touchStartTime = 0;
    let isScrolling = false;
    
    const handleMobileTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
      isScrolling = false;
    };

    const handleMobileTouchMove = (e) => {
      // Always prevent default to avoid pull-to-refresh
      e.preventDefault();
      
      if (scrollCooldownRef.current || isTransitioning) return;
      
      const currentY = e.touches[0].clientY;
      const deltaY = Math.abs(touchStartY - currentY);
      
      // Mark as scrolling if significant vertical movement
      if (deltaY > 5) {
        isScrolling = true;
      }
    };

    const handleMobileTouchEnd = (e) => {
      if (scrollCooldownRef.current || isTransitioning || !isScrolling) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const swipeDistance = touchStartY - touchEndY;
      const touchDuration = Date.now() - touchStartTime;
      
      // Only trigger if swipe is significant and quick
      if (Math.abs(swipeDistance) > 40 && touchDuration < 600) {
        const direction = swipeDistance > 0 ? 1 : -1;
        const nextSection = Math.min(
          Math.max(currentSection + direction, 0),
          sections.length - 1
        );

        if (nextSection !== currentSection) {
          setIsTransitioning(true);
          scrollCooldownRef.current = true;

          setTimeout(() => {
            setCurrentSection(nextSection);
            setIsTransitioning(false);
            
            setTimeout(() => {
              scrollCooldownRef.current = false;
            }, 300);
          }, 200);
        }
      }
      
      // Reset touch state
      touchStartY = 0;
      touchStartTime = 0;
      isScrolling = false;
    };

    // Add mobile touch events separately with proper passive settings
    window.addEventListener("touchstart", handleMobileTouchStart, { passive: true });
    window.addEventListener("touchmove", handleMobileTouchMove, { passive: false });
    window.addEventListener("touchend", handleMobileTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleMobileTouchStart);
      window.removeEventListener("touchmove", handleMobileTouchMove);
      window.removeEventListener("touchend", handleMobileTouchEnd);
    };
  }, [currentSection, sections.length, isTransitioning]);

  // Handle goToHome event from ContactUs component
  useEffect(() => {
    const handleGoToHome = () => {
      setCurrentSection(0); // Go to home page (first section)
    };

    window.addEventListener('goToHome', handleGoToHome);

    return () => {
      window.removeEventListener('goToHome', handleGoToHome);
    };
  }, []);

  // Handle preloader completion
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Calculate transition style based on progress
  const getTransitionStyle = () => {
    if (!isTransitioning) return { opacity: 0 };

    return { opacity: Math.sin(transitionProgress * Math.PI) };
  };

  return (
    <>
      {isLoading ? (
        <Preloader onLoadingComplete={handleLoadingComplete} />
      ) : (
        <>
          <div
            style={{
              overflow: "hidden",
              position: "fixed",
              width: "100vw",
              height: "100vh",
              touchAction: "none", // Prevent all touch gestures including pull-to-refresh
              overscrollBehavior: "none", // Prevent bounce effects
              WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
            }}
          >
            <img
              src={bgMotion}
              alt="background"
              className="bg-cover w-full h-full object-cover"
            />
          </div>

          <div
            className="fixed inset-0 bg-black transition-opacity duration-100"
            style={getTransitionStyle()}
          ></div>

          <div
            className="relative h-screen w-full items-center justify-center"
            style={{
              position: "fixed",
              touchAction: "none", // Prevent all touch gestures
              overscrollBehavior: "none", // Prevent bounce effects
            }}
          >
            {sections[currentSection]}
          </div>

          {/* Scroll indicator */}
          <div className="fixed right-5 top-1/2 transform -translate-y-1/2 z-50 opacity-70 hidden sm:block">
            <div className="h-48 w-1 bg-gray-600 bg-opacity-30 rounded-full relative">
              <div
                className="w-2 h-2 bg-white rounded-full absolute -left-0.5"
                style={{
                  top: `${(currentSection / (sections.length - 1)) * 100}%`,
                  transition: "top 0.15s ease",
                }}
              ></div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
