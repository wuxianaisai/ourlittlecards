"use client";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <div class="nav">
            <div class="nav-logo">
                <Link href="/">
                    <Image src="" alt="logo" />
                </Link>
            </div>
            <div class="nav-toggle">
                <p class="nav-toggle-menu">Menu</p>
                <p class="nav-toggle-close">Close</p>
            </div>

            <div class="menu">
                <svg
                    class="menu-bg-svg"
                    viewBox="0 0 1131 861"
                    preserveAspectRatio="none"
                    xmlns="https://www.w3.org/2000/svg"
                >
                    <path
                        id="menu-path"
                        fill="f0eeee"
                    />

                </svg>
            </div>
        </div>

    );
}
