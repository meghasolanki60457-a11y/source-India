import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Compound = () => {
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  const BASE_URL = "https://react-live.sourceindia-electronics.com/v1/";

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

        setCategory(selected);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!category) return <h4 className="container">Loading...</h4>;

  return (
    <section className="category-section py-5">
      <div className="container">
        <div className="row gy-4">

          {/* LEFT IMAGE + BUTTON */}
          <div className="col-lg-4">
            <div className="big-card position-relative">

              <img
                src={BASE_URL + category.file_name}
                alt={category.name}
                className="img-fluid big-image"
              />

              <button className="btn btn-danger view-btn">
                View All →
              </button>

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-8">
            <h2 className="fw-bold mb-4">{category.name}</h2>

            <div className="row gy-4">
              {category.subcategories
                ?.filter(Boolean)
                .map((item) => (
                  <div className="col-md-6" key={item.id}>
                    <div className="category-card d-flex justify-content-between align-items-start p-3 bg-white shadow-sm">

                      {/* LEFT TEXT */}
                      <div style={{ width: "65%" }}>
                        <div className="d-flex align-items-center mb-2">
                          <h6 className="fw-bold mb-0">{item.name}</h6>

                          {/* ✅ FIXED CLICK */}
                          <FaArrowRight
                            className="ms-2"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              navigate(`/category/${createSlug(item.name)}`, {
                                state: { id: item.id },
                              })
                            }
                          />
                        </div>

                        <ul className="ps-3 mb-0 sub-list">
                          {item.item_categories?.map((sub) => (
                            <li key={sub.id}>{sub.name}</li>
                          ))}
                        </ul>
                      </div>

                      {/* RIGHT IMAGE */}
                      <div style={{ width: "30%", textAlign: "right" }}>
                        <img
                          src={BASE_URL + item.file_name}
                          alt={item.name}
                          style={{
                            maxHeight: "100px",
                            width: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </div>

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