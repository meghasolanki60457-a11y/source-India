import React, { useEffect, useState } from "react";

const EnquiryPage = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "https://react-live.sourceindia-electronics.com/v1/";

  useEffect(() => {
    fetch(
      "https://react-live.sourceindia-electronics.com/v1/api/open_enquiries/front-enquiry?is_home=1&is_delete=0"
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("API RESPONSE 👉", res);

        // ✅ FIX: correct data extraction
        const list =
          Array.isArray(res?.data)
            ? res.data
            : Array.isArray(res)
            ? res
            : [];

        setData(list);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-4">

      <h3 className="text-center mb-4">Open Enquiry</h3>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-center">No Data Found</p>
      ) : (

        <div className="row">

          {data.map((item) => {

            // ✅ IMAGE FIX (IMPORTANT)
            const img =
              item.company_logo
                ? BASE_URL + item.company_logo
                : "https://via.placeholder.com/80";

            return (
              <div className="col-md-4 mb-4" key={item.id}>

                <div className="card p-3 h-100">

                  {/* IMAGE */}
                  <img
                    src={img}
                    alt="logo"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "contain",
                      border: "1px solid #eee",
                      borderRadius: "6px"
                    }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/80";
                    }}
                  />

                  {/* TITLE */}
                  <h5 className="mt-2">{item.title}</h5>

                  {/* DESCRIPTION */}
                  <p>{item.description}</p>

                  <hr />

                  <p><b>Name:</b> {item.name || `${item.fname || ""} ${item.lname || ""}`}</p>
                  <p><b>Email:</b> {item.email || "N/A"}</p>
                  <p><b>Phone:</b> {item.phone || "N/A"}</p>
                  <p><b>Company:</b> {item.company || item.organization_name || "N/A"}</p>

                </div>

              </div>
            );
          })}

        </div>

      )}

    </div>
  );
};

export default EnquiryPage;