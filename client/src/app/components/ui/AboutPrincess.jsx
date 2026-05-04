"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPrincess({ onAnimationComplete }) {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const questionRef = useRef(null);
  const leftPetalRef = useRef(null);
  const rightPetalRef = useRef(null);

  useGSAP(() => {
    const petalsTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
      },
    });

    petalsTl.fromTo(leftPetalRef.current,
      { x: "-100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 1, ease: "power2.out" }
    );

    petalsTl.fromTo(rightPetalRef.current,
      { x: "100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 1, ease: "power2.out" },
      "<"
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%",
        scrub: true,
        pin: true,
        onLeave: () => {
          if (onAnimationComplete) onAnimationComplete();
        },
      },
    });

    tl.to(cardRef.current, {
      scale: 12,
      ease: "power2.inOut",
      onUpdate: function () {
        const currentScale = gsap.getProperty(cardRef.current, "scale");
        gsap.set(questionRef.current, {
          scale: 1 / currentScale,
        });
      },
    });

    tl.to(
      cardRef.current.querySelector(".about-pr-card-inner"),
      {
        borderRadius: 0,
        ease: "none",
      },
      "<"
    );

    tl.to(questionRef.current, {
      opacity: 0,
      duration: 0.2,
    });

    tl.to(leftPetalRef.current, {
      opacity: 0,
      duration: 0.5,
    }, ">-0.5");

    tl.to(rightPetalRef.current, {
      opacity: 0,
      duration: 0.5,
    }, "<");

  }, { scope: sectionRef });

  return (
    <section className="about-pr" ref={sectionRef}>
      <div className="about-pr-bg">
        <Image
          src="/images/backgrounds/bg-about-pr2.jpg"
          alt="Background"
          fill
          priority
          className="about-pr-bg-image"
        />
        <div className="about-overlay"></div>
      </div>

      <div ref={leftPetalRef} className="about-petal-left">
        <Image
          src="/images/decoration/petal-left.png"
          alt="petal-left"
          width={220}
          height={720}
          className="petal-image"
        />
      </div>

      <div ref={rightPetalRef} className="about-petal-right">
        <Image
          src="/images/decoration/petal-right1.png"
          alt="petal-right"
          width={288}
          height={703}
          className="petal-image"
        />
      </div>

      <div className="about-pr-content">
        <div className="about-pr-header">
          <div className="about-pr-up">
            <h2 className="about-pr-title-up">My</h2>
            <div className="about-pr-icon-wrapper">
              <Image
                src="/images/decoration/star.png"
                alt="star"
                width={120}
                height={120}
                className="about-pr-icon"
              />
            </div>
          </div>
          <h2 className="about-pr-title-down">Princess</h2>
        </div>

        <div className="about-pr-card" ref={cardRef}>
          <div className="about-pr-card-inner">
            <span className="about-pr-card-question" ref={questionRef}>
              ?
            </span>
          </div>
        </div>

        <div className="about-pr-footer">
          <p className="about-pr-subtitle">
            My Princess - коллекция из десяти уникальных карточек и одной секретной. Самые красивые, самые любимые, на которых полинка настоящая принцесса!!!
          </p>
        </div>
      </div>
    </section>
  );
}