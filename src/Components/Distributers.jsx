import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const TradingList = () => {
    const navigate = useNavigate();

    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const observer = useRef();

    // ================= API CALL =================
    const fetchCompanies = async (pageNo) => {
        try {
            setLoading(true);

            const res = await fetch(
                `https://react-live.sourceindia-electronics.com/v1/api/products/companies?is_delete=0&status=1&limit=12&page=${pageNo}&is_trading=1&activity=`
            );

            const data = await res.json();

            const newCompanies = data?.companies || [];

            // append data (IMPORTANT)
            setCompanies((prev) => [...prev, ...newCompanies]);

            // stop when all data loaded
            if (companies.length + newCompanies.length >= data?.total) {
                setHasMore(false);
            }

            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    // first load
    useEffect(() => {
        fetchCompanies(1);
    }, []);

    // load next page
    useEffect(() => {
        if (page === 1) return;
        fetchCompanies(page);
    }, [page]);

    // ================= INFINITE SCROLL =================
    const lastCompanyRef = (node) => {
        if (loading) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPage((prev) => prev + 1);
            }
        });

        if (node) observer.current.observe(node);
    };

    // ================= FILTER =================
    const filtered = companies.filter((item) =>
        item.organization_name?.toLowerCase().includes(search.toLowerCase())
    );

    // ================= IMAGE =================
    const getImage = (item) => {
        if (item?.company_logo_file) {
            return `https://react-live.sourceindia-electronics.com/v1/${item.company_logo_file}`;
        }
        return "https://sourceindia-electronics.com/default.png";
    };

    return (
        <div className="container-fluid mt-3">
            <div className="row">

                {/* ================= SIDEBAR (NOT DELETED) ================= */}
                <div className="col-md-3">
                    <h6>Company Name</h6>

                    <input
                        className="form-control mb-3"
                        placeholder="Search companies..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* ================= MAIN ================= */}
                <div className="col-md-9">

                    <div className="row">

                        {filtered.map((item, index) => {

                            const isLast = index === filtered.length - 1;

                            return (
                                <div
                                    className="col-md-6 mb-4"
                                    key={item.id || index}
                                    ref={isLast ? lastCompanyRef : null}
                                >
                                    <div className="border rounded p-3 bg-white">

                                        <div className="d-flex gap-3">

                                            <img
                                                src={getImage(item)}
                                                alt="logo"
                                                style={{
                                                    width: "90px",
                                                    height: "90px",
                                                    objectFit: "contain",
                                                    border: "1px solid #ddd",
                                                    borderRadius: "6px"
                                                }}
                                            />

                                            <div>
                                                <h6>{item.organization_name}</h6>

                                                <p className="mb-1">
                                                    <b>Location:</b>{" "}
                                                    {item.company_location || item.user?.address || "N/A"}
                                                </p>

                                                <p className="mb-1">
                                                    <b>Website:</b>{" "}
                                                    {item.user?.website || item.company_website || "N/A"}
                                                </p>

                                                <p className="mb-1">
                                                    <b>Activity:</b>{" "}
                                                    {item.activity_name || "Trading/Distribution"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-2">
                                            <p className="mb-1">
                                                <b>Core Activity:</b>{" "}
                                                {item.core_activity_name || "Services"}
                                            </p>

                                            <p className="mb-1">
                                                <b>Category:</b>{" "}
                                                {item.category_name || "N/A"}
                                            </p>

                                            <p className="mb-1">
                                                <b>Sub Category:</b>{" "}
                                                {item.sub_category_name || "N/A"}
                                            </p>
                                        </div>

                                        <button
                                            className="btn btn-primary w-100 mt-3"
                                            onClick={() => navigate(`/company/${item.id}`)}
                                        >
                                            View Details
                                        </button>

                                    </div>
                                </div>
                            );
                        })}

                    </div>

                    {loading && <p>Loading...</p>}
                    {!hasMore && <p className="text-center">All companies loaded</p>}

                </div>
            </div>
        </div>
    );
};

export default TradingList;