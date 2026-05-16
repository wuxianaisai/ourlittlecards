"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import NavMenu from "../components/ui/NavMenu";
import Catalog from "../components/ui/Catalog";
import MainFooter from "../components/ui/MainFooter";

// Временные данные для каталога
const catalogCards = [
  { id: 1, name: "Карточка 1", collection: "Princess", image: "/card-front-pr-1.png", price: "Бесценно" },
  { id: 2, name: "Карточка 2", collection: "Princess", image: "/card-front-pr-2.png", price: "Бесценно" },
  { id: 3, name: "Карточка 3", collection: "Princess", image: "/card-front-pr-3.png", price: "Бесценно" },
  { id: 4, name: "Карточка 4", collection: "Princess", image: "/card-front-pr-4.png", price: "Бесценно" },
  { id: 5, name: "Карточка 1", collection: "Хлебный мякиш", image: "/card-front-br-1.png", price: "Бесценно" },
  { id: 6, name: "Карточка 2", collection: "Хлебный мякиш", image: "/card-front-br-2.png", price: "Бесценно" },
  { id: 7, name: "Карточка 3", collection: "Хлебный мякиш", image: "/card-front-br-3.png", price: "Бесценно" },
  { id: 8, name: "Карточка 4", collection: "Хлебный мякиш", image: "/card-front-br-4.png", price: "Бесценно" },
];

export default function CatalogPage() {
  const [filter, setFilter] = useState("all");

  const filteredCards = catalogCards.filter(card => {
    if (filter === "all") return true;
    if (filter === "princess") return card.collection === "Princess";
    if (filter === "bread") return card.collection === "Хлебный мякиш";
    return true;
  });

  return (
    <>
    <Catalog />
    <MainFooter />
    </>
  );
}