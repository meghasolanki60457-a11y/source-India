import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Buyer = () => {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [itemCategories, setItemCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const baseURL = "https://react-live.sourceindia-electronics.com/v1/";

  // ================= COMPANY API =================
  useEffect(() => {
    setLoading(true);

    fetch(
      "https://react-live.sourceindia-electronics.com/v1/api/products/companies?is_delete=0&status=1&limit=12&page=1&is_seller=0&activity="
    )
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data?.companies || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // ================= CATEGORY API =================
  useEffect(() => {
    fetch(
      "https://react-live.sourceindia-electronics.com/v1/api/item_category/getitem?status=1"
    )
      .then((res) => res.json())
      .then((data) => {
        setItemCategories(Array.isArray(data) ? data : data?.data || []);
      })
      .catch((err) => console.log(err));
  }, []);

  // ================= IMAGE =================
  const getImage = (item) => {
    if (!item?.company_logo_file) {
      return "https://sourceindia-electronics.com/default.png";
    }
    return `${baseURL}${item.company_logo_file}`;
  };

  return (
    <div className="container-fluid mt-3">
      <div className="row">

        {/* LEFT */}
        <div className="col-md-3">
          <h6>Company Name</h6>

          <input
            className="form-control mb-3"
            placeholder="Search company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <h6>Item Category</h6>
          {itemCategories.map((cat, i) => (
            <div className="form-check" key={i}>
              <input type="checkbox" className="form-check-input" />
              <label>{cat?.name || cat?.category_name}</label>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="col-md-9">

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="row">

              {companies.map((item) => (
                <div className="col-md-6 mb-4" key={item.id}>
                  <div className="company-card p-3 border rounded">

                    <img
                      src={getImage(item)}
                      alt="company"
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "contain"
                      }}
                    />

                    <h6 className="mt-2">{item.organization_name}</h6>

                    {/* LOCATION */}
                    <p>
                      <b>Location:</b>{" "}
                      {item.company_location ||
                        item.address ||
                        item.city_name ||
                        "N/A"}
                    </p>

                    {/* CONNECT BUTTON */}
                    <button
  className="btn btn-primary w-100 mt-2"
  onClick={() => navigate(`/buyer-connect/${item.id}?type=source`)}
>
  Connect
</button>
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

export default Buyer;