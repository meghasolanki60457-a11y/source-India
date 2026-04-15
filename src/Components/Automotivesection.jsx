import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AutomotiveSection = () => {
  const [data, setData] = useState(null);
  const [products, setProducts] = useState([]); 
  const [total, setTotal] = useState(0); 
  const navigate = useNavigate();

  useEffect(() => {
    // ================= CATEGORY API (UNCHANGED) =================
    fetch(
      "https://react-live.sourceindia-electronics.com/v1/api/categories/item-category?slug=automotive-components&page=1&limit=8"
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.subcategory);
      })
      .catch((err) => console.log(err));

    // ❌ PRODUCTS API REMOVED
    setProducts([]);
    setTotal(0);

  }, []);

  if (!data) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  const handleOpen = (slug) => {
    navigate(`/category/${slug}`);
  };

  return (
    <div className="container py-4">

      {/* 🔹 Breadcrumb */}
      <p className="text-muted">
        Home / Categories / {data.category?.name} /{" "}
        <span className="text-primary">{data.name}</span>
      </p>

      {/* 🔹 Heading */}
      <h3 className="fw-bold mb-3">{data.name}</h3>

      {/* ✅ TOPBAR */}
      <div className="mb-4 p-3 bg-light border rounded">
        <h6>Total Products: {total}</h6>
      </div>

      {/* 🔥 CATEGORY SECTION (UNCHANGED) */}
      {data.item_categories?.map((category) => (
        <div key={category.id} className="card p-3 mb-4 shadow-sm">

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="text-primary fw-bold">
              {category.name} ({category.product_count})
            </h5>

            <span
              style={{ cursor: "pointer", fontSize: "20px" }}
              onClick={() => handleOpen(category.slug)}
            >
              →
            </span>
          </div>

          <div className="row g-3">
            {category.items?.map((item) => (
              <div key={item.id} className="col-md-3">
                <div className="border rounded p-2 text-center h-100">

                  <img
                    src={`https://react-live.sourceindia-electronics.com/v1/${item.file_name}`}
                    alt={item.name}
                    className="img-fluid mb-2"
                  />

                  <p className="fw-semibold small mb-1">
                    {item.name}
                  </p>

                  <span className="text-success">
                    ({item.product_count})
                  </span>

                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* ❌ REMOVED "All Products" HEADING */}

      {/* ✅ PRODUCTS LIST (EMPTY BUT STRUCTURE SAME) */}
      <div className="row">
        {products.map((p) => (
          <div key={p.id} className="col-md-3 mb-3">
            <div className="card p-2 h-100">

              <img
                src={`https://react-live.sourceindia-electronics.com/v1/${p.file_name}`}
                alt={p.title}
                className="img-fluid"
              />

              <div className="mt-2">
                <h6 className="small">{p.title}</h6>

                <p className="small text-muted mb-0">
                  {p.company_name}
                </p>

                <p className="small text-muted mb-0">
                  {p.state_name}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ✅ ONLY PRODUCT NAMES LIST */}
      <h5 className="mt-5">All Product Names</h5>
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>

    </div>
  );
};

export default AutomotiveSection;