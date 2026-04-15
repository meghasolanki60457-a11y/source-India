import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Buyer = () => {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const baseURL = "https://react-live.sourceindia-electronics.com/v1/";

  // ================= FETCH COMPANIES =================
  const fetchCompanies = async (pageNo = 1) => {
    const res = await fetch(
      `${baseURL}api/products/companies?is_delete=0&status=1&limit=12&page=${pageNo}&is_seller=0`
    );

    const data = await res.json();
    const list = data?.companies || [];

    setCompanies((prev) =>
      pageNo === 1 ? list : [...prev, ...list]
    );

    if (list.length < 12) setHasMore(false);
  };

  // ================= FETCH CATEGORIES =================
  const fetchCategories = async () => {
    const res = await fetch(
      `${baseURL}api/categories?is_delete=0&status=1`
    );

    const data = await res.json();
    setCategories(data?.data || data || []);
  };

  useEffect(() => {
    fetchCompanies(1);
    fetchCategories();
  }, []);

  // ================= SCROLL (INFINITE) =================
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (
        scrollTop + windowHeight >= fullHeight - 150 &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  // ================= PAGE CHANGE HANDLER =================
  useEffect(() => {
    if (page > 1) {
      fetchCompanies(page);

      // scroll to top for next page
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }
  }, [page]);

  const getImage = (item) => {
    return item?.company_logo_file
      ? `${baseURL}${item.company_logo_file}`
      : "https://sourceindia-electronics.com/default.png";
  };

  return (
    <div className="container-fluid">

      <div className="row">

        {/* ================= SIDEBAR ================= */}
        <div className="col-md-3">

          <div className="bg-primary text-white p-2 fw-bold">
            Company Name
          </div>

          <input
            className="form-control mb-3"
            placeholder="Search companies..."
          />

          <div className="bg-primary text-white p-2 fw-bold">
            Item Category
          </div>

          <div
            style={{
              maxHeight: 450,
              overflowY: "auto",
              border: "1px solid #ddd",
              padding: 5,
            }}
          >
            {categories.map((cat) => (
              <div key={cat.id} style={{ padding: "5px" }}>
                <input type="checkbox" />{" "}
                {cat.name || cat.category_name || "N/A"}
              </div>
            ))}
          </div>

        </div>

        {/* ================= MAIN ================= */}
        <div className="col-md-9">

          <div className="row">

            {companies.map((item) => (
              <div key={item.id} className="col-md-6 mb-3">

                <div className="border bg-white p-3 h-100">

                  <div className="d-flex gap-2">

                    <img
                      src={getImage(item)}
                      style={{
                        width: 70,
                        height: 70,
                        objectFit: "contain",
                        border: "1px solid #ddd",
                      }}
                    />

                    <div>
                      <h6 className="mb-1">
                        {item.organization_name}
                      </h6>
                      <small>
                        {item.company_location || "N/A"}
                      </small>
                    </div>

                  </div>

                  <p className="mt-2 mb-2">
                    <b>Product:</b>{" "}
                    {item.product_name ||
                      item.products?.map((p) => p.name).join(", ") ||
                      item.user?.products ||
                      "N/A"}
                  </p>

                  <button
                    className="btn w-100"
                    style={{
                      background: "#ff6a00",
                      color: "#fff",
                    }}
                    onClick={() =>
                      navigate(`/buyer-connect/${item.id}`)
                    }
                  >
                    Connect
                  </button>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Buyer;