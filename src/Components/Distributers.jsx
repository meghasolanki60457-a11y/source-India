import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const TradingList = () => {
    const navigate = useNavigate();

    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const loaderRef = useRef(null);

    const BASE_URL = "https://react-live.sourceindia-electronics.com/v1/";

    // ================= FULL SIDEBAR DATA =================
    const [categories, setCategories] = useState([]);
    const [states, setStates] = useState([]);
    const [coreActivities, setCoreActivities] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}api/categories?is_delete=0&status=1`)
            .then(res => res.json())
            .then(data => setCategories(data?.data || []));
    }, []);

    useEffect(() => {
        fetch(`${BASE_URL}api/location/states/101`)
            .then(res => res.json())
            .then(data => setStates(data?.data || []));
    }, []);

    useEffect(() => {
        fetch(`${BASE_URL}api/core_activities?is_delete=0&status=1`)
            .then(res => res.json())
            .then(data => setCoreActivities(data?.data || []));
    }, []);

    // ================= COMPANY API (FIXED APPEND ONLY) =================
    const fetchCompanies = async (pageNo) => {
        try {
            setLoading(true);

            const res = await fetch(
                `${BASE_URL}api/products/companies?is_delete=0&status=1&limit=12&page=${pageNo}&is_trading=1`
            );

            const data = await res.json();

            const newCompanies = data?.companies || [];

            // 🔥 FIX ONLY (NO DELETE)
            setCompanies((prev) => [...prev, ...newCompanies]);

            if (newCompanies.length < 12) {
                setHasMore(false);
            }

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompanies(page);
    }, [page]);

    // ================= INFINITE SCROLL =================
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    setPage((prev) => prev + 1);
                }
            },
            { root: null, rootMargin: "100px", threshold: 0 }
        );

        const current = loaderRef.current;

        if (current) observer.observe(current);

        return () => {
            if (current) observer.unobserve(current);
        };
    }, [hasMore, loading]);

    // ================= FILTER =================
    const filtered = companies.filter(item =>
        item.organization_name?.toLowerCase().includes(search.toLowerCase())
    );

    // ================= IMAGE =================
    const getImage = (item) => {
        if (item?.company_logo_file) {
            return `${BASE_URL}${item.company_logo_file}`;
        }
        return "https://sourceindia-electronics.com/default.png";
    };

    return (
        <div className="container-fluid mt-3">
            <div className="row">

                {/* ================= SIDEBAR (FULL RESTORED) ================= */}
                <div className="col-md-3">

                    <input
                        className="form-control mb-3"
                        placeholder="Search companies..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <h6>Categories</h6>
                    {categories.map(c => (
                        <div key={c.id}>
                            <input type="checkbox" /> {c.name}
                        </div>
                    ))}

                    <h6 className="mt-3">Core Activities</h6>
                    {coreActivities.map(c => (
                        <div key={c.id}>
                            <input type="checkbox" /> {c.name}
                        </div>
                    ))}

                    <h6 className="mt-3">States</h6>
                    {states.map(s => (
                        <div key={s.id}>
                            <input type="checkbox" /> {s.name}
                        </div>
                    ))}

                </div>

                {/* ================= MAIN ================= */}
                <div className="col-md-9">
                    <div className="row">

                        {filtered.map((item) => {

                            const tags = (item.products || [])
                                .map(p => p.title)
                                .filter(Boolean);

                            return (
                                <div className="col-md-6 mb-4" key={item.id}>
                                    <div className="border p-3 rounded shadow-sm bg-white h-100">

                                        <div className="d-flex gap-3 align-items-center">
                                            <img
                                                src={getImage(item)}
                                                alt=""
                                                style={{
                                                    width: 80,
                                                    height: 80,
                                                    objectFit: "contain"
                                                }}
                                            />

                                            <h5>{item.organization_name}</h5>
                                        </div>

                                        <p><b>Location:</b> {item.company_location || "N/A"}</p>
                                        <p><b>Website:</b> {item.company_website || "N/A"}</p>

                                        <p><b>Core Activity:</b> {item.core_activity_name || "N/A"}</p>
                                        <p><b>Activity:</b> {item.activity_name || "N/A"}</p>

                                        <p><b>Category:</b> {item.category_name || "N/A"}</p>
                                        <p><b>Sub Category:</b> {item.sub_category_name || "N/A"}</p>

                                        {/* PRODUCTS / TAGS (RESTORED) */}
                                        <div>
                                            {tags.slice(0, 6).map((t, i) => (
                                                <span key={i}
                                                    style={{
                                                        background: "#ff7a00",
                                                        color: "#fff",
                                                        padding: "4px 8px",
                                                        marginRight: "5px",
                                                        borderRadius: "4px",
                                                        fontSize: "12px"
                                                    }}>
                                                    {t}
                                                </span>
                                            ))}
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

                    {/* ================= SCROLL TRIGGER ================= */}
                    <div ref={loaderRef} style={{ height: 80 }} />

                    {loading && <p className="text-center">Loading...</p>}

                    {!hasMore && <p className="text-center">No more data</p>}
                </div>

            </div>
        </div>
    );
};

export default TradingList;