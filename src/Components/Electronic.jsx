import React, { useEffect, useState } from "react";

const Services = () => {
  const [emsCategory, setEmsCategory] = useState(null);
  const baseUrl = "https://react-live.sourceindia-electronics.com/v1/";

  useEffect(() => {
    fetch(
      "https://react-live.sourceindia-electronics.com/v1/api/categories/category-item?is_delete=0&status=1&limit=6&is_home=1"
    )
      .then((res) => res.json())
      .then((data) => {
        // "Electronic Manufacturing Services" category dhundo
        const emsCat = data.find(
          (cat) => cat.name === "Electronic Manufacturing Services"
        );
        setEmsCategory(emsCat);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!emsCategory) return null; // data load hone tak render mat karo

  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4">{emsCategory.name}</h2>

      <div className="row gy-4">
        {/* LEFT BIG CARD */}
        <div className="col-lg-4">
          <div className="big-card">
            <img
              src={baseUrl + emsCategory.file_name} // yahi API ka main category image
              alt={emsCategory.name}
              className="img-fluid rounded"
            />
            <button className="btn btn-danger view-btn ms-5">View All</button>
          </div>
        </div>

        {/* RIGHT GRID */}
        <div className="col-lg-8">
          <div className="row gy-4">
            {emsCategory.subcategories.map((subcat) => (
              <div className="col-md-6" key={subcat.id}>
                <div className="service-card d-flex justify-content-between align-items-center p-3 rounded shadow-sm bg-white">
                  <div>
                    <h6 className="fw-bold mb-1">{subcat.name}</h6>
                    <p className="text-danger small mb-0">
                      {subcat.item_categories[0]?.name || ""}
                    </p>
                  </div>

                  <img
                    src={baseUrl + subcat.file_name} // subcategory ka image API se
                    alt={subcat.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
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
  );
};

export default Services;