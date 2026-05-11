"use client";
import Link from "next/link";
import Image from "next/image";

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
          <p className="footer-quote">
            самые лучшие, любимые и бесценные моменты с моей любимой, прекрасной полинкой! 
            мы прошли столько всего, я так люблю и хочу посвятить это все своей ненаглядной. 
            эти коллекционные карточки, весь проект, в который вложил всю свою душу
          </p>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <Link href="/terms" className="footer-terms">
              условия использования
            </Link>
          </div>
          
          <div className="footer-bottom-center">
            <div className="footer-socials">
              <Link href="https://vk.com/yourusername" className="footer-social-link" target="_blank">
                VK
              </Link>
              <Link href="https://t.me/yourusername" className="footer-social-link" target="_blank">
                Telegram
              </Link>
              <Link href="mailto:your-email@example.com" className="footer-social-link">
                Email
              </Link>
            </div>
          </div>
          
          <div className="footer-bottom-right">
            <p className="footer-copyright">© 2026, OurLittleCards</p>
          </div>
        </div>
      </div>
    </footer>
  );
}