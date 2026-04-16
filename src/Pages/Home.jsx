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

  const [seoTitle, setSeoTitle] = useState("");

  useEffect(() => {
    fetch("https://react-live.sourceindia-electronics.com/v1/api/seo_pages/slug/home")
      .then(res => res.json())
      .then(data => {

        console.log("API DATA:", data);

        // ✅ ONLY API TITLE (NO FALLBACK)
        setSeoTitle(data.title);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      {/* ✅ ONLY API TITLE */}
      <Helmet>
        <title>{seoTitle}</title>
      </Helmet>

      {/* PAGE CONTENT */}
      <Hero />
      <Latestproduct />
      <Compound />
      <Electronic />
      <Finishedproduct />
      <Hardware />
      <Industries />
      <Featured />
    </>
  );
}

export default Home;