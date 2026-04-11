import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Productdetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const imgBase = "https://react-live.sourceindia-electronics.com/v1/";

  useEffect(() => {
    axios
      .get(`https://react-live.sourceindia-electronics.com/v1/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

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

          {/* LEFT SIDE */}
          <div className="col-lg-8">

            {/* PRODUCT CARD */}
            <div className="card p-3 shadow-sm border-0">
              <div className="row">

                <div className="col-md-3">
                  <img
                    src={imgBase + product.file_name}
                    className="product-img"
                    alt="product"
                  />
                </div>

                <div className="col-md-9">

                  <h4>{product.title}</h4>

                  <p><b>Category:</b> {product.category_name}</p>
                  <p><b>Sub Category:</b> {product.sub_category_name}</p>
                  <p><b>Item Category:</b> {product.item_category_name}</p>
                  <p><b>Item Sub Category:</b> {product.item_subcategory_name}</p>

                  <button className="btn enquiry-btn">
                    Enquiry
                  </button>

                </div>

              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="card mt-3 p-3 shadow-sm">
              <h6>Product Details</h6>
              <p>
                {product.description || product.short_description}
              </p>
            </div>

            {/* SIMILAR PRODUCTS */}
            <div className="mt-3">
              <h6>Similar Products</h6>

              <div className="row g-3">

                {product.similar_products?.slice(0, 4).map((item) => (
                  <div className="col-6 col-md-3" key={item.id}>
                    <div className="card p-2 text-center h-100">

                      <img
                        src={imgBase + item.file_name}
                        className="sim-img"
                        alt=""
                      />

                      <p className="small mb-1">{item.title}</p>

                      <button className="btn btn-sm view-btn">
                        View
                      </button>

                    </div>
                  </div>
                ))}

              </div>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-4">

            {/* COMPANY CARD */}
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

              <button className="btn company-btn">
                View Company
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Productdetail;