"use client";
import { useRef } from "react";

import Card from "./components/cards/Card";
import Header from "./components/ui/Header";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef(null);

  const firstBlockRefs = useRef([]);
  const secondBlockRefs = useRef([]);

  useGSAP(() => {
    const cards = firstBlockRefs.current;
    const totalScrollHeight = window.innerHeight * 3;
    const positions = [14, 38, 62, 86];
    const rotations = [-15, -7.5, 7.5, 15];

    ScrollTrigger.create({
      trigger: container.current.querySelector(".cards-first"),
      start: "top top",
      end: () => `+=${totalScrollHeight}`,
      pin: true,
      pinSpacing: true,
    });

    cards.forEach((card, index) => {
      gsap.to(card, {
        left: `${positions[index]}%`,
        rotation: `${rotations[index]}`,
        ease: "none",
        scrollTrigger: {
          trigger: container.current.querySelector(".cards-first"),
          start: "top top",
          end: () => `+=${window.innerHeight}`,
          scrub: 0.5,
          id: `spread-first-${index}`,
        },
      });
    });

    cards.forEach((card, index) => {
      const frontEl = card.querySelector(".flip-card-front");
      const backEl = card.querySelector(".flip-card-back");

      const staggerOffset = index * 0.05;
      const startOffset = 1 / 3 + staggerOffset;
      const endOffset = 2 / 3 + staggerOffset;

      ScrollTrigger.create({
        trigger: container.current.querySelector(".cards-first"),
        start: "top top",
        end: () => `+=${totalScrollHeight}`,
        scrub: 1,
        id: `rotate-flip-first-${index}`,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress >= startOffset && progress <= endOffset) {
            const animationProgress = (progress - startOffset) / (1 / 3);
            const frontRotation = -180 * animationProgress;
            const backRotation = 180 - 180 * animationProgress;
            const cardRotation = rotations[index] * (1 - animationProgress);

            gsap.to(frontEl, { rotateY: frontRotation, ease: "power1.out" });
            gsap.to(backEl, { rotateY: backRotation, ease: "power1.out" });
            gsap.to(card, {
              xPercent: -50,
              yPercent: -50,
              rotate: cardRotation,
              ease: "power1.out",
            });
          }
        },
      });
    });
  }, { scope: container });

  useGSAP(() => {
    const cards = secondBlockRefs.current;
    const totalScrollHeight = window.innerHeight * 3;
    const positions = [14, 38, 62, 86];
    const rotations = [-15, -7.5, 7.5, 15];

    ScrollTrigger.create({
      trigger: container.current.querySelector(".cards-second"),
      start: "top top",
      end: () => `+=${totalScrollHeight}`,
      pin: true,
      pinSpacing: true,
    });

    cards.forEach((card, index) => {
      gsap.to(card, {
        left: `${positions[index]}%`,
        rotation: `${rotations[index]}`,
        ease: "none",
        scrollTrigger: {
          trigger: container.current.querySelector(".cards-second"),
          start: "top top",
          end: () => `+=${window.innerHeight}`,
          scrub: 0.5,
          id: `spread-second-${index}`,
        },
      });
    });

    cards.forEach((card, index) => {
      const frontEl = card.querySelector(".flip-card-front");
      const backEl = card.querySelector(".flip-card-back");

      const staggerOffset = index * 0.05;
      const startOffset = 1 / 3 + staggerOffset;
      const endOffset = 2 / 3 + staggerOffset;

      ScrollTrigger.create({
        trigger: container.current.querySelector(".cards-second"),
        start: "top top",
        end: () => `+=${totalScrollHeight}`,
        scrub: 1,
        id: `rotate-flip-second-${index}`,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress >= startOffset && progress <= endOffset) {
            const animationProgress = (progress - startOffset) / (1 / 3);
            const frontRotation = -180 * animationProgress;
            const backRotation = 180 - 180 * animationProgress;
            const cardRotation = rotations[index] * (1 - animationProgress);

            gsap.to(frontEl, { rotateY: frontRotation, ease: "power1.out" });
            gsap.to(backEl, { rotateY: backRotation, ease: "power1.out" });
            gsap.to(card, {
              xPercent: -50,
              yPercent: -50,
              rotate: cardRotation,
              ease: "power1.out",
            });
          }
        },
      });
    });
  }, { scope: container });

  return (
    <>
      <div className="container" ref={container}>
        <section className="hero">
          <h1>Здесь что-то будет</h1>
        </section>

        {/* ПЕРВЫЙ БЛОК КАРТОЧЕК */}
        <section className="cards-first">
          {[...Array(4)].map((_, index) => (
            <Card
              key={`first-${index}`}
              id={`first-card-${index + 1}`}
              frontSrc={`/card-front-pr-${index + 1}.png`}
              frontAlt="Front Card Image"
              backAlt="Back Card Image"
              backSrc={`/card-back-pr-${index + 1}.png`}
              ref={(el) => {
                if (el) firstBlockRefs.current[index] = el;
              }}
            />
          ))}
        </section>

        <section className="sec3">
          <h1>Здесь тоже что-то потом будет</h1>
        </section>

        {/* ВТОРОЙ БЛОК КАРТОЧЕК */}
        <section className="cards-second">
          {[...Array(4)].map((_, index) => (
            <Card
              key={`second-${index}`}
              id={`second-card-${index + 1}`}
              frontSrc={`/card-front-br-${index + 1}.png`}
              frontAlt="Front Card Image"
              backAlt="Back Card Image"
              backSrc={`/card-back-br-${index + 1}.png`}
              ref={(el) => {
                if (el) secondBlockRefs.current[index] = el;
              }}
            />
          ))}
        </section>

        <section className="footer-last">
          <h1>Конец</h1>
        </section>
      </div>
    </>
  );
}