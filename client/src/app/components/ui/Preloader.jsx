"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const preloaderRef = useRef(null);
  const preloaderContentRef = useRef(null);
  const resourcesLoadedRef = useRef(false);
  const minimalTimeRef = useRef(false);

  const checkComplete = () => {
    if (resourcesLoadedRef.current && minimalTimeRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsVisible(false);
          document.body.style.overflow = "";
          if (onComplete) onComplete();
        }
      });
      
      tl.to(preloaderContentRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in"
      });
      
      tl.to(preloaderRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in"
      }, "-=0.3");
    }
  };

  useEffect(() => {
    const timer1 = setTimeout(() => {
      minimalTimeRef.current = true;
      checkComplete();
    }, 1000);

    const waitForResources = async () => {
      const images = document.querySelectorAll('img');
      const imagePromises = Array.from(images).map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.addEventListener('load', resolve);
          img.addEventListener('error', resolve);
        });
      });

      const fontPromises = [];
      if (document.fonts && document.fonts.ready) {
        fontPromises.push(document.fonts.ready);
      }

      const stylePromises = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(
        (link) => {
          if (link.sheet) return Promise.resolve();
          return new Promise((resolve) => {
            link.addEventListener('load', resolve);
            link.addEventListener('error', resolve);
          });
        }
      );

      await Promise.all([...imagePromises, ...fontPromises, ...stylePromises]);
      
      setTimeout(() => {
        resourcesLoadedRef.current = true;
        checkComplete();
      }, 100);
    };

    waitForResources();

    return () => {
      clearTimeout(timer1);
    };
  }, [onComplete]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div ref={preloaderRef} className="preloader">
      <div ref={preloaderContentRef} className="preloader-content">
        <svg viewBox="0 0 200 300" className="preloader-svg">
          <g className="bouquet grow sway">
            <g className="flower">
              <path d="M100 250 C100 200, 100 170, 100 140"/>
              <path d="M100 140 C80 125, 60 110, 70 95 C85 85, 100 110, 100 140"/>
              <path d="M100 140 C120 125, 140 110, 130 95 C115 85, 100 110, 100 140"/>
              <path d="M100 140 C90 115, 95 85, 100 80 C105 85, 110 115, 100 140"/>
              <path d="M100 140 C75 130, 55 125, 60 110"/>
              <path d="M100 140 C125 130, 145 125, 140 110"/>
              <path d="M100 140 C100 125, 95 105, 100 100"/>
            </g>
            <g>
              <path d="M60 260 C55 200, 60 160, 65 140"/>
              <line x1="65" y1="190" x2="52" y2="178"/>
              <line x1="65" y1="180" x2="52" y2="168"/>
            </g>
            <g>
              <path d="M80 265 C75 205, 80 165, 85 145"/>
              <line x1="85" y1="200" x2="72" y2="188"/>
            </g>
            <g>
              <path d="M120 265 C125 205, 120 165, 115 145"/>
              <line x1="115" y1="200" x2="128" y2="188"/>
            </g>
            <g>
              <path d="M140 260 C145 200, 140 160, 135 140"/>
              <line x1="135" y1="190" x2="148" y2="178"/>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}