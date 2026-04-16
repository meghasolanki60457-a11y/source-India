import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const Productdetail = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const BASE_URL = "https://react-live.sourceindia-electronics.com/";
  const DEFAULT_IMG =
    "https://sourceindia-electronics.com/default.png";

  // ✅ IMAGE FIX (WORKS FOR ALL TYPES)
  const getImageUrl = (img) => {
    if (!img) return DEFAULT_IMG;

    if (typeof img === "object") {
      img = img.file_name || img.file || img.image || img.url || "";
    }

    if (!img) return DEFAULT_IMG;

    if (img.startsWith("http")) return img;

    img = img.replace(/^\/+/, "");

    if (img.startsWith("upload/")) {
      return BASE_URL + "v1/" + img;
    }

    return BASE_URL + "v1/" + img;
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

        // ================= SAFE MERGE =================
        const merged = {
          ...data2,
          ...data1,
        };

        // ================= IMAGE FIX (MAIN + ARRAY) =================
        const mainImage = data1?.file_name || data2?.file_name;

        const imagesFromAPI =
          data1?.images?.length > 0
            ? data1.images
            : data2?.images?.length > 0
            ? data2.images
            : [];

        // 🔥 normalize images (file / file_name support)
        const images = [
          mainImage,
          ...imagesFromAPI.map((img) => img.file || img.file_name),
        ].filter(Boolean);

        setProduct({
          ...merged,
          images,
        });
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

      <div className="row bg-white p-4 rounded shadow-sm">

        {/* ================= IMAGE SLIDER ================= */}
        <div className="col-md-4 text-center">

          {/* MAIN SWIPER */}
          <Swiper
            modules={[Navigation, Thumbs]}
            navigation
            thumbs={
              thumbsSwiper
                ? { swiper: thumbsSwiper }
                : undefined
            }
          >
            {(product.images || []).map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={getImageUrl(img)}
                  alt=""
                  style={{
                    width: "100%",
                    height: 260,
                    objectFit: "contain",
                  }}
                  onError={(e) => {
                    e.target.src = DEFAULT_IMG;
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* THUMBNAILS */}
          <Swiper
            onSwiper={(swiper) => setThumbsSwiper(swiper)}
            spaceBetween={10}
            slidesPerView={4}
            watchSlidesProgress
            className="mt-3"
          >
            {(product.images || []).map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={getImageUrl(img)}
                  alt=""
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "contain",
                    border: "1px solid #ddd",
                    cursor: "pointer",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>

        </div>

        {/* ================= PRODUCT INFO (UNCHANGED) ================= */}
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

        {/* ================= COMPANY INFO (UNCHANGED) ================= */}
        <div className="col-md-3 text-center">

          <div className="border p-3 rounded">

            {product.company_logo && (
              <img
                src={getImageUrl(product.company_logo)}
                style={{ width: 80 }}
                alt=""
              />
            )}

            <h6>{product.company_name}</h6>

            <p className="small text-muted">
              {product.company_location}
            </p>

            <hr />

            <p><b>Core Activity:</b> {product.core_activity_name}</p>
            <p><b>Activity:</b> {product.activity_name}</p>

          </div>

        </div>

      </div>

      {/* ================= TABS (UNCHANGED) ================= */}
      <div className="bg-white mt-4 p-3">

        <div className="d-flex gap-3 border-bottom">

          <button>Product Details</button>
          <button>Company</button>
          <button>Reviews</button>

        </div>

        <div className="mt-3">

          <div
            dangerouslySetInnerHTML={{
              __html:
                product.description ||
                product.organizations_product_description ||
                "No description",
            }}
          />

        </div>

      </div>

    </div>
  );
};

export default Productdetail;