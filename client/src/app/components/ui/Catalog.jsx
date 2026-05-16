"use client";
import { useRef } from "react";
import Image from "next/image";
import TextReveal from "../TextReveal";

export default function Catalog() {
    const catalogItems = [
        {
            id: 1,
            title: "My Princess x мой хлебный мякиш Standard Edition, 3 карточки",
            price: "БЕСЦЕННО",
            image: "/images/catalog/standard-set.png",
        },
        {
            id: 2,
            title: "My Princess x мой хлебный мякиш бокс со всеми карточками",
            price: "БЕСЦЕННО",
            image: "/images/catalog/box-set.png",
        },
        {
            id: 3,
            title: "My Princess x мой хлебный мякиш Exclusive Edition, 5 карточек",
            price: "БЕСЦЕННО",
            image: "/images/catalog/exclusive-set.png",
        },
    ];

    return (
        <section className="catalog">
            <div className="catalog-header">
                <TextReveal>
                    <h1>Каталог</h1>
                </TextReveal>
            </div>

            <div className="catalog-grid">

                {catalogItems.map((item, index) => (
                    <div key={item.id} className="catalog-card">
                        <div className="catalog-card-image">
                            <TextReveal>
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={289}
                                    height={393}
                                    className="card-img"
                                />
                            </TextReveal>
                        </div>
                        <div className="catalog-card-info">
                            <TextReveal>
                                <div className="catalog-card-title">{item.title}</div>
                                <div className="catalog-card-price">{item.price}</div>
                            </TextReveal>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}