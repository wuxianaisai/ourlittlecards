"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  const menuRef = useRef(null);
  const menuBgRef = useRef(null);
  const menuLogoRef = useRef(null);
  const menuLinksRef = useRef(null);
  const menuInfoRef = useRef(null);
  const navToggleMenuRef = useRef(null);
  const navToggleCloseRef = useRef(null);
  const imageBlockRef = useRef(null);
  const imageInnerRef = useRef(null);

  const splitsRef = useRef([]);
  let hideTimeoutRef = useRef(null);
  let isFirstHover = useRef(true);

  // Изображения для каждого пункта меню
  const menuImages = {
    "Главная": "/images/menu/home4.jpg",
    "История создания": "/images/menu/history6.jpg",
    "Каталог": "/images/menu/catalog.jpg",
    "Корзина": "/images/menu/cart.jpg",
    "Моя коллекция": "/images/menu/collection.jpg",
    "Мой профиль": "/images/menu/profile.jpg",
  };

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

        // Скрываем блок с изображением при закрытии меню
        gsap.to(imageBlockRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            setCurrentImage(null);
            setHoveredLink(null);
          }
        });

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

  // Плавная смена изображения
  const changeImage = (newSrc, linkText) => {
    if (!imageInnerRef.current) return;

    const tl = gsap.timeline();
    
    tl.to(imageInnerRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setCurrentImage(newSrc);
        setHoveredLink(linkText);
        // Небольшая задержка перед появлением нового изображения
        setTimeout(() => {
          if (imageInnerRef.current) {
            gsap.fromTo(imageInnerRef.current,
              { opacity: 0, scale: 0.95 },
              { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(0.4)" }
            );
          }
        }, 50);
      }
    });
  };

  // Анимация при наведении на ссылку
  const handleLinkHover = (linkText) => {
    // Очищаем таймер скрытия
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    const newImageSrc = menuImages[linkText];
    if (!newImageSrc) return;

    // Если блок скрыт - показываем его с анимацией
    if (imageBlockRef.current && gsap.getProperty(imageBlockRef.current, "opacity") === 0) {
      gsap.to(imageBlockRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "back.out(0.3)",
      });
    }

    // Если изображение ещё не загружено или меняем на другое
    if (currentImage !== newImageSrc) {
      if (!currentImage) {
        // Первое изображение — просто появляется
        setCurrentImage(newImageSrc);
        setHoveredLink(linkText);
        gsap.fromTo(imageInnerRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(0.4)" }
        );
      } else {
        // Смена изображения с анимацией
        changeImage(newImageSrc, linkText);
      }
    }
  };

  // Анимация при уходе мыши со ссылки
  const handleLinkLeave = () => {
    // Устанавливаем таймер на скрытие блока через 500мс
    hideTimeoutRef.current = setTimeout(() => {
      gsap.to(imageBlockRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setCurrentImage(null);
          setHoveredLink(null);
        }
      });
    }, 500);
  };

  // Очистка таймера при повторном наведении
  const handleLinkMouseEnter = (linkText) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    handleLinkHover(linkText);
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
    gsap.set(imageBlockRef.current, { opacity: 0 });
    
    // Устанавливаем начальную прозрачность для изображения
    if (imageInnerRef.current) {
      gsap.set(imageInnerRef.current, { opacity: 0 });
    }

    const infoItems = menuInfoRef.current?.querySelectorAll("p, h3, h6");
    if (infoItems && infoItems.length) {
      gsap.set(infoItems, { opacity: 0, y: 100 });
    }

    return () => {
      splitsRef.current.forEach((split) => {
        if (split && split.revert) split.revert();
      });
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
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

        {/* БОЛЬШОЙ БЛОК С ИЗОБРАЖЕНИЕМ СЛЕВА */}
        <div ref={imageBlockRef} className="menu-image-block">
          <div className="image-wrapper">
            {currentImage && (
              <Image
                ref={imageInnerRef}
                src={currentImage}
                alt={hoveredLink || "Menu image"}
                width={1920}
                height={1080}
                className="menu-image"
              />
            )}
          </div>
        </div>

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
          <Link
            href="/"
            onClick={toggleMenu}
            onMouseEnter={() => handleLinkMouseEnter("Главная")}
            onMouseLeave={handleLinkLeave}
          >Главная</Link>
          <Link
            href="/about"
            onClick={toggleMenu}
            onMouseEnter={() => handleLinkMouseEnter("История создания")}
            onMouseLeave={handleLinkLeave}
          >История создания</Link>
          <Link
            href="/catalog"
            onClick={toggleMenu}
            onMouseEnter={() => handleLinkMouseEnter("Каталог")}
            onMouseLeave={handleLinkLeave}
          >Каталог</Link>
          <Link
            href="/cart"
            onClick={toggleMenu}
            onMouseEnter={() => handleLinkMouseEnter("Корзина")}
            onMouseLeave={handleLinkLeave}
          >Корзина</Link>
          <Link
            href="/profile"
            onClick={toggleMenu}
            onMouseEnter={() => handleLinkMouseEnter("Моя коллекция")}
            onMouseLeave={handleLinkLeave}
          >Моя коллекция</Link>
          <Link
            href="/profile/settings"
            onClick={toggleMenu}
            onMouseEnter={() => handleLinkMouseEnter("Мой профиль")}
            onMouseLeave={handleLinkLeave}
          >Мой профиль</Link>
        </div>
      </div>
    </div>
  );
}