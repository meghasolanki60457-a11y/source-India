import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BuyerDetail = () => {
  const { slug } = useParams();

  const cleanSlug = slug?.toLowerCase()?.trim();

  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("SLUG:", cleanSlug);

  // ================= BUYER API =================
  useEffect(() => {
    if (!cleanSlug) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://react-live.sourceindia-electronics.com/v1/api/buyers?slug=${cleanSlug}`
        );

        const result = await res.json();

        console.log("BUYER API RESULT:", result);

        setData(result?.data || result || []);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cleanSlug]);

  // ================= CATEGORY API FIXED =================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `https://react-live.sourceindia-electronics.com/v1/api/categories?is_delete=0&status=1`
        );

        const result = await res.json();

        console.log("CATEGORY API RESULT:", result);

        // ✅ FIXED: multiple possible keys handle
        setCategories(result?.data || result?.categories || result || []);

      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container py-4">
      <div className="row">

        {/* ================= LEFT SIDEBAR ================= */}
        <div className="col-md-3 border-end">

          <h5>Item Categories</h5>

          <ul style={{ listStyle: "none", padding: 0 }}>
            {categories?.length > 0 ? (
              categories.map((cat, index) => (
                <li key={index} style={{ padding: "6px 0" }}>
                  {/* ✅ FIXED NAME HANDLING */}
                  {cat.name || cat.category_name || cat.title}
                </li>
              ))
            ) : (
              <p>No categories found</p>
            )}
          </ul>

        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="col-md-9">

          <h4>Slug: {cleanSlug}</h4>

          {/* LOADING */}
          {loading && <p>Loading...</p>}

          {/* DATA */}
          <div className="row">
            {data?.length > 0 ? (
              data.map((item, index) => (
                <div className="col-md-4 mb-3" key={index}>
                  <div className="card p-3">

                    <h6>{item.name || item.title}</h6>
                    <p>{item.description}</p>

                  </div>
                </div>
              ))
            ) : (
              !loading && <p>No data found</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default BuyerDetail;