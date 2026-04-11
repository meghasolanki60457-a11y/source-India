import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductPage1 = () => {
  const [productSlug, setProductSlug] = useState(null);
  const [productById, setProductById] = useState(null);

  useEffect(() => {
    // 🔥 API 1 (slug/details API)
    axios
      .get(
        "https://react-live.sourceindia-electronics.com/v1/api/products/details/telematics-control-unit-tcu-2gye"
      )
      .then((res) => setProductSlug(res.data))
      .catch((err) => console.log(err));

    // 🔥 API 2 (ID API)
    axios
      .get("https://react-live.sourceindia-electronics.com/v1/api/products/1098")
      .then((res) => setProductById(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!productSlug) {
    return <div className="p-5 text-center">Loading...</div>;
  }

  // primary product
  const product = productSlug;

  // secondary product
  const extra = productById || {};

  const imgBase = "https://react-live.sourceindia-electronics.com/v1/";

  return (
    <div className="container p-4">

      <h2>{product.title}</h2>

      <p>
        <b>Category:</b> {product.category_name}
      </p>

      <p>
        <b>Sub Category:</b> {product.sub_category_name}
      </p>

      {/* 🔥 DATA FROM SECOND API */}
      <hr />

      <h4>Extra API Data</h4>

      <p>
        <b>ID:</b> {extra?.id}
      </p>

      <p>
        <b>Company:</b> {extra?.company_name || product.company_name}
      </p>

      <p>
        <b>Description:</b>{" "}
        {extra?.description ||
          product.description ||
          product.short_description}
      </p>

      {/* IMAGE (fallback logic) */}
      <img
        src={imgBase + (product.file_name || extra?.file_name)}
        alt="product"
        width="200"
      />

    </div>
  );
};

export default ProductPage1;