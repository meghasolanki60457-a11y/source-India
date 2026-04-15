import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CompanyDetail = () => {
  const { id } = useParams();

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  const baseURL = "https://react-live.sourceindia-electronics.com/v1/";

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://react-live.sourceindia-electronics.com/v1/api/products/companies/${id}`
      );

      const data = await res.json();
      setCompany(data || null);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) return <h3 className="text-center py-5">Loading...</h3>;
  if (!company) return <h3 className="text-center py-5">No Data Found</h3>;

  return (
    <div className="container py-4">

      {/* ================= TOP CARD ================= */}
      <div className="card p-4 shadow-sm">

        <div className="row">

          {/* LEFT SIDE */}
          <div className="col-md-8">

            <div className="d-flex gap-3 align-items-center mb-3">

              <img
                src={
                  company.company_logo_file
                    ? baseURL + company.company_logo_file
                    : "https://via.placeholder.com/100"
                }
                style={{ width: 80 }}
              />

              <h4 style={{ color: "orange" }}>
                {company.organization_name}
              </h4>

            </div>

            <p>
              📍 <b>Address:</b> {company.address}
            </p>

            <div className="row">

              <div className="col-md-6">
                <p>🌍 <b>Country:</b> {company.country_name}</p>
                <p>🏙 <b>State:</b> {company.state_name}</p>
                <p>🏢 <b>City:</b> {company.city_name}</p>
              </div>

              <div className="col-md-6">
                <p>📧 <b>Email:</b> {company.email || "N/A"}</p>
                <p>📞 <b>Phone:</b> {company.phone || "N/A"}</p>
                <p>🌐 <b>Website:</b> {company.company_website}</p>
              </div>

            </div>

            <hr />

            <p>
              <b>Core Activity:</b> {company.coreactivity_name}
            </p>

            <p>
              <b>Activity:</b> {company.activity_name}
            </p>

            <p>
              <b>Category:</b> {company.category_name}
            </p>

            <p>
              <b>Sub Category:</b> {company.sub_category_name}
            </p>

            <hr />

            <p>
              <b>About:</b> {company.brief_company}
            </p>

            <p>
              {company.organizations_product_description}
            </p>

          </div>

          {/* RIGHT SIDE (SIDEBAR) */}
          <div className="col-md-4">

            <div className="border p-3 rounded">

              <h6>⭐ Rating & Review</h6>

              <input className="form-control mb-2" placeholder="Rating" />
              <textarea className="form-control mb-2" placeholder="Review" />

              <button className="btn btn-primary w-100">
                Submit
              </button>

            </div>

            <div className="border p-3 rounded mt-3 text-center">

              <h6>To List Your Product</h6>

              <button className="btn btn-warning w-100">
                Register Now
              </button>

            </div>

          </div>

        </div>
      </div>

      {/* ================= PRODUCTS ================= */}
      <h5 className="mt-4">Products</h5>

      <div className="row">

        {(company.products || []).map((item) => (
          <div className="col-md-3 mb-3" key={item.id}>

            <div className="card text-center p-3">

              <img
                src={item.image ? baseURL + item.image : ""}
                style={{ height: 80, objectFit: "contain" }}
              />

              <p>{item.title}</p>

              <button className="btn btn-primary btn-sm">
                View →
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default CompanyDetail;