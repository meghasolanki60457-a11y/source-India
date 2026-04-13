import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Product2 = () => {
  const { id } = useParams(); // (id रहेगा but use नहीं होगा)
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const imgBase = "https://react-live.sourceindia-electronics.com/v1/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ DIRECT DETAILS API (UPDATED)
        const res = await axios.get(
          "https://react-live.sourceindia-electronics.com/v1/api/products/details/telematics-control-unit-tcu-2g"
        );

        const data = res.data.data || res.data;

        console.log("FINAL DATA:", data);

        setProduct(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  if (!product) {
    return <div className="p-5 text-center">Loading...</div>;
  }

  return (
    <div className="container-fluid bg-light product-page">

      {/* BREADCRUMB */}
      <div className="container py-2 small text-muted">
        Home / Products / {product.title}
      </div>

      <div className="container">
        <div className="row g-3">

          {/* LEFT */}
          <div className="col-lg-8">

            {/* PRODUCT CARD */}
            <div className="card p-3 shadow-sm border-0">
              <div className="row">

                <div className="col-md-3">
                  <img
                    src={imgBase + product.file_name}
                    className="product-img"
                    alt=""
                  />
                </div>

                <div className="col-md-9">
                  <h4>{product.title}</h4>

                  <p><b>Category:</b> {product.category_name}</p>
                  <p><b>Sub Category:</b> {product.sub_category_name}</p>
                  <p><b>Item Category:</b> {product.item_category_name}</p>
                  <p><b>Item Sub Category:</b> {product.item_subcategory_name}</p>
                </div>

              </div>
            </div>

            {/* ✅ RECOMMENDED PRODUCTS */}
            <div className="mt-3">
              <h6>Recommended Products</h6>

              <div className="row g-3">
                {product.similar_products?.map((item) => (
                  <div className="col-md-3 col-6" key={item.id}>

                    <div
                      className="card p-3 text-center h-100 shadow-sm"
                      style={{ minHeight: "220px" }}
                    >

                      {/* IMAGE */}
                      <div style={{ height: "120px" }}>
                        <img
                          src={imgBase + item.file_name}
                          alt=""
                          style={{
                            maxHeight: "100%",
                            maxWidth: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </div>

                      {/* TITLE */}
                      <p className="fw-semibold small mt-2 mb-2">
                        {item.title}
                      </p>

                      {/* BUTTON */}
                      <button
                        className="btn btn-primary btn-sm mt-auto"
                        onClick={() => navigate(`/product/${item.id}`)}
                      >
                        View →
                      </button>

                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* 🔥 RECOMMENDED COMPANIES */}
            <div className="mt-4">
              <h5 className="fw-bold mb-3">Recommended Companies</h5>

              <div className="row g-3">
                {product.recommended_companies?.slice(0, 8).map((company) => (
                  <div className="col-md-3 col-6" key={company.id}>

                    <div className="card text-center p-3 h-100 shadow-sm">

                      <img
                        src={
                          company.company_logo_file
                            ? imgBase + company.company_logo_file
                            : "https://via.placeholder.com/80"
                        }
                        alt=""
                        style={{
                          height: "80px",
                          objectFit: "contain",
                          marginBottom: "10px",
                        }}
                      />

                      <p className="fw-semibold small">
                        {company.organization_name || "No Company"}
                      </p>

                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div className="col-lg-4">

            <div className="card p-3 text-center shadow-sm">

              <img
                src={imgBase + product.company_logo}
                className="company-img"
                alt=""
              />

              <h6>{product.company_name}</h6>
              <small>{product.company_location}</small>

              <hr />

              <p><b>Activity:</b> {product.activity_name}</p>
              <p><b>Core Activity:</b> {product.core_activity_name}</p>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Product2;