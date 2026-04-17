import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Circuit = () => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "https://react-live.sourceindia-electronics.com/v1/api/categories/item-category?slug=pcb&page=1&limit=8"
    )
      .then((res) => res.json())
      .then((data) => {
        setCategories(data?.subcategory?.item_categories || []);
        setTitle(data?.subcategory?.name || "");
      })
      .catch((err) => console.log(err));
  }, []);

  // ✅ ONLY CHANGE HERE (SAFE + SIMPLE)
  const handleArrowClick = (section) => {
    navigate(
      `/products?category_id=1&subcategory_id=20&item_category_id=${section.id}`
    );
  };

  return (
    <div className="container mt-4">

      <h3 className="mb-4">{title}</h3>

      {categories.map((section, index) => (
        <div key={index} className="section-box mb-4">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <h5 className="section-title">
              {section.name} ({section.product_count})
            </h5>

            {/* ✅ CLICK → PRODUCTS PAGE */}
            <span
              className="arrow"
              style={{ cursor: "pointer", fontSize: "20px" }}
              onClick={() => handleArrowClick(section)}
            >
              →
            </span>

          </div>

          <div className="row">
            {section.items?.map((item, i) => (
              <div key={i} className="col-md-3 col-sm-6 mb-3">
                <div className="card custom-card text-center p-3">

                  <img
                    src={
                      item.file_name
                        ? `https://react-live.sourceindia-electronics.com/v1/${item.file_name}`
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

export default Circuit;