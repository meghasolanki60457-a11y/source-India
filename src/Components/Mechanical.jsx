import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Mechanical = () => {
  const [data, setData] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [subcategoryId, setSubcategoryId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "https://react-live.sourceindia-electronics.com/v1/api/categories/item-category?slug=electromechanical&page=1&limit=8"
    )
      .then((res) => res.json())
      .then((result) => {
        const sub = result?.subcategory;

        setCategoryId(sub?.category?.id);
        setSubcategoryId(sub?.id);
        setData(sub?.item_categories || []);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-4">Electromechanical</h2>

      {data.map((section) => (
        <div key={section.id} className="mb-5">

          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center mb-3">

            <h5>
              {section.name} ({section.product_count})
            </h5>

            {/* ✅ FINAL FIXED URL (COPY-PASTE READY) */}
            <span
              style={{
                cursor: "pointer",
                fontSize: "20px",
                fontWeight: "bold",
                color: "#0d6efd",
              }}
             onClick={() =>
  navigate(
    `/products?type=quality&category_id=${categoryId}&subcategory_id=${subcategoryId}&item_category_id=${section.id}`
  )
}
            >
              →
            </span>

          </div>

          {/* ITEMS */}
          <div className="row">
            {section.items?.map((item) => (
              <div className="col-lg-2 col-md-3 col-sm-6 mb-4" key={item.id}>
                <div className="card p-3 text-center shadow-sm">

                  <img
                    src={
                      item.file_name
                        ? `https://react-live.sourceindia-electronics.com/${item.file_name}`
                        : "https://sourceindia-electronics.com/default.png"
                    }
                    alt={item.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "contain",
                    }}
                  />

                  <h6 style={{ fontSize: "14px" }}>
                    {item.name}
                  </h6>

                  <p className="text-muted">
                    ({item.product_count})
                  </p>

                </div>
              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
};

export default Mechanical;