import React, { useEffect, useState } from "react";

const AutomotiveSection = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      "https://react-live.sourceindia-electronics.com/v1/api/categories/item-category?slug=automotive-components&page=1&limit=8"
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("API RESPONSE 👉", res);
        setData(res.subcategory); // ✅ correct path
      })
      .catch((err) => console.log(err));
  }, []);

  // 🔄 Loading state
  if (!data) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="container py-4">

      {/* 🔹 Breadcrumb */}
      <p className="text-muted">
        Home / Categories / {data.category?.name} /{" "}
        <span className="text-primary">{data.name}</span>
      </p>

      {/* 🔹 Heading */}
      <h3 className="fw-bold mb-4">{data.name}</h3>

      {/* 🔥 Categories Loop */}
      {data.item_categories?.map((category) => (
        <div key={category.id} className="card p-3 mb-4 shadow-sm">

          {/* 🔹 Category Title */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="text-primary fw-bold">
              {category.name} ({category.product_count})
            </h5>
            <span style={{ cursor: "pointer" }}>→</span>
          </div>

          {/* 🔹 Items */}
          <div className="row g-3">

            {category.items?.map((item) => (
              <div key={item.id} className="col-md-3">
                <div className="border rounded p-2 text-center h-100">

                  {/* ✅ IMAGE (FIXED) */}
          <img
  src={`https://react-live.sourceindia-electronics.com/v1/${item.file_name}`}
  alt={item.name}
  className="img-fluid mb-2"
/>

                  {/* ✅ NAME */}
                  <p className="fw-semibold small mb-1">
                    {item.name}
                  </p>

                  {/* ✅ COUNT */}
                  <span className="text-success">
                    ({item.product_count})
                  </span>

                </div>
              </div>
            ))}

          </div>
        </div>
      ))}

    </div>
  );
};

export default AutomotiveSection;