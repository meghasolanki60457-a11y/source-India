import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Display = () => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");

  const navigate = useNavigate(); // ✅ added

  useEffect(() => {
    fetch(
      "https://react-live.sourceindia-electronics.com/v1/api/categories/item-category?slug=optoelectronics-component&page=1&limit=8"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("API RESPONSE:", data);

        setCategories(data?.subcategory?.item_categories || []);
        setTitle(data?.subcategory?.name || "");
      })
      .catch((err) => console.log(err));
  }, []);

  // ✅ arrow click handler
  const handleArrowClick = (section) => {
    navigate(`/category/${section.id || section.slug || section.name}`);
  };

  return (
    <div className="container mt-4">

      {/* Title */}
      <h3 className="mb-4">{title}</h3>

      {categories.map((section, index) => (
        <div key={index} className="section-box mb-4">

          {/* Section Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            
            <h5 className="section-title">
              {section.name} ({section.product_count})
            </h5>

            {/* ✅ CLICKABLE ARROW */}
            <span
              className="arrow"
              style={{ cursor: "pointer", fontSize: "20px" }}
              onClick={() => handleArrowClick(section)}
            >
              →
            </span>

          </div>

          {/* Cards */}
          <div className="row">
            {section.items?.map((item, i) => (
              <div key={i} className="col-md-3 col-sm-6 mb-3">
                <div className="card custom-card text-center p-3">

                  <img
                    src={
                      item.file_name
                        ? `http://sourceindia-electronics.com/${item.file_name}`
                        : "http://sourceindia-electronics.com/default.png"
                    }
                    alt={item.name}
                    className="card-img mb-2"
                  />

                  <a href="#" className="card-title">
                    {item.name}
                  </a>

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

export default Display;