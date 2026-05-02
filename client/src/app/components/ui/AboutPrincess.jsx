"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

export default function AboutPrincess() {


  return (
    <section className="about">
      <div className="about-pr-bg">
        <Image
          src="/images/backgrounds/bg-about-pr1.jpg"
          alt="Background"
          fill
          priority
          className="about-pr-bg-image"
        />
        <div className="about-overlay"></div>
      </div>

      <div className="about-content">
        <div className="about-header">
          {/* <div className="about-icon-wrapper">
            <Image
              src="/images/decoration/heart-eye.png"
              alt="heart-eye"
              width={157}
              height={227}
              className="hero-icon"
            />
          </div>
          <h1 ref={heroTitleLeftRef} className="hero-title-left">Новая</h1>
          
          <h1 ref={heroTitleRightRef} className="hero-title-right">Коллекция</h1>
        </div>

        <div className="hero-footer">
          <p ref={heroSubtitleRef} className="hero-subtitle">
            Лимитированная двойная коллекция фотокарточек с моей любимой.
          </p>
          <Link href="/catalog" ref={heroBtnRef} className="hero-btn">
            ОБЗОР КОЛЛЕКЦИИ
          </Link> */}
        </div>
      </div>
    </section>
  );
}