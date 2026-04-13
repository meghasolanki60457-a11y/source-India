import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CompanyList = () => {

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [states, setStates] = useState([]);
  const [coreActivities, setCoreActivities] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // ================= CATEGORY API =================
  useEffect(() => {
    fetch("https://react-live.sourceindia-electronics.com/v1/api/categories?is_delete=0&status=1")
      .then(res => res.json())
      .then(data => {
        setCategories(Array.isArray(data) ? data : data?.data || []);
      })
      .catch(err => console.log(err));
  }, []);

  // ================= STATES API =================
  useEffect(() => {
    fetch("https://react-live.sourceindia-electronics.com/v1/api/location/states/101")
      .then(res => res.json())
      .then(data => {
        setStates(Array.isArray(data) ? data : data?.data || []);
      })
      .catch(err => console.log(err));
  }, []);

  // ================= CORE ACTIVITIES API =================
  useEffect(() => {
    fetch("https://react-live.sourceindia-electronics.com/v1/api/core_activities?is_delete=0&status=1")
      .then(res => res.json())
      .then(data => {
        setCoreActivities(Array.isArray(data) ? data : data?.data || []);
      })
      .catch(err => console.log(err));
  }, []);

  // ================= COMPANY API =================
  useEffect(() => {
    setLoading(true);

    fetch("https://react-live.sourceindia-electronics.com/v1/api/products/companies?is_delete=0&status=1&limit=12&page=1&is_seller=1&activity=")
      .then(res => res.json())
      .then(data => {

        const list = data?.companies || [];
        setCompanies(list);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

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
              type="text"
              className="form-control mb-3"
              placeholder="Search company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <h6>Category</h6>
            {categories.map((cat) => (
              <div className="form-check" key={cat.id}>
                <input type="checkbox" className="form-check-input" />
                <label>{cat.name || cat.slug}</label>
              </div>
            ))}

            <h6 className="mt-3">Core Activities</h6>
            {coreActivities.map((act) => (
              <div className="form-check" key={act.id}>
                <input type="checkbox" className="form-check-input" />
                <label>{act.name || act.title}</label>
              </div>
            ))}

            <h6 className="mt-3">State</h6>
            {states.map((st) => (
              <div className="form-check" key={st.id}>
                <input type="checkbox" className="form-check-input" />
                <label>{st.name || st.state_name}</label>
              </div>
            ))}

          </div>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="col-md-9">

          {loading ? (
            <p>Loading companies...</p>
          ) : filteredCompanies.length === 0 ? (
            <p>No companies found</p>
          ) : (
            <div className="row">

              {filteredCompanies.map((item, index) => (
                <div className="col-md-6 mb-4" key={index}>
                  <div className="company-card">

                    {/* LOGO */}
                    <div className="text-center p-2">
                      <img
                        src={
                          item.company_logo_file
                            ? `https://react-live.sourceindia-electronics.com/v1/${item.company_logo_file}`
                            : "https://via.placeholder.com/120"
                        }
                        alt="company logo"
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "contain"
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/120";
                        }}
                      />
                    </div>

                    <div className="card-body">

                      <h6 className="company-title">
                        {item.organization_name || "No Name"}
                      </h6>

                      <p><strong>Location:</strong> {item.company_location || "N/A"}</p>
                      <p><strong>Phone:</strong> {item.company_phone || "N/A"}</p>
                      <p><strong>Website:</strong> {item.company_website || "N/A"}</p>
                      <p><strong>Email:</strong> {item.company_email || "N/A"}</p>

                    </div>

                    {/* BUTTON FIXED */}
                    <div className="card-footer text-center">
                      <button
                        className="btn btn-primary w-100"
                     onClick={() => navigate(`/company/${item.id}`)}
                      >
                        View Details
                      </button>
                    </div>

                  </div>
                </div>
              ))}

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CompanyList;