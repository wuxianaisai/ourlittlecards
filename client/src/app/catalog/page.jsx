"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import NavMenu from "../components/ui/NavMenu";

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
      {/* <NavMenu /> */}
      <div className="catalog-page">
        <div className="catalog-header">
          <h1>Каталог</h1>
          <div className="catalog-filters">
            <button 
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              Все
            </button>
            <button 
              className={`filter-btn ${filter === "princess" ? "active" : ""}`}
              onClick={() => setFilter("princess")}
            >
              Princess
            </button>
            <button 
              className={`filter-btn ${filter === "bread" ? "active" : ""}`}
              onClick={() => setFilter("bread")}
            >
              Хлебный мякиш
            </button>
          </div>
        </div>

        <div className="catalog-grid">
          {filteredCards.map((card) => (
            <div key={card.id} className="catalog-card">
              <div className="catalog-card-image">
                <Image
                  src={card.image}
                  alt={card.name}
                  width={240}
                  height={360}
                />
              </div>
              <h3>{card.name}</h3>
              <p>{card.collection}</p>
              <span className="price">{card.price}</span>
              <div className="card-actions">
                <button className="wishlist-btn">❤️</button>
                <button className="cart-btn">🛒</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .catalog-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          padding: 8rem 2rem 4rem;
        }
        
        .catalog-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .catalog-header h1 {
          font-size: 3rem;
          color: #fff;
          margin-bottom: 1rem;
          font-family: "Doppelganger", serif;
        }
        
        .catalog-filters {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        
        .filter-btn {
          padding: 0.5rem 1.5rem;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 30px;
          color: #fff;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: "Jost", sans-serif;
        }
        
        .filter-btn:hover,
        .filter-btn.active {
          background: #e94560;
          border-color: #e94560;
        }
        
        .catalog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .catalog-card {
          background: rgba(255,255,255,0.05);
          border-radius: 1rem;
          padding: 1rem;
          text-align: center;
          transition: transform 0.3s ease;
        }
        
        .catalog-card:hover {
          transform: translateY(-5px);
        }
        
        .catalog-card-image {
          width: 100%;
          aspect-ratio: 2/3;
          border-radius: 0.8rem;
          overflow: hidden;
          margin-bottom: 1rem;
        }
        
        .catalog-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .catalog-card h3 {
          color: #fff;
          font-size: 1.1rem;
          margin-bottom: 0.25rem;
        }
        
        .catalog-card p {
          color: #9F9F9F;
          font-size: 0.8rem;
          margin-bottom: 0.5rem;
          text-transform: none;
        }
        
        .price {
          display: inline-block;
          color: #e94560;
          font-size: 0.9rem;
          font-weight: bold;
          margin-bottom: 0.75rem;
        }
        
        .card-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }
        
        .card-actions button {
          background: rgba(255,255,255,0.1);
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1.1rem;
        }
        
        .card-actions button:hover {
          background: #e94560;
          transform: scale(1.1);
        }
      `}</style>
    </>
  );
}