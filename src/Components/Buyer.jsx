import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Buyer = () => {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(false);

  const baseURL = "https://react-live.sourceindia-electronics.com/v1/";

  // ✅ SLUG FUNCTION (SAFE)
  const createSlug = (name) => {
    return name
      ?.toLowerCase()
      .replace(/&/g, "and")
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  };

  const fetchCompanies = async (pageNo = 1) => {
    setLoading(true);

    const res = await fetch(
      `${baseURL}api/products/companies?is_delete=0&status=1&limit=12&page=${pageNo}&is_seller=0`
    );

    const data = await res.json();
    const list = data?.companies || [];

    setCompanies((prev) =>
      pageNo === 1 ? list : [...prev, ...list]
    );

    if (list.length < 12) setHasMore(false);

    setLoading(false);
  };

  const fetchCategories = async () => {
    const res = await fetch(
      `${baseURL}api/categories?is_delete=0&status=1`
    );

    const data = await res.json();
    setCategories(data?.data || []);
  };

  useEffect(() => {
    fetchCompanies(1);
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (
        scrollTop + windowHeight >= fullHeight - 150 &&
        hasMore &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  useEffect(() => {
    if (page > 1) fetchCompanies(page);
  }, [page]);

  const getImage = (item) => {
    return item?.company_logo_file
      ? `${baseURL}${item.company_logo_file}`
      : "https://sourceindia-electronics.com/default.png";
  };

  return (
    <div className="container-fluid">
      <div className="row">

        {/* SIDEBAR SAME */}
        <div className="col-md-3">
          <div className="bg-primary text-white p-2 fw-bold">
            Company Name
          </div>

          <input className="form-control mb-3" placeholder="Search companies..." />

          <div className="bg-primary text-white p-2 fw-bold">
            Item Category
          </div>

          <div style={{ maxHeight: 450, overflowY: "auto", border: "1px solid #ddd", padding: 5 }}>
            {categories.map((cat) => (
              <div key={cat.id}>
                <input type="checkbox" /> {cat.name}
              </div>
            ))}
          </div>
        </div>

        {/* MAIN */}
        <div className="col-md-9">
          <div className="row">

            {companies.map((item) => (
              <div key={item.id} className="col-md-6 mb-3">

                <div className="border bg-white p-3 h-100">

                  <div className="d-flex gap-2">
                    <img
                      src={getImage(item)}
                      style={{ width: 70, height: 70, objectFit: "contain" }}
                    />

                    <div>
                      <h6>{item.organization_name}</h6>
                      <small>{item.company_location || "N/A"}</small>
                    </div>
                  </div>

                  <p className="mt-2 mb-2">
                    <b>Product:</b>{" "}
                    {item.products?.map((p) => p.title).join(", ") || "N/A"}
                  </p>

                  {/* 🔥 ONLY SLUG USED */}
                  <button
                    className="btn w-100"
                    style={{ background: "#ff6a00", color: "#fff" }}
                 onClick={() =>
  navigate(`/buyer/${createSlug(item.organization_name)}`, {
    replace: true,
    state: { slugOnly: true }
  })
}
                  >
                    Connect
                  </button>

                </div>
              </div>
            ))}

          </div>

          {loading && <p className="text-center">Loading...</p>}
        </div>

      </div>
    </div>
  );
};

export default Buyer;