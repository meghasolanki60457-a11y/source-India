import React, { useEffect, useState } from "react";
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

  // ================= SIDEBAR APIs =================
  useEffect(() => {
    fetch("https://react-live.sourceindia-electronics.com/v1/api/categories?is_delete=0&status=1")
      .then(res => res.json())
      .then(data => setCategories(Array.isArray(data) ? data : data?.data || []))
      .catch(console.log);
  }, []);

  useEffect(() => {
    fetch("https://react-live.sourceindia-electronics.com/v1/api/location/states/101")
      .then(res => res.json())
      .then(data => setStates(Array.isArray(data) ? data : data?.data || []))
      .catch(console.log);
  }, []);

  useEffect(() => {
    fetch("https://react-live.sourceindia-electronics.com/v1/api/core_activities?is_delete=0&status=1")
      .then(res => res.json())
      .then(data => setCoreActivities(Array.isArray(data) ? data : data?.data || []))
      .catch(console.log);
  }, []);

  // ================= COMPANY API =================
  const fetchCompanies = async (pageNo) => {
    try {
      setLoadingMore(true);

      const res = await fetch(
        `https://react-live.sourceindia-electronics.com/v1/api/products/companies?is_delete=0&status=1&limit=${LIMIT}&page=${pageNo}&is_seller=1&activity=`
      );

      const data = await res.json();
      const list = data?.companies || [];

      if (!list.length) {
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
    fetchCompanies(page);
  }, [page]);

  // ================= INFINITE SCROLL =================
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (
        scrollTop + windowHeight >= fullHeight - 200 &&
        !loadingMore &&
        hasMore
      ) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingMore, hasMore]);

  // ================= FILTER =================
  const filteredCompanies = companies.filter((item) =>
    item.organization_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid mt-3">
      <div className="row">

        {/* ================= SIDEBAR ================= */}
        <div className="col-md-3">
          <div className="filter-box">

            <h6>Company Name</h6>
            <input
              className="form-control mb-3"
              placeholder="Search company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <h6>Category</h6>
            {categories.map((cat) => (
              <div key={cat.id}>
                <input type="checkbox" /> {cat.name || cat.slug}
              </div>
            ))}

            <h6 className="mt-3">Core Activities</h6>
            {coreActivities.map((act) => (
              <div key={act.id}>
                <input type="checkbox" /> {act.name || act.title}
              </div>
            ))}

            <h6 className="mt-3">State</h6>
            {states.map((st) => (
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
                  <div className="border p-3 rounded">

                    {/* LOGO */}
                    <img
                      src={
                        item.company_logo_file
                          ? `https://react-live.sourceindia-electronics.com/v1/${item.company_logo_file}`
                          : "https://via.placeholder.com/120"
                      }
                      alt=""
                      style={{ width: 100, height: 100, objectFit: "contain" }}
                    />

                    {/* NAME */}
                    <h6>{item.organization_name}</h6>

                    {/* ================= SHORT DISPLAY ONLY (NO DATA DELETE) ================= */}
                    <p>
                      <b>About:</b>{" "}
                      {item.brief_company
                        ? item.brief_company.slice(0, 120) + "..."
                        : "N/A"}
                    </p>

                    <p>
                      <b>Location:</b>{" "}
                      {item.company_location?.slice(0, 80) || "N/A"}
                    </p>

                    <p><b>Phone:</b> {item.company_phone || "N/A"}</p>
                    <p><b>Website:</b> {item.company_website || "N/A"}</p>
                    <p><b>Email:</b> {item.company_email || "N/A"}</p>
                    <p><b>Core:</b> {item.core_activity_name || "N/A"}</p>
                    <p><b>Activity:</b> {item.activity_name || "N/A"}</p>

                    {/* BUTTON */}
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

          {/* LOADING MORE */}
          {loadingMore && (
            <p className="text-center text-primary">
              Loading more companies...
            </p>
          )}

          {!hasMore && (
            <p className="text-center text-muted">
              No more companies
            </p>
          )}

        </div>
      </div>
    </div>
  );
};

export default CompanyList;