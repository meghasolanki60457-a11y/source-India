import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Productdetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("product");
  const [mainImage, setMainImage] = useState("");

  const imgBase =
    "https://react-live.sourceindia-electronics.com/v1/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // STEP 1: DETAILS API (MAIN DATA)
        const res1 = await axios.get(
          `https://react-live.sourceindia-electronics.com/v1/api/products/details/${slug}`
        );

        const data1 =
          res1.data?.data?.product || res1.data?.data || res1.data;

        // STEP 2: FULL PRODUCT API (ADDITIONAL DATA)
        const res2 = await axios.get(
          `https://react-live.sourceindia-electronics.com/v1/api/products/${data1.id}`
        );

        const data2 =
          res2.data?.data?.product || res2.data?.data || res2.data;

        // 🔥 FINAL SAFE MERGE (NO LOSS)
        const merged = {
          ...data2,
          ...data1,

          // PRODUCT INFO
          category_name:
            data1.category_name || data2.category_name,

          sub_category_name:
            data1.sub_category_name || data2.sub_category_name,

          item_category_name:
            data1.item_category_name || data2.item_category_name,

          item_subcategory_name:
            data1.item_subcategory_name ||
            data2.item_subcategory_name,

          short_description:
            data1.short_description ||
            data2.short_description,

          description:
            data1.description || data2.description,

          organizations_product_description:
            data1.organizations_product_description ||
            data2.organizations_product_description,

          // COMPANY (FOR SIDEBAR LIKE YOUR IMAGE)
          company_name:
            data1.company_name || data2.company_name,

          company_location:
            data1.company_location || data2.company_location,

          core_activity_name:
            data1.core_activity_name || data2.core_activity_name,

          brief_company:
            data1.brief_company || data2.brief_company,

          company_logo:
            data1.company_logo || data2.company_logo,

          // IMAGES
          images:
            data1.images?.length
              ? data1.images
              : data2.images || [],

          // SIMILAR PRODUCTS
          similar_products:
            data1.similar_products?.length
              ? data1.similar_products
              : data2.similar_products || [],

          // REVIEWS
          reviews:
            data1.reviews?.length
              ? data1.reviews
              : data2.reviews || [],
        };

        setProduct(merged);

        setMainImage(
          imgBase + (merged.file_name || merged.images?.[0])
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [slug]);

  if (!product)
    return <div className="text-center p-5">Loading...</div>;

  return (
    <div className="container my-4">

      {/* 🔥 TOP SECTION (LIKE YOUR IMAGE) */}
      <div className="row bg-white p-3 shadow-sm rounded">

        {/* LEFT IMAGE GALLERY */}
        <div className="col-md-4 text-center">

          <img
            src={mainImage}
            className="img-fluid"
            style={{ maxHeight: 320, objectFit: "contain" }}
            alt=""
          />

          <div className="d-flex gap-2 mt-2 justify-content-center">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={imgBase + img}
                onClick={() =>
                  setMainImage(imgBase + img)
                }
                style={{
                  width: 60,
                  height: 60,
                  border: "1px solid #ddd",
                  cursor: "pointer",
                  objectFit: "contain",
                }}
                alt=""
              />
            ))}
          </div>
        </div>

        {/* CENTER INFO */}
        <div className="col-md-5">

          <h3 className="fw-bold">{product.title}</h3>

          <p className="text-muted">
            {product.category_name} / {product.sub_category_name}
          </p>

          <p><b>Item Category:</b> {product.item_category_name}</p>

          <p><b>Item Type:</b> {product.item_subcategory_name}</p>

          {product.short_description && (
            <div className="mt-2 text-muted">
              {product.short_description}
            </div>
          )}

          <button className="btn btn-warning mt-3">
            Enquiry
          </button>
        </div>

        {/* 🔥 RIGHT COMPANY BOX (LIKE IMAGE SIDEBAR) */}
        <div className="col-md-3">

          <div className="border p-3 rounded text-center">

            {product.company_logo && (
              <img
                src={imgBase + product.company_logo}
                style={{ width: 80 }}
                alt=""
              />
            )}

            <h6 className="mt-2">{product.company_name}</h6>

            <p className="small text-muted">
              {product.company_location}
            </p>

            <p className="small">
              <b>Nature:</b> Manufacturing
            </p>

            <p className="small">
              <b>Core:</b> {product.core_activity_name}
            </p>

            <button className="btn btn-outline-primary btn-sm w-100">
              View Company Details
            </button>

          </div>

        </div>
      </div>

      {/* 🔥 TABS SECTION (BELOW) */}
      <div className="bg-white mt-4 p-3 rounded shadow-sm">

        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "product" && "active"}`}
              onClick={() => setActiveTab("product")}
            >
              Product Details
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "company" && "active"}`}
              onClick={() => setActiveTab("company")}
            >
              Company Details
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "reviews" && "active"}`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </li>
        </ul>

        <div className="mt-3">

          {/* PRODUCT */}
          {activeTab === "product" && (
            <div
              dangerouslySetInnerHTML={{
                __html:
                  product.organizations_product_description ||
                  product.description ||
                  "No description available",
              }}
            />
          )}

          {/* COMPANY */}
          {activeTab === "company" && (
            <div className="border p-3 rounded">

              <h5>{product.company_name}</h5>

              <p>{product.company_location}</p>

              <p>{product.brief_company}</p>

              <p>{product.core_activity_name}</p>

            </div>
          )}

          {/* REVIEWS */}
          {activeTab === "reviews" && (
            <>
              {product.reviews?.length ? (
                product.reviews.map((r, i) => (
                  <div key={i} className="border p-2 mb-2 rounded">
                    <b>{r.user_name}</b>
                    <p>{r.comment}</p>
                    <small>⭐ {r.rating}</small>
                  </div>
                ))
              ) : (
                <p>No reviews available</p>
              )}
            </>
          )}

        </div>
      </div>

    </div>
  );
};

export default Productdetail;