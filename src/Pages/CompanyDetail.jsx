import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CompanyDetail = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    fetch(
      `https://react-live.sourceindia-electronics.com/v1/api/products/companies/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("FULL API:", data); // 🔥 check structure
        setCompany(data?.data || data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!company) return <div className="text-center py-5">Loading...</div>;

  const baseURL = "https://react-live.sourceindia-electronics.com/v1/";

  return (
    <div className="container py-4">

      <div className="card p-4">

        {/* LOGO */}
        <img
          src={
            company.company_logo_file
              ? baseURL + company.company_logo_file
              : "https://sourceindia-electronics.com/default.png"
          }
          alt="logo"
          style={{ width: "120px" }}
        />

        {/* BASIC INFO */}
        <h4 className="mt-3">{company.organization_name}</h4>

        <p><b>Location:</b> {company.company_location || company.user?.address || "N/A"}</p>

        <p>
          <b>Website:</b>{" "}
          {company.company_website || company.user?.website || "N/A"}
        </p>

        <p><b>Core Activity:</b> {company.core_activity_name || "N/A"}</p>

        <p><b>Category:</b> {company.category_name || "N/A"}</p>

        <p><b>Sub Category:</b> {company.sub_category_name || "N/A"}</p>

        <p><b>Activity:</b> Trading / Distribution</p>

        {/* DESCRIPTION */}
        <p className="mt-2">
          <b>Description:</b>{" "}
          {company.organizations_product_description || "No description"}
        </p>

      </div>

      {/* PRODUCTS */}
      <h5 className="mt-4">Products</h5>

      <div className="row">
        {company.products?.length > 0 ? (
          company.products.map((item) => (
            <div className="col-md-3 mb-3" key={item.id}>
              <div className="card p-3 text-center">

                <img
                  src={
                    item.image
                      ? baseURL + item.image
                      : "https://sourceindia-electronics.com/default.png"
                  }
                  alt={item.title}
                  style={{ height: "60px", objectFit: "contain" }}
                />

                <p className="mt-2">{item.title}</p>

              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>

    </div>
  );
};

export default CompanyDetail;