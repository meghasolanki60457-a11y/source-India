import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CompanyPage = () => {
  const { slug } = useParams();   // 👈 IMPORTANT

  const [company, setCompany] = useState(null);

  const baseURL = "https://react-live.sourceindia-electronics.com/v1/";

  // 🔥 Extract ID from slug (last number)
  const companyId = slug?.split("-").pop();

  useEffect(() => {
    if (!companyId) return;

    fetch(`${baseURL}api/products/companies/${companyId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);

        setCompany(data?.data || data || null);
      })
      .catch((err) => console.log(err));
  }, [companyId]);

  if (!company) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <div className="container py-4 company-page">

      <div className="breadcrumb-text mb-3">
        Home / Seller / <span>{company.organization_name}</span>
      </div>

      <div className="row">

        <div className="col-lg-8">

          <div className="card p-4">

            <img
              src={
                company.company_logo_file
                  ? baseURL + company.company_logo_file
                  : "https://via.placeholder.com/120x80"
              }
              alt="logo"
              style={{ width: 120, height: 80 }}
            />

            <h4>{company.organization_name}</h4>

            <p>{company.address}</p>
            <p>{company.company_website}</p>
            <p>{company.coreactivity_name}</p>
            <p>{company.activity_name}</p>
            <p>{company.category_name}</p>
            <p>{company.sub_category_name}</p>
            <p>{company.organizations_product_description}</p>

          </div>

          <h5>Products</h5>

          <div className="row">
            {(company.products || []).map((item) => (
              <div className="col-md-3" key={item.id}>
                <div className="card p-2 text-center">

                  <img
                    src={item.image ? baseURL + item.image : ""}
                    style={{ height: 80 }}
                  />

                  <p>{item.title}</p>

                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

export default CompanyPage;