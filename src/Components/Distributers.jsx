import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TradingList = () => {

    const navigate = useNavigate(); // ✅ FIX (bas ye line yaha aayi hai)

    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    // ================= API =================
    useEffect(() => {
        setLoading(true);

        fetch("https://react-live.sourceindia-electronics.com/v1/api/products/companies?is_delete=0&status=1&limit=12&page=1&is_trading=1&activity=")
            .then(res => res.json())
            .then(data => {
                setCompanies(data?.companies || []);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);

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

                {/* ================= SIDEBAR ================= */}
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

                    {loading ? (
                        <p>Loading...</p>
                    ) : filtered.length === 0 ? (
                        <p>No companies found</p>
                    ) : (
                        <div className="row">

                            {filtered.map((item, index) => (

                                <div className="col-md-6 mb-4" key={index}>

                                    <div className="border rounded p-3 bg-white">

                                        {/* TOP SECTION */}
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
                                                    <b>Activity:</b> Trading / Distribution
                                                </p>
                                            </div>
                                        </div>

                                        {/* MIDDLE SECTION */}
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

                                        {/* TAGS */}
                                        <div className="mt-2 d-flex flex-wrap gap-2">

                                            {(item.item_category_name || "Electronics").split(",").map((tag, i) => (
                                                <span
                                                    key={i}
                                                    style={{
                                                        background: "orange",
                                                        color: "#fff",
                                                        fontSize: "12px",
                                                        padding: "3px 8px",
                                                        borderRadius: "4px"
                                                    }}
                                                >
                                                    {tag}
                                                </span>
                                            ))}

                                        </div>

                                        {/* BUTTON */}
                                        <button
                                            className="btn btn-primary w-100 mt-3"
                                            onClick={() => navigate(`/company/${item.id}`)}
                                        >
                                            View Details
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

export default TradingList;