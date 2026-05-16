"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import TextReveal from "../TextReveal";

gsap.registerPlugin(ScrollTrigger);

export default function AboutBread() {
  const sectionRef = useRef(null);
  const leftSpikeRef = useRef(null);
  const rightSpikeRef = useRef(null);
  const leftAssetRef = useRef(null);
  const rightAssetRef = useRef(null);
  const badgeTextRef = useRef(null);
  const cardsRef = useRef([]);
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;

      gsap.fromTo(leftSpikeRef.current,
        { x: "-120%", y: "100%", opacity: 0 },
        {
          x: "0%",
          y: "0%",
          opacity: 1,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          }
        }
      );

      gsap.fromTo(rightSpikeRef.current,
        { x: "120%", y: "100%", opacity: 0 },
        {
          x: "0%",
          y: "0%",
          opacity: 1,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          }
        }
      );

      gsap.fromTo(leftAssetRef.current,
        { x: "-80%", opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play reverse play reverse",
          }
        }
      );

      gsap.fromTo(rightAssetRef.current,
        { x: "80%", opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play reverse play reverse",
          }
        }
      );

      if (badgeTextRef.current) {
        const el = badgeTextRef.current;

        gsap.set(el, {
          attr: { startOffset: "-40%" },
          opacity: 0,
        });

        ScrollTrigger.create({
          trigger: section,
          start: "top 75%",
          end: "bottom 25%",

          onEnter: () => {
            gsap.to(el, {
              attr: { startOffset: "50%" },
              opacity: 1,
              duration: 1.8,
              ease: "power3.out",
            });
          },

          onLeave: () => {
            gsap.to(el, {
              attr: { startOffset: "140%" },
              opacity: 0,
              duration: 1.4,
              ease: "power3.in",
            });
          },

          onEnterBack: () => {
            gsap.to(el, {
              attr: { startOffset: "50%" },
              opacity: 1,
              duration: 1.6,
              ease: "power3.out",
            });
          },

          onLeaveBack: () => {
            gsap.to(el, {
              attr: { startOffset: "-40%" },
              opacity: 0,
              duration: 1.2,
              ease: "power3.in",
            });
          },
        });
      }

      gsap.fromTo(buttonRef.current,
        {
          opacity: 0,
          y: 20,
          scale: 0.98,
          filter: "blur(4px)"
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",

          duration: 0.8,
          ease: "power2.out",

          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play reverse play reverse",
          }
        }
      );

      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          {
            opacity: 0,
            y: 60,
            scale: 0.92,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            delay: i * 0.08,

            scrollTrigger: {
              trigger: section,
              start: "top 65%",
              toggleActions: "play reverse play reverse",
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const left = leftAssetRef.current;
    const right = rightAssetRef.current;

    if (!left || !right) return;

    const xLeft = gsap.quickTo(left, "x", { duration: 0.8, ease: "power3.out" });
    const yLeft = gsap.quickTo(left, "y", { duration: 0.8, ease: "power3.out" });

    const xRight = gsap.quickTo(right, "x", { duration: 0.8, ease: "power3.out" });
    const yRight = gsap.quickTo(right, "y", { duration: 0.8, ease: "power3.out" });

    const onMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;

      xLeft(nx * -25);
      yLeft(ny * -12);

      xRight(nx * 25);
      yRight(ny * -18);
    };

    window.addEventListener("mousemove", onMove);

    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="about-br" ref={sectionRef}>
      <div className="about-br-oval-left"></div>
      <div className="about-br-oval-right"></div>

      <div ref={leftSpikeRef} className="about-br-spike-left">
        <Image
          src="/images/decoration/spike-left.png"
          alt="spike-left"
          width={300}
          height={400}
          className="spike-image"
        />
      </div>

      <div ref={rightSpikeRef} className="about-br-spike-right">
        <Image
          src="/images/decoration/spike-right.png"
          alt="spike-right"
          width={300}
          height={400}
          className="spike-image"
        />
      </div>

      <div ref={leftAssetRef} className="about-br-grain-left">
        <Image
          src="/images/decoration/grain-left.png"
          alt="grain-left"
          width={200}
          height={300}
          className="grain-image"
        />
      </div>

      <div ref={rightAssetRef} className="about-br-grain-right">
        <Image
          src="/images/decoration/grain-right.png"
          alt="grain-right"
          width={200}
          height={300}
          className="grain-image"
        />
      </div>

      <div className="about-br-content">
        <div className="about-br-header">
          <div className="about-br-badge">
            <svg
              width="280"
              height="120"
              viewBox="0 0 280 120"
              className="about-br-badge-svg"
            >
              <path
                id="curve"
                d="M 10 100 Q 140 10, 270 100"
                fill="transparent"
              />

              <text
                className="about-br-badge-text"
                textAnchor="middle"
              >
                <textPath
                  ref={badgeTextRef}
                  href="#curve"
                  startOffset="0%"
                >
                  коллекция из 7 карточек
                </textPath>
              </text>
            </svg>

            <div className="about-br-heart">
              <TextReveal>
                <Image
                  src="/images/icons/about-br-heart.svg"
                  alt="heart"
                  width={40}
                  height={40}
                />
              </TextReveal>
            </div>
          </div>

          <div className="about-br-title">
            <TextReveal>
              <h1 className="about-br-title-up">мой</h1>
            </TextReveal>
            <TextReveal>
              <h1 className="about-br-title-down">хлебный мякиш</h1>
            </TextReveal>

          </div>
        </div>
        <TextReveal>
          <p className="about-br-subtitle">
            мой хлебный мякиш — коллекция из 7 уникальных карточек. Самые добрые, самые любимые, на которых <span className="highlight">полинка</span> невероятно хорошая!!!
          </p>
        </TextReveal>
        <div className="about-br-cards">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
              className="about-br-card-item"
            >
              <div className="about-br-card-inner">
                <div className="about-br-card-front">
                  <Image
                    src={`/images/cards-main/br/card-front-${index + 1}.png`}
                    alt={`Bread card ${index + 1} front`}
                    width={240}
                    height={360}
                  />
                </div>
                <div className="about-br-card-back">
                  <Image
                    src={`/images/cards-main/br/card-back-${index + 1}.png`}
                    alt={`Bread card ${index + 1} back`}
                    width={240}
                    height={360}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="about-br-footer">
          <Link href="/catalog" className="about-br-btn" ref={buttonRef}>
            <span>ПЕРЕЙТИ В КАТАЛОГ</span>
            <svg className="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}