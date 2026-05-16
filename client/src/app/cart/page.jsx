"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import MainFooter from "../components/ui/MainFooter";
import Timeline from "../components/ui/Timeline";
import Cart from "../components/ui/Cart";


export default function AboutPage() {

  return (
    <>
    <Cart />
    <MainFooter />
    </>
  );
}