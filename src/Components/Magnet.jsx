import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FerritesMagnets = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "https://react-live.sourceindia-electronics.com/v1/api/categories/item-category?slug=ferrites-magnets&page=1&limit=8"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("API RESPONSE:", data);

        setCategories(data?.subcategory?.item_categories || []);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      {/* Title */}
      <h3 className="mb-4">Ferrites/Magnets</h3>

      {categories.map((section, index) => (
        <div key={index} className="section-box mb-4">

          {/* Section Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="section-title">
              {section.name} ({section.product_count})
            </h5>

            {/* ✅ ARROW CLICK FIX */}
            <span
              className="arrow"
              style={{ cursor: "pointer", fontSize: "18px", fontWeight: "bold" }}
              onClick={() => {
                if (section?.slug) {
                  navigate(`/category/${section.slug}`);
                } else {
                  console.log("Slug missing:", section);
                }
              }}
            >
              →
            </span>
          </div>

          {/* Cards */}
          <div className="row">
            {section.items.map((item, i) => (
              <div key={i} className="col-md-3 mb-3">
                <div className="card custom-card text-center p-3">

                  {/* Image */}
                  <img
                    src={
                      item.file_name
                        ? `http://sourceindia-electronics.com/${item.file_name}`
                        : "http://sourceindia-electronics.com/default.png"
                    }
                    alt={item.name}
                    className="card-img mb-2"
                  />

                  {/* Title */}
                  <a href="#" className="card-title">
                    {item.name}
                  </a>

                  {/* Count */}
                  <div className="count">
                    ({item.product_count})
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
};

export default FerritesMagnets;