"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

// Регистрируем плагин
if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const menuRef = useRef(null);
  const menuBgRef = useRef(null);
  const menuLogoRef = useRef(null);
  const menuLinksRef = useRef(null);
  const menuInfoRef = useRef(null);
  const navToggleMenuRef = useRef(null);
  const navToggleCloseRef = useRef(null);
  
  const splitsRef = useRef([]);

  const svgWidth = 1131;
  const svgHeight = 861;
  const svgCenterX = svgWidth / 2;

  const OPEN_HIDDEN = `M${svgWidth},0 Q${svgCenterX},0 0,0 L0,0 L${svgWidth},0 Z`;
  const OPEN_BULGE = `M${svgWidth},345 Q${svgCenterX},620 0,345 L0,0 L${svgWidth},0 Z`;
  const OPEN_FULL = `M${svgWidth},${svgHeight} Q${svgCenterX},${svgHeight} 0,${svgHeight} L0,0 L${svgWidth},0 Z`;
  const CLOSE_START = `M${svgWidth},0 Q${svgCenterX},0 0,0 L0,${svgHeight} L${svgWidth},${svgHeight} Z`;
  const CLOSE_BULGE = `M${svgWidth},350 Q${svgCenterX},130 0,350 L0,${svgHeight} L${svgWidth},${svgHeight} Z`;
  const CLOSE_HIDDEN = `M${svgWidth},${svgHeight} Q${svgCenterX},${svgHeight} 0,${svgHeight} L0,${svgHeight} L${svgWidth},${svgHeight} Z`;

  const openMenu = () => {
    menuRef.current?.classList.add("is-open");

    gsap.to(navToggleMenuRef.current, { duration: 0.25, opacity: 0, ease: "none" });
    gsap.to(navToggleCloseRef.current, {
      duration: 0.25,
      opacity: 1,
      ease: "none",
      delay: 0.25,
    });

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    tl.to(menuBgRef.current, {
      duration: 0.5,
      attr: { d: OPEN_BULGE },
      ease: "power4.in",
    }).to(menuBgRef.current, {
      duration: 0.5,
      attr: { d: OPEN_FULL },
      ease: "power4.out",
    });

    tl.to(menuLogoRef.current, { duration: 0.1, opacity: 1, ease: "none" }, "-=0.75");

    const infoItems = menuInfoRef.current?.querySelectorAll("p, h3, h6");
    if (infoItems && infoItems.length) {
      tl.to(
        infoItems,
        {
          duration: 0.75,
          opacity: 1,
          y: 0,
          ease: "power3.out",
          stagger: 0.075,
        },
        "-=0.35"
      );
    }

    const menuLinkChars = splitsRef.current.flatMap((split) => split.chars);
    if (menuLinkChars.length) {
      tl.to(
        menuLinkChars,
        {
          duration: 1.5,
          x: "0%",
          ease: "elastic.out(1, 0.25)",
          stagger: 0.01,
        },
        0.45
      );
      tl.to(
        menuLinkChars,
        {
          duration: 0.75,
          opacity: 1,
          ease: "power2.out",
          stagger: 0.01,
        },
        0.45
      );
    }
  };

  const closeMenu = () => {
    gsap.set(menuBgRef.current, { attr: { d: CLOSE_START } });

    gsap.to(navToggleCloseRef.current, { duration: 0.3, opacity: 0, ease: "none" });
    gsap.to(navToggleMenuRef.current, {
      duration: 0.3,
      opacity: 1,
      ease: "none",
      delay: 0.25,
    });

    const tl = gsap.timeline({
      onComplete: () => {
        menuRef.current?.classList.remove("is-open");
        gsap.set(menuBgRef.current, { attr: { d: OPEN_HIDDEN } });
        splitsRef.current.forEach((split) => {
          gsap.set(split.chars, { opacity: 0, x: "750%" });
        });
        
        const links = menuLinksRef.current?.querySelectorAll("a");
        if (links && links.length) {
          gsap.set(links, { opacity: 1 });
        }
        
        const infoItems = menuInfoRef.current?.querySelectorAll("p, h3, h6");
        if (infoItems && infoItems.length) {
          gsap.set(infoItems, { opacity: 0, y: 100 });
        }
        setIsAnimating(false);
      },
    });

    tl.to(menuLogoRef.current, { duration: 0.3, opacity: 0 })
      .to(menuLinksRef.current?.querySelectorAll("a"), { duration: 0.3, opacity: 0 }, "<")
      .to(menuInfoRef.current?.querySelectorAll("p, h3, h6"), { duration: 0.3, opacity: 0 }, "<");

    tl.to(
      menuBgRef.current,
      { duration: 0.5, attr: { d: CLOSE_BULGE }, ease: "power3.in" },
      "<"
    ).to(menuBgRef.current, {
      duration: 0.5,
      attr: { d: CLOSE_HIDDEN },
      ease: "power3.out",
    });
  };

  const toggleMenu = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    if (!isOpen) {
      setIsOpen(true);
      openMenu();
    } else {
      setIsOpen(false);
      closeMenu();
    }
  };

  useEffect(() => {
    const links = menuLinksRef.current?.querySelectorAll("a");
    if (links && links.length) {
      splitsRef.current = Array.from(links).map((link) => {
        const split = new SplitText(link, { type: "chars", charsClass: "char" });
        gsap.set(split.chars, { opacity: 0, x: "750%" });
        return split;
      });
    }

    gsap.set(menuBgRef.current, { attr: { d: OPEN_HIDDEN } });
    gsap.set(menuLogoRef.current, { opacity: 0 });
    gsap.set(navToggleCloseRef.current, { opacity: 0 });
    
    const infoItems = menuInfoRef.current?.querySelectorAll("p, h3, h6");
    if (infoItems && infoItems.length) {
      gsap.set(infoItems, { opacity: 0, y: 100 });
    }

    return () => {
      splitsRef.current.forEach((split) => {
        if (split && split.revert) split.revert();
      });
    };
  }, []);

  return (
    <div className="nav">
      <div className="nav-logo">
        <Link href="/">
          <Image src="/images/logo/logo1.svg" width={60} height={60} alt="logo" />
        </Link>
      </div>
      
      <div className="nav-toggle" onClick={toggleMenu}>
        <p ref={navToggleMenuRef} className="nav-toggle-menu">Menu</p>
        <p ref={navToggleCloseRef} className="nav-toggle-close">Close</p>
      </div>

      <div ref={menuRef} className={`menu ${isOpen ? "is-open" : ""}`}>
        <svg
          className="menu-bg-svg"
          viewBox="0 0 1131 861"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={menuBgRef}
            id="menu-path"
            fill="#f0eeee"
            d="M0,0 L0,861 Q565.5,861 1131,861 L1131,0 Z"
          />
        </svg>

        <div ref={menuLogoRef} className="menu-logo">
          <Link href="/" onClick={toggleMenu}>
            <Image src="/images/logo/logo2.svg" width={60} height={60} alt="logo" />
          </Link>
        </div>

        <div ref={menuInfoRef} className="menu-col menu-col-info">
          <p>Связаться</p>
          <h3>wuxianaisai@mail.ru</h3>
          <h3>+79190442643</h3>
          <br />
          <h6>ул. Рыленкова 11А</h6>
          <h6>г. Смоленск</h6>
        </div>

        <div ref={menuLinksRef} className="menu-col menu-col-links">
          <Link href="/" onClick={toggleMenu}>Главная</Link>
          <Link href="/about" onClick={toggleMenu}>История создания</Link>
          <Link href="/catalog" onClick={toggleMenu}>Каталог</Link>
          <Link href="/cart" onClick={toggleMenu}>Корзина</Link>
          <Link href="/profile" onClick={toggleMenu}>Моя коллекция</Link>
          <Link href="/profile/settings" onClick={toggleMenu}>Мой профиль</Link>
        </div>
      </div>
    </div>
  );
}