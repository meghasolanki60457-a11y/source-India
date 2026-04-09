import React, { useEffect, useState } from "react";

const ProductSection = () => {
  const BASE_URL = "https://react-live.sourceindia-electronics.com";

  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetch(
      `${BASE_URL}/v1/api/categories/category-item?is_delete=0&status=1&limit=6&is_home=1`
    )
      .then((res) => res.json())
      .then((data) => {
        const list = data?.data || data?.result || data || [];
        const finished = list.find((item) => item.id === 3);
        setCategory(finished || null);
      })
      .catch((err) => console.log(err));
  }, []);

  // ✅ ONLY IMAGE FIX FUNCTION
  const getImage = (path) => {
    if (!path) return "/first.png";
    return `${BASE_URL}/v1/${path}`;
  };

  if (!category) return <h4 className="container">Loading...</h4>;

  return (
    <div className="container my-5">

      <h2 className="fw-bold mb-4">{category.name}</h2>

      <div className="row">

        {/* LEFT IMAGE */}
        <div className="col-md-4 mb-4">
          <img
            src={getImage(category.file_name)}
            alt={category.name}
            className="img-fluid rounded"
          />

          <button className="btn btn-primary mt-3">View All</button>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-8">
          <div className="row">

            {category.subcategories?.map((sub) => (
              <div className="col-md-6 mb-4" key={sub.id}>
                <div className="card p-3 shadow-sm">

                  {/* SUB CATEGORY IMAGE FIX */}
                  <img
                    src={getImage(sub.file_name)}
                    alt={sub.name}
                    className="img-fluid rounded mb-2"
                    style={{ height: "120px", objectFit: "cover" }}
                  />

                  <h5 className="fw-bold">{sub.name}</h5>

                  <ul className="list-unstyled mt-2">
                    {sub.item_categories?.map((item) => (
                      <li key={item.id} className="small text-muted">
                        • {item.name}
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductSection;