import React, { useEffect, useState } from "react";

const Compound = () => {
  const [category, setCategory] = useState(null);

  const BASE_URL = "https://react-live.sourceindia-electronics.com/v1";

  useEffect(() => {
    fetch(
      "https://react-live.sourceindia-electronics.com/v1/api/categories/category-item?is_delete=0&status=1&limit=6&is_home=1"
    )
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : data?.data || data?.result || [];

        // ✅ ID = 6 FIXED
        const selected = list.find((item) => item.id === 6);

        if (!selected) return;

        const formatted = {
          id: selected.id,
          name: selected.name,

          // 🔥 MAIN IMAGE FIX (your required image)
          image: selected.file_name
            ? `${BASE_URL}/${selected.file_name}`
            : "/nine.png",

          subcategories:
            selected.subcategories?.map((sub) => ({
              id: sub.id,
              name: sub.name,

              image: sub.file_name
                ? `${BASE_URL}/${sub.file_name}`
                : "/nine.png",

              sub_categories:
                sub.item_categories?.map((item) => ({
                  id: item.id,
                  name: item.name,
                })) || [],
            })) || [],
        };

        setCategory(formatted);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!category) return <h4 className="container">Loading...</h4>;

  return (
    <section className="category-section py-5">
      <div className="container">

        <div className="row gy-4">

          {/* LEFT BIG IMAGE */}
          <div className="col-lg-4 position-relative">
            <div className="left-card">

              {/* ✅ YOUR REQUIRED IMAGE HERE */}
              <img
                src={category.image}
                alt={category.name}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />

              <button className="btn view-btn mt-3">
                View All
              </button>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-lg-8">

            {/* TITLE */}
            <h2 className="fw-bold mb-4">{category.name}</h2>

            <div className="row gy-4">

              {category.subcategories.map((item) => (
                <div className="col-md-6" key={item.id}>
                  <div className="category-card d-flex justify-content-between align-items-center p-3 rounded shadow-sm bg-white">

                    {/* TEXT */}
                    <div>
                      <h5 style={{ color: "#0d3b66" }}>
                        {item.name}
                      </h5>

                      <ul style={{ listStyle: "none", padding: 0 }}>
                        {item.sub_categories.slice(0, 4).map((sub) => (
                          <li
                            key={sub.id}
                            style={{ color: "#d4423e", fontSize: "14px" }}
                          >
                            {sub.name}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* SUB IMAGE */}
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(e) => (e.target.src = "/nine.png")}
                      style={{
                        width: "100px",
                        height: "70px",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Compound;