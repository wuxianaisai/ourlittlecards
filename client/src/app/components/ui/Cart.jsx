"use client";

import Image from "next/image";
import TextReveal from "../TextReveal";

export default function Cart() {
    const selectedItems = [
        {
            id: 1,
            title: "Standard Edition",
            subtitle: "3 collectible cards",
            image: "/images/catalog/standard-set.png",
            rotate: "-6deg",
            top: "120px",
        },
        {
            id: 2,
            title: "Exclusive Edition",
            subtitle: "5 collectible cards",
            image: "/images/catalog/exclusive-set.png",
            rotate: "4deg",
            top: "0px",
        },
        {
            id: 3,
            title: "Full Collection Box",
            subtitle: "all cards included",
            image: "/images/catalog/box-set.png",
            rotate: "8deg",
            top: "180px",
        },
    ];

    return (
        <section className="selection">

            <div className="selection-bg-word">
                КОРЗИНА
            </div>

            <div className="selection-noise"></div>

            <div className="selection-header">

                <div className="selection-subtitle">
                    CURATED SELECTION
                </div>

                <TextReveal>
                    <h1>
                        Скоро твои
                    </h1>
                </TextReveal>

            </div>

            <div className="selection-layout">

                <div className="selection-cart-list">

                    {selectedItems.map((item) => (
                        <div className="selection-cart-item" key={item.id}>

                            <div className="selection-cart-image">

                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="selection-cart-img"
                                />

                            </div>

                            <div className="selection-cart-info">

                                <div className="selection-cart-top">

                                    <div>

                                        <div className="selection-cart-title">
                                            {item.title}
                                        </div>

                                        <div className="selection-cart-subtitle">
                                            {item.subtitle}
                                        </div>

                                    </div>

                                    <div className="selection-cart-price">
                                        €24
                                    </div>

                                </div>

                                <div className="selection-cart-bottom">

                                    <div className="selection-quantity">

                                        <button>-</button>

                                        <span>1</span>

                                        <button>+</button>

                                    </div>

                                    <button className="selection-remove">
                                        УДАЛИТЬ
                                    </button>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>

                <div className="selection-side">

                    <div className="selection-side-top">

                        <div className="selection-label">
                            ТОВАРОВ
                        </div>

                        <div className="selection-count">
                            03
                        </div>

                    </div>

                    <div className="selection-divider"></div>

                    <div className="selection-side-bottom">

                        <div className="selection-note">
                            Особенные вещи из архивов коллекций.
                        </div>

                        <button className="selection-btn">
                            СОБРАТЬ КОЛЛЕКЦИЮ
                        </button>

                    </div>

                </div>

            </div>

        </section>
    );
}