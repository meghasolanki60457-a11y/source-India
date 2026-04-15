import React, { useEffect, useState } from "react";

const EnquiryPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const BASE_URL = "https://react-live.sourceindia-electronics.com/v1/";

  // ✅ FETCH API
  const fetchData = async (pageNo) => {
    setLoading(true);

    try {
      const res = await fetch(
        `https://react-live.sourceindia-electronics.com/v1/api/open_enquiries/front-enquiry?is_delete=0&page=${pageNo}`
      );

      const result = await res.json();

      let list = [];

      if (Array.isArray(result)) {
        list = result;
      } else if (Array.isArray(result?.data)) {
        list = result.data;
      } else if (Array.isArray(result?.data?.enquiries)) {
        list = result.data.enquiries;
      }

      if (list.length === 0) {
        setHasMore(false);
      } else {
        // 🔥 IMPORTANT: APPEND ONLY (NO DELETE)
        setData((prev) => [...prev, ...list]);
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  // first load + page change
  useEffect(() => {
    fetchData(page);
  }, [page]);

  // ✅ SINGLE PAGE SCROLL (window)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= fullHeight - 100) {
        if (!loading && hasMore) {
          setPage((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">All Enquiry</h3>

      <div className="row">
        {data.map((item) => {
          const img = item.company_logo
            ? BASE_URL + item.company_logo
            : "https://via.placeholder.com/80";

          return (
            <div className="col-md-4 mb-4" key={item.id}>
              <div className="card p-3 h-100">

                <img
                  src={img}
                  alt="logo"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "contain",
                    border: "1px solid #eee",
                    borderRadius: "6px",
                  }}
                />

                <h5 className="mt-2">{item.title}</h5>

                <p><b>Description:</b> {item.description}</p>

                <hr />

                <p>
                  <b>Name:</b>{" "}
                  {item.name ||
                    `${item.fname || ""} ${item.lname || ""}`}
                </p>

                <p>
                  <b>Company:</b>{" "}
                  {item.company || item.organization_name || "N/A"}
                </p>

                <p>
                  <b>Date:</b>{" "}
                  {item.created_at
                    ? new Date(item.created_at).toLocaleString("en-IN")
                    : "N/A"}
                </p>

                <button className="btn btn-primary w-100">
                  Reply
                </button>

              </div>
            </div>
          );
        })}
      </div>

      {/* loader */}
      {loading && (
        <p className="text-center">Loading...</p>
      )}

      {!hasMore && (
        <p className="text-center text-muted">No more data</p>
      )}
    </div>
  );
};

export default EnquiryPage;