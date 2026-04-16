import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Productdetail = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("product");
  const [mainImage, setMainImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const BASE_URL = "https://react-live.sourceindia-electronics.com/";
  const DEFAULT_IMG =
    "https://sourceindia-electronics.com/default.png";

  // ✅ FINAL IMAGE FUNCTION (PRODUCT + COMPANY FIX)
  const getImageUrl = (img) => {
    if (!img) return DEFAULT_IMG;

    // object handling
    if (typeof img === "object") {
      img =
        img.file_name ||
        img.image ||
        img.url ||
        "";
    }

    if (!img) return DEFAULT_IMG;

    // already full URL
    if (img.startsWith("http")) return img;

    // remove starting slash
    img = img.replace(/^\/+/, "");

    // 🔥 IMPORTANT FIX FOR COMPANY LOGO
    if (img.startsWith("upload/")) {
      return BASE_URL + "v1/" + img;
    }

    return BASE_URL + img;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axios.get(
          `${BASE_URL}v1/api/products/details/${slug}`
        );

        const data1 =
          res1.data?.data?.product ||
          res1.data?.data ||
          res1.data;

        const res2 = await axios.get(
          `${BASE_URL}v1/api/products/${data1.id}`
        );

        const data2 =
          res2.data?.data?.product ||
          res2.data?.data ||
          res2.data;

        const merged = {
          ...data2,
          ...data1,
          images:
            data1.images?.length > 0
              ? data1.images
              : data2.images || [],
        };

        setProduct(merged);

        let firstImg = "";

        if (merged.file_name) {
          firstImg = merged.file_name;
        } else if (merged.images?.length) {
          firstImg = merged.images[0];
        }

        setMainImage(getImageUrl(firstImg));
        setCurrentIndex(0);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [slug]);

  // SLIDER
  const handleNext = () => {
    if (!product?.images?.length) return;

    const next =
      (currentIndex + 1) % product.images.length;

    setCurrentIndex(next);
    setMainImage(getImageUrl(product.images[next]));
  };

  const handlePrev = () => {
    if (!product?.images?.length) return;

    const prev =
      (currentIndex - 1 + product.images.length) %
      product.images.length;

    setCurrentIndex(prev);
    setMainImage(getImageUrl(product.images[prev]));
  };

  if (!product)
    return <div className="text-center p-5">Loading...</div>;

  return (
    <div className="container my-4">

      <div className="row bg-white p-4 rounded shadow-sm">

        {/* IMAGE */}
        <div className="col-md-4 text-center">
          <div className="position-relative">

            <img
              src={mainImage}
              className="img-fluid"
              style={{
                height: 260,
                objectFit: "contain",
                width: "100%",
              }}
              alt=""
              onError={(e) => {
                e.target.src = DEFAULT_IMG;
              }}
            />

            <button onClick={handlePrev}>❮</button>
            <button onClick={handleNext}>❯</button>

          </div>

          {/* THUMBNAILS */}
          <div className="d-flex gap-2 mt-3 justify-content-center flex-wrap">

            {product.images?.map((img, i) => (
              <img
                key={i}
                src={getImageUrl(img)}
                onClick={() => {
                  setMainImage(getImageUrl(img));
                  setCurrentIndex(i);
                }}
                style={{
                  width: 60,
                  height: 60,
                  objectFit: "contain",
                  border: "1px solid #ddd",
                  cursor: "pointer",
                }}
                alt=""
                onError={(e) => {
                  e.target.src = DEFAULT_IMG;
                }}
              />
            ))}

          </div>
        </div>

        {/* INFO */}
        <div className="col-md-5">
          <h3>{product.title}</h3>

          <p><b>Category:</b> {product.category_name}</p>
          <p><b>Sub Category:</b> {product.sub_category_name}</p>
          <p><b>Item Category:</b> {product.item_category_name}</p>
          <p><b>Item Type:</b> {product.item_subcategory_name}</p>

          <p className="text-muted">
            {product.short_description}
          </p>

          <button className="btn btn-warning">
            Enquiry
          </button>
        </div>

        {/* COMPANY */}
        <div className="col-md-3 text-center">
          <div className="border p-3 rounded">

            {/* ✅ COMPANY LOGO FINAL FIX */}
            {product.company_logo && (
              <img
                src={getImageUrl(product.company_logo)}
                style={{ width: 80 }}
                alt=""
                onError={(e) => {
                  e.target.src = DEFAULT_IMG;
                }}
              />
            )}

            <h6>{product.company_name}</h6>

            <p className="small text-muted">
              {product.company_location}
            </p>

            <hr />

            <p><b>Nature:</b> Manufacturing</p>
            <p>
              <b>Core Activity:</b>{" "}
              {product.core_activity_name}
            </p>

          </div>
        </div>

      </div>

      {/* TABS */}
      <div className="bg-white mt-4 p-3">

        <div className="d-flex gap-3 border-bottom">

          <button onClick={() => setActiveTab("product")}>
            Product Details
          </button>

          <button onClick={() => setActiveTab("company")}>
            Company
          </button>

          <button onClick={() => setActiveTab("reviews")}>
            Reviews
          </button>

        </div>

        <div className="mt-3">

          {activeTab === "product" && (
            <div
              dangerouslySetInnerHTML={{
                __html:
                  product.description ||
                  product.organizations_product_description ||
                  "No description",
              }}
            />
          )}

         {activeTab === "company" && (
  <div className="p-3">

    {/* COMPANY HEADER */}
    <div className="d-flex align-items-center gap-3 mb-3">

      <img
        src={getImageUrl(product.company_logo)}
        alt=""
        style={{
          width: 80,
          height: 80,
          objectFit: "contain",
          border: "1px solid #ddd",
          padding: 5,
        }}
        onError={(e) => {
          e.target.src =
            "https://sourceindia-electronics.com/default.png";
        }}
      />

      <div>
        <h5 className="mb-1">{product.company_name}</h5>
        <p className="text-muted mb-0">
          {product.company_location}
        </p>
        <small className="text-muted">
          {product.company_slug}
        </small>
      </div>

    </div>

    <hr />

    {/* DETAILS GRID */}
    <div className="row">

      <div className="col-md-6">
        <p><b>Core Activity:</b> {product.core_activity_name}</p>
        <p><b>Activity:</b> {product.activity_name}</p>
        <p><b>Category:</b> {product.category_name}</p>
        <p><b>Sub Category:</b> {product.sub_category_name}</p>
      </div>

      <div className="col-md-6">
        <p><b>Created At:</b> {product.created_at?.split("T")[0]}</p>
        <p><b>Company Type:</b> {product.core_activity_name}</p>
      </div>

    </div>

    <hr />

    {/* BRIEF COMPANY DESCRIPTION */}
    <div>
      <h6>About Company</h6>
      <div
        dangerouslySetInnerHTML={{
          __html: product.brief_company,
        }}
      />
    </div>

    <hr />

    {/* FULL DESCRIPTION (ORIGINAL STYLE) */}
    <div>
      <h6>Product Description</h6>
      <div
        dangerouslySetInnerHTML={{
          __html:
            product.organizations_product_description ||
            product.description,
        }}
      />
    </div>

  </div>
)}
          {activeTab === "reviews" && (
            <p>No reviews</p>
          )}

        </div>

      </div>

    </div>
  );
};

export default Productdetail;