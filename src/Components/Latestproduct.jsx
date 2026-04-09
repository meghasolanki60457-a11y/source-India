import React, { useEffect, useState } from "react";

const LatestProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(
      "https://react-live.sourceindia-electronics.com/v1/api/products?is_delete=0&status=1&is_approve=1&limit=6&page=1"
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data?.products || []);
      })
      .catch((err) => console.error(err));
  }, []);

  // Function to generate correct image URL
  const getImageUrl = (fileName) => {
    if (!fileName) return "/placeholder-image.png"; // fallback
    return `https://react-live.sourceindia-electronics.com/v1/${fileName.replace(/^\/+/, "")}`;
  };

  return (
    <section className="latest-product py-5">
      <div className="container">
        <h2 className="text-center mb-5 section-title">LATEST PRODUCT</h2>

        <div className="row gy-4">
          {products.length === 0 ? (
            <h5 className="text-center">No Data Found</h5>
          ) : (
            products.map((item) => (
              <div className="col-md-4" key={item.id}>
                <div className="product-card">
                  <span className="category">{item.category_name}</span>

                  <div className="d-flex align-items-center mt-3">
                    <div className="img-box">
                      <img
                        src={getImageUrl(item.file_name)}
                        alt={item.title}
                        onError={(e) => {
                          e.target.onerror = null; // prevent infinite loop
                          e.target.src = "/placeholder-image.png"; // fallback image
                        }}
                      />
                    </div>

                    <div className="ms-3">
                      <h6>{item.title}</h6>
                      <a href="#" className="view-link">
                        View →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestProduct;