import React, { useState, useEffect } from "react";
import load from "/assets/Frame 29.gif";

const Preloader = ({ onLoadingComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // List of all assets to preload
  const assetsToLoad = [
    // Background images
    "/assets/bg motion.webp",
    "/assets/barterbg.webp",
    "/assets/bghome1left.webp",
    "/assets/bitcoinbeamLft.webp",
    "/assets/bitcoinbeamrft.webp",
    "/assets/bitcoinlhsman.webp",
    "/assets/bitcoinRHSman.webp",
    "/assets/bitcoinrhsman1.webp",
    "/assets/contactdown.webp",
    "/assets/homedown.webp",
    "/assets/homegroup.webp",
    "/assets/leftarchome.webp",
    "/assets/rightarchome.webp",
    
    // Barter system assets
    "/assets/BARTERLEFT.webp",
    "/assets/BARTERRFT.webp",
    "/assets/BPLEFT.webp",
    "/assets/BPRFT.webp",
    
    // Coinage assets
    "/assets/coinageLFT.webp",
    "/assets/coinageLFTman.webp",
    "/assets/coinageRFT.webp",
    "/assets/coinageRFTman.webp",
    
    // Commodity assets
    "/assets/commodityLFT.webp",
    "/assets/commoditylftman.webp",
    "/assets/commodityRFT.webp",
    "/assets/commodityRftMan.webp",
    
    // Gold standard assets
    "/assets/goldLFT.webp",
    "/assets/goldRFT.webp",
    "/assets/goldstdLFTman.webp",
    "/assets/goldstdRFTman.webp",
    
    // Paper money assets
    "/assets/papermoneyLFT.webp",
    "/assets/papermoneyLFTman.webp",
    "/assets/papermoneyRFT.webp",
    "/assets/papermoneyRFTman.webp",
    
    // Precious metals assets
    "/assets/preciousLFT.webp",
    "/assets/preciousLFTman.webp",
    "/assets/preciousRFT.webp",
    "/assets/preciousRFTman.webp",
    
    // USD assets
    "/assets/usdollarsLFT.webp",
    "/assets/usdollarsLFTman.webp",
    "/assets/usdollarsRFT.webp",
    "/assets/usdollarsRFTman.webp",
    
    // Other assets
    "/assets/bg buttonscroll.png",
    "/assets/Group 208.webp",
    "/assets/Group 209.webp",
    "/assets/smoke effect.gif",
    "/assets/Frame 29.gif",
    "/assets/Frame 29.svg",
    "/assets/Frame 30.svg",
    "/assets/cursor.png",
    "/assets/cursorsvg.svg",
  ];

  useEffect(() => {
    let loadedCount = 0;
    const totalAssets = assetsToLoad.length;

    const loadAsset = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          const progress = (loadedCount / totalAssets) * 100;
          setLoadingProgress(progress);
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          const progress = (loadedCount / totalAssets) * 100;
          setLoadingProgress(progress);
          resolve(); // Continue loading even if some assets fail
        };
        img.src = src;
      });
    };

    const loadAllAssets = async () => {
      try {
        // Load all assets in parallel
        await Promise.all(assetsToLoad.map(loadAsset));
        
        // Add a small delay to show the completion
        setTimeout(() => {
          setIsLoading(false);
          onLoadingComplete();
        }, 500);
      } catch (error) {
        console.error("Error loading assets:", error);
        setIsLoading(false);
        onLoadingComplete();
      }
    };

    loadAllAssets();
  }, [onLoadingComplete]);

  if (!isLoading) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        zIndex: 9999,
      }}
    >
      <img
        src={load}
        alt="Loading..."
        style={{ 
          width: "150px", 
          height: "150px"
        }} 
      />
    </div>
  );
};

export default Preloader;
