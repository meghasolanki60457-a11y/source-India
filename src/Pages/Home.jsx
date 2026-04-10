import React from "react";

import Hero from "../components/Hero";
import Latestproduct from "../components/Latestproduct";
import Compound from "../components/Compound";
import Electronic from "../components/Electronic";
import Finishedproduct from "../components/Finishedproduct";
import Hardware from "../components/Hardware";
import Industries from "../components/Industries";
import Featured from "../components/Featured";

function Home() {
  return (
    <>
      {/* 🔥 HERO SECTION */}
      <Hero />

      {/* 🆕 LATEST PRODUCTS */}
      <Latestproduct />

      {/* 🧪 COMPOUND SECTION */}
      <Compound />

      {/* ⚡ ELECTRONIC SECTION */}
      <Electronic />

      {/* 🏭 FINISHED PRODUCTS */}
      <Finishedproduct />

      {/* 🔧 HARDWARE */}
      <Hardware />

      {/* 🏢 INDUSTRIES */}
      <Industries />

      {/* ⭐ FEATURED PRODUCTS */}
      <Featured />
    </>
  );
}

export default Home;