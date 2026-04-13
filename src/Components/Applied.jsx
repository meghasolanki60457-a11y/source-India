import React, { useEffect, useState } from "react";

const Applied = () => {

  const [company, setCompany] = useState(null);

  useEffect(() => {
    fetch("https://react-live.sourceindia-electronics.com/v1/api/products/companies/applied-materials-india-pvt-ltd")
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);

        setCompany(data?.data || data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!company) {
    return <div className="text-center py-5">Loading...</div>;
  }

  const baseURL = "https://react-live.sourceindia-electronics.com/v1/";

  return (
    <div className="container py-4 company-page">

      {/* Breadcrumb */}
      <div className="breadcrumb-text mb-3">
        Home / Seller / <span>{company.organization_name}</span>
      </div>

      <div className="row">

        {/* LEFT */}
        <div className="col-lg-8">

          <div className="card company-card p-4">

            {/* COMPANY LOGO */}
            <div className="mb-3">
              <img
                src={baseURL + company.company_logo_file}
                alt="logo"
                style={{
                  width: "120px",
                  height: "80px",
                  objectFit: "contain",
                  border: "1px solid #eee",
                  padding: "5px"
                }}
              />
            </div>

            <h4 className="title">
              {company.organization_name}
            </h4>

            <p className="location">
              📍 {company.address}
            </p>

            <div className="row mt-3">

              <div className="col-md-4">
                <label>Website</label>
                <p className="blue">{company.company_website}</p>
              </div>

              <div className="col-md-4">
                <label>Core Activity</label>
                <p>{company.coreactivity_name}</p>
              </div>

              <div className="col-md-4">
                <label>Activity</label>
                <p>{company.activity_name}</p>
              </div>

              <div className="col-md-4 mt-3">
                <label>Category</label>
                <p>{company.category_name}</p>
              </div>

              <div className="col-md-4 mt-3">
                <label>Sub Category</label>
                <p>{company.sub_category_name}</p>
              </div>

            </div>

            <p className="desc mt-3">
              {company.organizations_product_description}
            </p>

            <button className="btn enquiry-btn mt-2">
              Enquiry
            </button>

          </div>

          {/* PRODUCTS */}
          <h5 className="mt-5 mb-3">Products</h5>

          <div className="row">

            {company.products?.map((item) => (
              <div className="col-md-3" key={item.id}>

                <div className="card product-card text-center p-3">

                  <div className="img-box">
                    <img
                      src={baseURL + item.image}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: "60px",
                        objectFit: "contain"
                      }}
                    />
                  </div>

                  <p className="mt-2">{item.title}</p>

                  <button className="btn btn-primary btn-sm">
                    View →
                  </button>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* RIGHT */}
        <div className="col-lg-4">

          <div className="card p-3 mb-3">

            <h6>Rating & Review</h6>

            <p className="mb-1">Rating</p>
            <div className="stars">☆☆☆☆☆</div>

            <textarea
              className="form-control mt-2"
              rows="3"
              placeholder="Write review"
            ></textarea>

            <button className="btn btn-primary mt-2 w-100">
              Submit
            </button>

          </div>

          <div className="card text-center p-3">

            <p className="fw-bold">
              To List your Product
            </p>

            <p className="small text-muted">
              Boost Your Business Visibility Worldwide
            </p>

            <button className="btn register-btn">
              Register Now
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Applied;