import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const CompanyList = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [states, setStates] = useState([]);
  const [coreActivities, setCoreActivities] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const LIMIT = 50;
  const loaderRef = useRef(null);

  const BASE_URL = "https://react-live.sourceindia-electronics.com/v1/";

  // ================= SIDEBAR APIs =================
  useEffect(() => {
    fetch(`${BASE_URL}api/categories?is_delete=0&status=1`)
      .then(res => res.json())
      .then(data => setCategories(data?.data || data || []));
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}api/location/states/101`)
      .then(res => res.json())
      .then(data => setStates(data?.data || data || []));
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}api/core_activities?is_delete=0&status=1`)
      .then(res => res.json())
      .then(data => setCoreActivities(data?.data || data || []));
  }, []);

  // ================= COMPANY API =================
  const fetchCompanies = async (pageNo) => {
    try {
      setLoadingMore(true);

      const res = await fetch(
        `${BASE_URL}api/products/companies?is_delete=0&status=1&limit=${LIMIT}&page=${pageNo}&is_seller=1`
      );

      const data = await res.json();
      const list = data?.companies || [];

      if (list.length === 0) {
        setHasMore(false);
        return;
      }

      setCompanies((prev) =>
        pageNo === 1 ? list : [...prev, ...list]
      );

      if (list.length < LIMIT) {
        setHasMore(false);
      }

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (hasMore) {
      fetchCompanies(page);
    }
  }, [page, hasMore]);

  // ================= 🔥 INFINITE SCROLL (STATEFOLDER STYLE) =================
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !loadingMore &&
          !loading
        ) {
          setPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0,
      }
    );

    const current = loaderRef.current;

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasMore, loadingMore, loading]);

  // ================= SEARCH =================
  const filteredCompanies = companies.filter((item) =>
    item.organization_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid mt-3">
      <div className="row">

        {/* ================= SIDEBAR ================= */}
        <div className="col-md-3">
          <div className="border p-3 rounded bg-light">

            <h6>Company Name</h6>
            <input
              className="form-control mb-3"
              placeholder="Search company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <h6>Category</h6>
            {categories.map(cat => (
              <div key={cat.id}>
                <input type="checkbox" /> {cat.name || cat.slug}
              </div>
            ))}

            <h6 className="mt-3">Core Activities</h6>
            {coreActivities.map(act => (
              <div key={act.id}>
                <input type="checkbox" /> {act.name || act.title}
              </div>
            ))}

            <h6 className="mt-3">State</h6>
            {states.map(st => (
              <div key={st.id}>
                <input type="checkbox" /> {st.name || st.state_name}
              </div>
            ))}

          </div>
        </div>

        {/* ================= MAIN ================= */}
        <div className="col-md-9">

          {loading ? (
            <p>Loading companies...</p>
          ) : filteredCompanies.length === 0 ? (
            <p>No companies found</p>
          ) : (
            <div className="row">

              {filteredCompanies.map((item) => (
                <div className="col-md-6 mb-4" key={item.id}>
                  <div className="border p-3 rounded shadow-sm bg-white h-100">

                    <div className="d-flex gap-3 align-items-center mb-2">
                      <img
                        src={
                          item.company_logo_file
                            ? `${BASE_URL}${item.company_logo_file}`
                            : "https://via.placeholder.com/100"
                        }
                        alt=""
                        style={{ width: 80, height: 80, objectFit: "contain" }}
                      />
                      <h5>{item.organization_name}</h5>
                    </div>

                    <p><b>Location:</b> {item.company_location || "N/A"}</p>

                    <p>
                      <b>Website:</b>{" "}
                      {item.company_website ? (
                        <a href={item.company_website} target="_blank" rel="noreferrer">
                          {item.company_website}
                        </a>
                      ) : "N/A"}
                    </p>

                    <p><b>Core Activity:</b> {item.core_activity_name || "N/A"}</p>
                    <p><b>Activity:</b> {item.activity_name || "N/A"}</p>

                    <p><b>Category:</b> {item.category_name || "N/A"}</p>
                    <p><b>Sub Category:</b> {item.sub_category_name || "N/A"}</p>

                    <button
                      className="btn btn-primary w-100"
                      onClick={() => navigate(`/company/${item.id}`)}
                    >
                      View Details
                    </button>

                  </div>
                </div>
              ))}

            </div>
          )}

          {/* ================= LOADER ================= */}
          <div ref={loaderRef} style={{ height: "80px" }} />

          {loadingMore && (
            <div className="text-center my-3">
              <div className="spinner-border text-primary" />
            </div>
          )}

          {!hasMore && (
            <p className="text-center text-muted">No more companies</p>
          )}

        </div>

      </div>
    </div>
  );
};

export default CompanyList;