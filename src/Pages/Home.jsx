import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

// Components
import Hero from "../Components/Hero";
import Latestproduct from "../Components/Latestproduct";
import Compound from "../Components/Compound";
import Electronic from "../Components/Electronic";
import Finishedproduct from "../Components/Finishedproduct";
import Hardware from "../Components/Hardware";
import Industries from "../Components/Industries";
import Featured from "../Components/Featured";

function Home() {
  const [title, setTitle] = useState("Source India Electronics");

  useEffect(() => {
    fetch(
      "https://react-live.sourceindia-electronics.com/v1/api/seo_pages/slug/home"
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("SEO RESPONSE:", res);

        const data = res?.data;
        const seo = Array.isArray(data) ? data[0] : data;

        const finalTitle =
          seo?.meta_title ||
          seo?.title ||
          "Source India Electronics | B2B Electronics Supply Chain Portal";

        setTitle(finalTitle);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {/* ✅ SEO TITLE */}
      <Helmet>
        <title>{title}</title>
      </Helmet>

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