import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Compound = () => {
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  const BASE_URL = "https://react-live.sourceindia-electronics.com/v1";

  // ✅ SLUG FUNCTION
  const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  };

  useEffect(() => {
    fetch(
      "https://react-live.sourceindia-electronics.com/v1/api/categories/category-item?is_delete=0&status=1&limit=50&is_home=1"
    )
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : data?.data || data?.result || [];

        const selected = list[0];

        if (!selected) return;

        setCategory({
          id: selected.id,
          name: selected.name,
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

              // ✅ THIRD LEVEL (item_categories)
              sub_categories:
                sub.item_categories?.map((item) => ({
                  id: item.id,
                  name: item.name,
                })) || [],
            })) || [],
        });
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
            <img src={category.image} alt={category.name} width="100%" />
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-8">
            <h2 className="fw-bold mb-4">{category.name}</h2>

            <div className="row gy-4">
              {category.subcategories.map((item) => (
                <div className="col-md-6" key={item.id}>
                  <div className="category-card p-3 bg-white shadow-sm">

                    {/* SUBCATEGORY HEADER */}
                    <div className="d-flex justify-content-between align-items-center">
                      <h5>{item.name}</h5>

                      <FaArrowRight
                        onClick={() =>
                          navigate(
                            `/category/${createSlug(item.name)}`,
                            { state: { id: item.id } }
                          )
                        }
                        style={{ cursor: "pointer" }}
                      />
                    </div>

                    {/* ✅ ITEM CATEGORIES LIST */}
                    <ul className="mt-3 ps-3">
                      {item.sub_categories.map((sub) => (
                        <li key={sub.id} style={{ fontSize: "14px" }}>
                          {sub.name}
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
    </section>
  );
};

export default Compound;