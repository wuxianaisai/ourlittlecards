"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import MainFooter from "../components/ui/MainFooter";
import Timeline from "../components/ui/Timeline";


export default function AboutPage() {

  return (
    <>
    <Timeline />
    <MainFooter />
    </>
  );
}