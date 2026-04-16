import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Compound = () => {
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  const BASE_URL = "https://react-live.sourceindia-electronics.com/v1/";

  // slug generator
  const createSlug = (text) =>
    text
      ?.toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");

  useEffect(() => {
    fetch(
      "https://react-live.sourceindia-electronics.com/v1/api/categories/category-item?is_delete=0&status=1&limit=50&is_home=1"
    )
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : data?.data || data?.result || [];

        setCategory(list?.[0] || null);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!category) return <h4 className="container">Loading...</h4>;

  return (
    <section className="category-section py-5">
      <div className="container">
        <div className="row gy-4">

          {/* LEFT IMAGE */}
          <div className="col-lg-4">
            <img
              src={BASE_URL + category.file_name}
              alt={category.name}
              className="img-fluid"
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-8">
            <h2 className="fw-bold mb-4">{category.name}</h2>

            <div className="row gy-4">
              {category.subcategories?.map((item) => (
                <div className="col-md-6" key={item.id}>
                  <div className="p-3 shadow-sm d-flex justify-content-between">

                    <div>
                      <h6 className="fw-bold d-flex align-items-center gap-2">

                        {item.name}

                        {/* ✅ ARROW CLICK */}
                      <FaArrowRight
  style={{ cursor: "pointer" }}
  onClick={() =>
    navigate(`/categories/components/${createSlug(item.name)}`)
  }
/>
                      </h6>

                      <ul className="ps-3 mb-0">
                        {item.item_categories?.map((sub) => (
                          <li key={sub.id}>{sub.name}</li>
                        ))}
                      </ul>
                    </div>

                    <img
                      src={BASE_URL + item.file_name}
                      alt={item.name}
                      style={{ width: "80px" }}
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