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

      <h3 className="mb-4">Ferrites/Magnets</h3>

      {categories.map((section) => (
        <div key={section.id} className="section-box mb-4">

          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center mb-3">

            <h5>
              {section.name} ({section.product_count})
            </h5>

            {/* 🔥 FINAL ARROW FIX */}
            <span
              style={{
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#0d6efd",
              }}
              onClick={() =>
                navigate(
                  `/products?category_id=1&subcategory_id=20&item_category_id=${section.id}`
                )
              }
            >
              →
            </span>

          </div>

          {/* CARDS */}
          <div className="row">

            {section.items?.map((item) => (
              <div key={item.id} className="col-md-3 mb-3">

                <div className="card text-center p-3">

                  <img
                    src={
                      item.file_name
                        ? `https://react-live.sourceindia-electronics.com/${item.file_name}`
                        : "https://sourceindia-electronics.com/default.png"
                    }
                    alt={item.name}
                    className="img-fluid mb-2"
                  />

                  <h6>{item.name}</h6>

                  <small className="text-muted">
                    ({item.product_count})
                  </small>

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