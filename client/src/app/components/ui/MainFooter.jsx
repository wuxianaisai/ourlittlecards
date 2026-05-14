"use client";
import Link from "next/link";
import Image from "next/image";

import TextReveal from "../TextReveal";

export default function MainFooter() {
  return (
    <footer className="footer">
      <div className="footer-bg">
        <Image
          src="/images/backgrounds/bg-hero4.jpg"
          alt="Footer background"
          fill
          className="footer-bg-image"
        />
        <div className="footer-overlay"></div>
      </div>

      <div className="footer-content">
        <div className="footer-top">
          <TextReveal>
          <p className="footer-quote">            
            самые лучшие, любимые и бесценные моменты с моей любимой, прекрасной полинкой! 
            мы прошли столько всего, я так люблю и хочу посвятить это все своей ненаглядной. 
            эти коллекционные карточки, весь проект, в который вложил всю свою душу
          </p>
          </TextReveal>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <TextReveal start="top 100%">
            <Link href="/terms" className="footer-terms">
              условия использования
            </Link>
            </TextReveal>
          </div>
          
          <div className="footer-bottom-center">
            <div className="footer-socials">
              <TextReveal type="words">
              <Link href="https://vk.com/yourusername" className="footer-social-link" target="_blank">
                VK
              </Link>
              <Link href="https://t.me/yourusername" className="footer-social-link" target="_blank">
                Telegram
              </Link>
              <Link href="mailto:your-email@example.com" className="footer-social-link">
                Email
              </Link>
              </TextReveal>
            </div>
          </div>
          
          <div className="footer-bottom-right">
            <TextReveal start="top 100%">
            <p className="footer-copyright">© 2026, OurLittleCards</p>
            </TextReveal>
          </div>
        </div>
      </div>
    </footer>
  );
}