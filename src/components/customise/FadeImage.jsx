import React, { useRef, useEffect, Component } from "react";
import "../customise/customcursor.css";

const FadeImage = ({ src, text, component, alt, direction = "right" }) => {
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.2 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <>
      {src ? (
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className={`fade-${direction}`}
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <p
          ref={imageRef}
          className={`fade-${direction}`}
          style={{
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            color: "white",
          }}
        >
          {text}
        </p>
      )}
      {component && (
        <div ref={imageRef} className={`fade-${direction}`}>
          {component}
        </div>
      )}
    </>
  );
};

export default FadeImage;
