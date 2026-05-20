"use client";
import { useRef } from "react";
import Image from "next/image";
import TextReveal from "../ui/TextReveal";

export default function Catalog() {
    const catalogItems = [
        {
            id: 1,
            title: "My Princess x мой хлебный мякиш Standard Edition, 3 карточки",
            price: "БЕСЦЕННО",
            image: "/images/catalog/standard-set1.png",
        },
        {
            id: 2,
            title: "My Princess x мой хлебный мякиш бокс со всеми карточками",
            price: "БЕСЦЕННО",
            image: "/images/catalog/box-set1.png",
        },
        {
            id: 3,
            title: "My Princess x мой хлебный мякиш Exclusive Edition, 5 карточек",
            price: "БЕСЦЕННО",
            image: "/images/catalog/exclusive-set1.png",
        },
    ];

    return (
        <section className="catalog">

    <div className="catalog-bg-title">
        ARCHIVE
    </div>

    <div className="catalog-line"></div>

    <div className="catalog-header">

        <div className="catalog-subtitle">
            LIMITED COLLECTIONS
        </div>

        <TextReveal>
            <h1>
                Каталог
            </h1>
        </TextReveal>

    </div>

    <div className="catalog-grid">

        {catalogItems.map((item) => (
            <div key={item.id} className="catalog-card">

                <div className="catalog-card-inner">

                    <div className="catalog-card-image">

                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="card-img"
                        />

                    </div>

                    <div className="catalog-card-info">

                        <div className="catalog-card-title">
                            {item.title}
                        </div>

                        <div className="catalog-card-price">
                            {item.price}
                        </div>

                    </div>

                </div>

            </div>
        ))}

    </div>

</section>
    );
}