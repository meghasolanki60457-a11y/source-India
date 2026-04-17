import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CompanyDetail = () => {
  const { slug } = useParams();

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "https://react-live.sourceindia-electronics.com/v1/";

  // slug → id
  const companyId = slug?.split("-").pop();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${BASE_URL}api/products/companies/${companyId}`
        );

        const json = await res.json();

        const data =
          json?.data?.company ||
          json?.data ||
          json ||
          null;

        setCompany(data);

      } catch (err) {
        console.log(err);
        setCompany(null);
      } finally {
        setLoading(false);
      }
    };

    if (companyId) fetchCompany();
  }, [companyId]);

  if (loading) return <h3 className="text-center py-5">Loading...</h3>;
  if (!company) return <h3 className="text-center py-5">No Data Found</h3>;

  return (
    <div className="container py-4 company-page">

      {/* ================= BREADCRUMB ================= */}
      <div className="mb-3">
        Home / Seller / <b>{company.organization_name}</b>
      </div>

      <div className="row">

        {/* ================= LEFT SECTION ================= */}
        <div className="col-lg-8">

          {/* ================= COMPANY CARD ================= */}
          <div className="card p-4 mb-4">

            <img
              src={
                company.company_logo_file
                  ? BASE_URL + company.company_logo_file
                  : "https://via.placeholder.com/120x80"
              }
              alt="logo"
              style={{
                width: 120,
                height: 80,
                objectFit: "contain",
                border: "1px solid #eee",
                padding: 5
              }}
            />

            <h3 className="mt-2">{company.organization_name}</h3>

            <p><b>Brief:</b> {company.brief_company}</p>
            <p><b>Location:</b> {company.company_location}</p>
            <p><b>Address:</b> {company.address}</p>

            <p><b>Website:</b> {company.company_website}</p>

            <p><b>Country:</b> {company.country_name}</p>
            <p><b>State:</b> {company.state_name}</p>
            <p><b>City:</b> {company.city_name}</p>

            <p><b>Core Activity:</b> {company.coreactivity_name}</p>
            <p><b>Activity:</b> {company.activity_name}</p>

            <p><b>Category:</b> {company.category_name}</p>
            <p><b>Sub Category:</b> {company.sub_category_name}</p>

            <p>
              <b>Description:</b>{" "}
              {company.organizations_product_description}
            </p>

          </div>

          {/* ================= PRODUCTS SECTION ================= */}
          <h4 className="mb-3">Products</h4>

          <div className="row">

            {(company.products || []).map((item) => (
              <div className="col-md-3 mb-3" key={item.id}>

                <div className="card p-2 text-center h-100">

                  <img
                    src={
                      item.image
                        ? BASE_URL + item.image
                        : "https://via.placeholder.com/100"
                    }
                    alt={item.title}
                    style={{
                      height: 80,
                      objectFit: "contain"
                    }}
                  />

                  <p className="mt-2">{item.title}</p>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* ================= RIGHT SECTION (OPTIONAL LAYOUT LIKE ORIGINAL SITE) ================= */}
        <div className="col-lg-4">

          <div className="card p-3 mb-3">
            <h6>Company Info</h6>
            <p>{company.organization_name}</p>
            <p>{company.company_website}</p>
          </div>

          <div className="card p-3">
            <h6>Enquiry</h6>
            <input className="form-control mb-2" placeholder="Name" />
            <input className="form-control mb-2" placeholder="Email" />
            <textarea className="form-control mb-2" placeholder="Message" />
            <button className="btn btn-primary w-100">Send</button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CompanyDetail;