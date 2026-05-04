"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

export default function Hero() {
  const heroTitleLeftRef = useRef(null);
  const heroTitleRightRef = useRef(null);
  const heroImageRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroBtnRef = useRef(null);
  const bgImageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(bgImageRef.current,
      { scale: 1.1, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 2, 
        ease: "power3.out",
        overwrite: true
      }
    );

    if (heroTitleLeftRef.current) {
      const split = new SplitText(heroTitleLeftRef.current, { 
        type: "chars", 
        charsClass: "char" 
      });
      gsap.fromTo(split.chars,
        { 
          opacity: 0, 
          y: 50,
          rotateX: -90,
          filter: "blur(8px)"
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1,
          delay: 0.3,
          stagger: {
            each: 0.03,
            from: "start",
            ease: "power2.out"
          },
          ease: "back.out(0.6)",
        }
      );
    }

    if (heroImageRef.current) {
      gsap.fromTo(heroImageRef.current,
        { 
          scale: 0.7, 
          opacity: 0,
          filter: "blur(10px)"
        },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          delay: 0.5,
          ease: "power3.out",
        }
      );
    }

    if (heroTitleRightRef.current) {
      const split = new SplitText(heroTitleRightRef.current, { 
        type: "chars", 
        charsClass: "char" 
      });
      gsap.fromTo(split.chars,
        { 
          opacity: 0, 
          y: 50,
          rotateX: 90,
          filter: "blur(8px)"
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1,
          delay: 0.4,
          stagger: {
            each: 0.03,
            from: "end",
            ease: "power2.out"
          },
          ease: "back.out(0.6)",
        }
      );
    }

    if (heroSubtitleRef.current) {
      const split = new SplitText(heroSubtitleRef.current, { 
        type: "words", 
        wordsClass: "word",
        wordDelimiter: " "
      });
      
      split.words.forEach((word) => {
        gsap.set(word, { 
          opacity: 0, 
          y: 20,
          filter: "blur(4px)"
        });
      });
      
      gsap.to(split.words, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        delay: 0.7,
        stagger: {
          each: 0.08,
          from: "start",
          ease: "power2.out"
        },
        ease: "power3.out",
        overwrite: true
      });
    }

    if (heroBtnRef.current) {
      gsap.fromTo(heroBtnRef.current,
        { 
          x: 40, 
          opacity: 0,
          filter: "blur(4px)"
        },
        { 
          x: 0, 
          opacity: 1, 
          filter: "blur(0px)",
          duration: 0.9, 
          delay: 1.1, 
          ease: "power3.out" 
        }
      );
    }

    gsap.fromTo(".hero-overlay",
      { opacity: 0 },
      { opacity: 1, duration: 1.5, delay: 0.2, ease: "power2.out" }
    );

    return () => {
      gsap.killTweensOf(bgImageRef.current);
      gsap.killTweensOf(heroImageRef.current);
      gsap.killTweensOf(heroBtnRef.current);
      gsap.killTweensOf(".hero-overlay");
      
      // Cleanup SplitText instances
      if (heroTitleLeftRef.current) {
        const split = SplitText.getBySelector(heroTitleLeftRef.current);
        if (split) split.revert();
      }
      if (heroTitleRightRef.current) {
        const split = SplitText.getBySelector(heroTitleRightRef.current);
        if (split) split.revert();
      }
      if (heroSubtitleRef.current) {
        const split = SplitText.getBySelector(heroSubtitleRef.current);
        if (split) split.revert();
      }
    };
  }, []);

  return (
    <section className="hero">
      {/* Фон */}
      <div className="hero-bg">
        <Image
          ref={bgImageRef}
          src="/images/backgrounds/bg-hero4.jpg"
          alt="Background"
          fill
          priority
          className="hero-bg-image"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* Контент */}
      <div className="hero-content">
        <div className="hero-header">
          <h1 ref={heroTitleLeftRef} className="hero-title-left">Новая</h1>
          <div className="hero-icon-wrapper">
            <Image
              ref={heroImageRef}
              src="/images/decoration/heart-eye.png"
              alt="heart-eye"
              width={157}
              height={227}
              className="hero-icon"
            />
          </div>
          <h1 ref={heroTitleRightRef} className="hero-title-right">Коллекция</h1>
        </div>

        <div className="hero-footer">
          <p ref={heroSubtitleRef} className="hero-subtitle">
            Лимитированная двойная коллекция фотокарточек с моей любимой.
          </p>
          <Link href="/catalog" ref={heroBtnRef} className="hero-btn">
            ОБЗОР КОЛЛЕКЦИИ
          </Link>
        </div>
      </div>
    </section>
  );
}