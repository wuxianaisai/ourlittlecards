"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const timelineData = [
    {
      year: "01",
      title: "Идея — KPOP карточки",
      description:
        "Все началось с желания создать коллекцию, которая ощущается как настоящий дизайнерский объект. Не просто карточки, а эстетический артефакт.",
      image: "/images/timeline/idea.jpg",
    },
    {
      year: "02",
      title: "Дизайн",
      description:
        "Поиск визуального языка. Формы, типографика, текстуры, винтажные детали и ощущение премиального fashion-проекта.",
      image: "/images/timeline/design.jpg",
    },
    {
      year: "03",
      title: "Прототип — Black & White",
      description:
        "Первые тестовые макеты в монохроме. Проверка композиции, материалов и общей атмосферы коллекции.",
      image: "/images/timeline/bw.jpg",
    },
    {
      year: "04",
      title: "Второй прототип",
      description:
        "Появляется цвет. Коллекция начинает выглядеть как законченный визуальный продукт.",
      image: "/images/timeline/color.jpg",
    },
    {
      year: "05",
      title: "Упаковки",
      description:
        "Разработка упаковки как части опыта. Каждая коробка должна ощущаться как luxury unboxing.",
      image: "/images/timeline/package.jpg",
    },
    {
      year: "06",
      title: "Протекторы",
      description:
        "Создание собственных протекторов с минималистичным брендингом и premium-фактурой.",
      image: "/images/timeline/protectors.jpg",
    },
    {
      year: "07",
      title: "Deluxe Edition",
      description:
        "Особое издание с редкими карточками, дополнительными элементами и коллекционными деталями.",
      image: "/images/timeline/deluxe.jpg",
    },
    {
      year: "08",
      title: "Финальная печать",
      description:
        "Последняя проверка качества. Бумага, оттенки, текстуры и каждая мелочь доводятся до идеала.",
      image: "/images/timeline/print.jpg",
    },
    {
      year: "09",
      title: "Сайт",
      description:
        "Создание immersive digital experience в эстетике fashion editorials и Awwwards-проектов.",
      image: "/images/timeline/site.jpg",
    },
    {
      year: "10",
      title: "Приложение",
      description:
        "Коллекция выходит за пределы физического формата и превращается в полноценную цифровую экосистему.",
      image: "/images/timeline/app.jpg",
    },
    {
      year: "11",
      title: "Финал",
      description:
        "Идея становится реальным объектом. Полноценная коллекция завершена.",
      image: "/images/timeline/final.jpg",
    },
  ];

  useEffect(() => {
    const cards = cardsRef.current;

    cards.forEach((card, index) => {
      const image = card.querySelector(".timeline-card-image");
      const overlay = card.querySelector(".timeline-card-overlay");
      const content = card.querySelector(".timeline-card-content");
      const number = card.querySelector(".timeline-number");

      gsap.set(content, {
        opacity: 0,
        x: 120,
      });

      gsap.set(number, {
        opacity: 0.15,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top top",
          end: "+=220%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(
        image,
        {
          scale: 1.12,
          duration: 1,
          ease: "power3.out",
        },
        0
      );

      tl.to(
        overlay,
        {
          opacity: 0.78,
          duration: 1,
        },
        0
      );

      tl.to(
        content,
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
        },
        0.2
      );

      tl.to(
        number,
        {
          opacity: 0.35,
          duration: 1,
        },
        0
      );

      tl.to(
        content,
        {
          opacity: 0,
          x: -100,
          duration: 0.7,
        },
        1.6
      );

      tl.to(
        image,
        {
          scale: 1,
          duration: 0.8,
        },
        1.6
      );

      tl.to(
        overlay,
        {
          opacity: 0.35,
          duration: 0.8,
        },
        1.6
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="timeline-section" ref={sectionRef}>
      <div className="timeline-header">
        <p className="timeline-label">OUR LITTLE CARDS</p>

        <h2 className="timeline-main-title">
          Хронология
          <br />
          создания
        </h2>
      </div>

      <div className="timeline-wrapper">
        {timelineData.map((item, index) => (
          <div
            className="timeline-card"
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <div className="timeline-card-bg">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="timeline-card-image"
              />
            </div>

            <div className="timeline-card-overlay" />

            <div className="timeline-number">{item.year}</div>

            <div className="timeline-card-content">
              <p className="timeline-small">CHAPTER {item.year}</p>

              <h3>{item.title}</h3>

              <p className="timeline-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}