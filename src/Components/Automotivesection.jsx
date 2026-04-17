import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AutomotiveSection = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "https://react-live.sourceindia-electronics.com/v1/api/categories/item-category?slug=automotive-components&page=1&limit=8"
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.subcategory);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!data) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  const handleOpen = (categoryId, subcategoryId, itemCategoryId) => {
    navigate(
      `/products?category_id=${categoryId}&subcategory_id=${subcategoryId}&item_category_id=${itemCategoryId}`
    );
  };

  return (
    <div className="container py-4">

      {/* Breadcrumb */}
      <p className="text-muted">
        Home / Categories / {data.category?.name} /{" "}
        <span className="text-primary">{data.name}</span>
      </p>

      {/* Heading */}
      <h3 className="fw-bold mb-3">{data.name}</h3>

      {/* CATEGORY SECTION */}
      {data.item_categories?.map((category) => {
        
        // ✅ filter + limit items per category
        const filteredItems = category.items
          ?.filter((item) => item.file_name)
          .slice(0, 4);

        // ❌ agar ek bhi valid item nahi hai to category hide kar do
        if (!filteredItems || filteredItems.length === 0) return null;

        return (
          <div key={category.id} className="card p-3 mb-4 shadow-sm">

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="text-primary fw-bold">
                {category.name} ({category.product_count})
              </h5>

              <span
                style={{ cursor: "pointer", fontSize: "20px" }}
                onClick={() =>
                  handleOpen(data.category?.id, data.id, category.id)
                }
              >
                →
              </span>
            </div>

            {/* Items */}
            <div className="row g-3">
              {filteredItems.map((item) => (
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
        );
      })}
    </div>
  );
};

export default AutomotiveSection;