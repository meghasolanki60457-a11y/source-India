import React, { useEffect, useState } from "react";

const Hero = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://react-live.sourceindia-electronics.com/v1/api/home_banners")
      .then((res) => res.json())
      .then((data) => {
        setBanners(data?.data || []); // API structure ke hisaab se
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="hero">Loading...</div>;
  }

  return (
    <div className="hero">
      {banners.map((item, index) => (
        <div
          key={index}
          className="hero-slide"
          style={{
            backgroundImage: `url(${item.image})`,
          }}
        >
          <div className="hero-overlay">
            <div className="hero-content">
              <h1>{item.title}</h1>
              <p>{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hero;