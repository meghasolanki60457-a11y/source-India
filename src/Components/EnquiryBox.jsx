import React, { useEffect, useState, useRef } from "react";

const EnquiryPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);

  const BASE_URL =
    "https://react-live.sourceindia-electronics.com/v1/";

  // ================= FETCH API =================
  const fetchData = async (pageNo) => {
    setLoading(true);

    try {
      const res = await fetch(
        `${BASE_URL}api/open_enquiries/front-enquiry?is_delete=0&page=${pageNo}`
      );

      const result = await res.json();

      let list = [];

      if (Array.isArray(result)) list = result;
      else if (Array.isArray(result?.data)) list = result.data;
      else if (Array.isArray(result?.data?.enquiries))
        list = result.data.enquiries;

      if (list.length === 0) {
        setHasMore(false);
      } else {
        setData((prev) => [...prev, ...list]);
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  // ================= FIRST LOAD =================
  useEffect(() => {
    fetchData(page);
  }, [page]);

  // ================= 🔥 GUARANTEED INFINITE SCROLL =================
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];

        if (
          target.isIntersecting &&
          !loading &&
          hasMore
        ) {
          setPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      }
    );

    const el = loaderRef.current;

    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [loading, hasMore]);

  return (
    <div className="container mt-4">

      <h3 className="text-center mb-4">
        All Enquiry
      </h3>

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
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "contain",
                    border: "1px solid #eee",
                  }}
                />

                <h5 className="mt-2">{item.title}</h5>

                <p>{item.description}</p>

                <p>
                  <b>Name:</b>{" "}
                  {item.name ||
                    `${item.fname || ""} ${item.lname || ""}`}
                </p>

              </div>
            </div>
          );
        })}

      </div>

      {/* 🔥 VERY IMPORTANT TRIGGER ELEMENT */}
      <div
        ref={loaderRef}
        style={{
          height: "100px",
          width: "100%",
        }}
      />

      {loading && (
        <p className="text-center">
          Loading...
        </p>
      )}

      {!hasMore && (
        <p className="text-center text-muted">
          No more data
        </p>
      )}

    </div>
  );
};

export default EnquiryPage;