"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutBread() {
  const sectionRef = useRef(null);
  const leftSpikeRef = useRef(null);
  const rightSpikeRef = useRef(null);
  const leftAssetRef = useRef(null);
  const rightAssetRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (leftSpikeRef.current) {
      gsap.fromTo(leftSpikeRef.current,
        { x: "-120%", y: "100%", opacity: 0 },
        {
          x: "0%",
          y: "0%",
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          }
        }
      );
    }

    if (rightSpikeRef.current) {
      gsap.fromTo(rightSpikeRef.current,
        { x: "120%", y: "100%", opacity: 0 },
        {
          x: "0%",
          y: "0%",
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          }
        }
      );
    }

    if (leftAssetRef.current) {
      gsap.fromTo(leftAssetRef.current,
        { x: "-100%", opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 50%",
            scrub: 1,
          }
        }
      );
    }

    if (rightAssetRef.current) {
      gsap.fromTo(rightAssetRef.current,
        { x: "100%", opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 50%",
            scrub: 1,
          }
        }
      );
    }

    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "top 30%",
            scrub: 1,
          }
        }
      );
    });
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

      {/* Контент */}
      <div className="about-br-content">
        <div className="about-br-header">
          <div className="about-br-badge">
            <svg width="280" height="120" viewBox="0 0 280 120">
              <path id="curve" d="M 10 100 Q 140 10, 270 100" fill="transparent" />
              <text className="about-br-badge-text" textAnchor="middle">
                <textPath href="#curve" startOffset="50%">коллекция из 7 карточек</textPath>
              </text>
            </svg>
            <div className="about-br-heart">
              <Image
                src="/images/icons/about-br-heart.svg"
                alt="heart"
                width={40}
                height={40}
              />
            </div>
          </div>

          <div className="about-br-title">
            <h1 className="about-br-title-up">мой</h1>
            <h1 className="about-br-title-down">хлебный мякиш</h1>
          </div>
        </div>

        <p className="about-br-subtitle">
          мой хлебный мякиш — коллекция из 7 уникальных карточек. Самые добрые, самые любимые, на которых <span className="highlight">полинка</span> невероятно хорошая!!!
        </p>

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
          <Link href="/catalog" className="about-br-btn">
            <span>ПЕРЕЙТИ В КАТАЛОГ</span>
            <svg className="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}