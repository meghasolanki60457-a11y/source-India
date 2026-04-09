import React, { useEffect, useState } from "react";


function Featured() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://react-live.sourceindia-electronics.com/v1/api/products/companies?is_delete=0&limit=11&page=1"
    )
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data.companies || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="featured-section container py-5">
      <h2 className="text-center title mb-5">FEATURED COMPANIES</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="row g-4">
          {companies.map((company, index) => (
            <div key={index} className="col-6 col-md-4 col-lg-2">
              <div className="company-card text-center">
                <img
                  src={
                    company.company_logo_file
                      ? `https://react-live.sourceindia-electronics.com/v1/${company.company_logo_file}`
                      : "/fallback.png"
                  }
                  alt={company.organization_name}
                  className="company-logo mb-3"
                />
                <p className="company-name">
                  {company.organization_name}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Featured;