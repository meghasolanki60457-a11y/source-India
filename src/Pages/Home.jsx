import React from "react";

import Hero from "../Components/Hero";
import Latestproduct from "../Components/Latestproduct";
import Compound from "../Components/Compound";
import Electronic from "../Components/Electronic";
import Finishedproduct from "../Components/Finishedproduct";
import Hardware from "../Components/Hardware";
import Industries from "../Components/Industries";
import Featured from "../Components/Featured";

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