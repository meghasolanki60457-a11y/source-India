import React, { useEffect, useState } from "react";

const Mechanical = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      "https://react-live.sourceindia-electronics.com/v1/api/categories/item-category?slug=electromechanical&page=1&limit=8"
    )
      .then((res) => res.json())
      .then((result) => {
        console.log("FULL API:", result);

        setData(result?.subcategory?.item_categories || []);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-4">Electromechanical</h2>

      {data.map((section) => (
        <div key={section.id} className="mb-5">

          {/* MAIN CATEGORY TITLE */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>
              {section.name} ({section.product_count})
            </h5>
            <span>→</span>
          </div>

          {/* IF NO ITEMS */}
          {section.items.length === 0 ? (
            <p className="text-muted">No items found.</p>
          ) : (
            <div className="row">
              {section.items.map((item) => (
                <div
                  className="col-lg-2 col-md-3 col-sm-6 mb-4"
                  key={item.id}
                >
                  <div className="card p-3 text-center shadow-sm">

                    {/* IMAGE */}
                    <div style={{ height: "60px", marginBottom: "10px" }}>
                      {item.file_name ? (
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
  onError={(e) => {
    e.target.src = "https://sourceindia-electronics.com/default.png";
  }}
/>
                      ) : (
                        <div>SI</div>
                      )}
                    </div>

                    {/* NAME */}
                    <h6 style={{ fontSize: "14px" }}>
                      {item.name}
                    </h6>

                    {/* COUNT */}
                    <p className="text-muted">
                      ({item.product_count})
                    </p>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Mechanical;