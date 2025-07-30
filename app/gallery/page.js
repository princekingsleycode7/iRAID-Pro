"use client";
// app/core/page.js

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ScrollingGallery from "../components/ScrollingGallery";
import dynamic from "next/dynamic";

export default function CorePage() {
  return (
    <main>
      <Nav />
      {/* Render the Gallery component which now contains the Masonry grid */}
        <ScrollingGallery />
      <Footer />
    </main>
  );
}