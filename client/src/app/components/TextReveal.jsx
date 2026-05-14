"use client";

import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal({
  children,
  className = "",

  type = "lines",

  duration = 1.2,
  stagger = 0.06,

  y = 110,
  blur = 8,

  start = "top 90%",

  once = false,
}) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    let split;
    let trigger;
    let animation;

    const ctx = gsap.context(() => {
      requestAnimationFrame(() => {
        split = new SplitType(containerRef.current, {
          types: type,
          lineClass: "split-line",
          wordClass: "split-word",
          charClass: "split-char",
        });

        let targets = [];

        switch (type) {
          case "chars":
            targets = split.chars;
            break;

          case "words":
            targets = split.words;
            break;

          default:
            targets = split.lines;
        }

        if (type === "lines") {
          targets.forEach((line) => {
            const wrapper = document.createElement("div");

            wrapper.classList.add("split-line-wrapper");

            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
          });
        }

        gsap.set(targets, {
          yPercent: y,
          opacity: 0,
          filter: `blur(${blur}px)`,

          force3D: true,
          willChange: "transform, opacity, filter",
        });

        animation = gsap.to(targets, {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",

          duration,
          stagger,

          ease: "power4.out",

          paused: true,

          clearProps: "willChange",
        });

        trigger = ScrollTrigger.create({
          trigger: containerRef.current,

          start,

          once,

          invalidateOnRefresh: true,

          onEnter: () => {
            gsap.to(targets, {
              yPercent: 0,
              opacity: 1,
              filter: "blur(0px)",

              duration,
              stagger,

              ease: "power4.out",
            });
          },

          onEnterBack: () => {
            if (!once) {
              gsap.to(targets, {
                yPercent: 0,
                opacity: 1,
                filter: "blur(0px)",

                duration: duration * 0.9,
                stagger,

                ease: "power3.out",
              });
            }
          },

          onLeave: () => {
            if (!once) {
              gsap.to(targets, {
                yPercent: -40,
                opacity: 0,
                filter: `blur(${blur}px)`,

                duration: duration * 0.6,
                stagger: stagger * 0.5,

                ease: "power2.in",
              });
            }
          },

          onLeaveBack: () => {
            if (!once) {
              gsap.to(targets, {
                yPercent: y,
                opacity: 0,
                filter: `blur(${blur}px)`,

                duration: duration * 0.6,
                stagger: stagger * 0.5,

                ease: "power2.in",
              });
            }
          },
        });

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });
    }, containerRef);

    return () => {
      trigger?.kill();
      animation?.kill();

      ctx.revert();

      split?.revert();
    };
  }, [type, duration, stagger, y, blur, start, once]);

  return (
    <div
      ref={containerRef}
      className={`text-reveal ${className}`}
    >
      {children}
    </div>
  );
}