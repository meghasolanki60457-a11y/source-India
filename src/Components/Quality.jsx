import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const IMAGE_BASE_URL =
  "https://react-live.sourceindia-electronics.com/";

const StateFolder = () => {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [states, setStates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [itemCategories, setItemCategories] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [topInfo, setTopInfo] = useState({
    category: "",
    subcategory: "",
    itemCategory: "",
  });

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);

  // ================= SORT =================
  const handleSort = (type) => {
    let sorted = [...products];

    if (type === "asc") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (type === "desc") {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    } else if (type === "new") {
      sorted.sort((a, b) => b.id - a.id);
    }

    setProducts(sorted);
  };

  // ================= REFRESH =================
  const handleRefresh = () => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  };

  // ================= INFINITE SCROLL =================
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0,
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading, hasMore]);

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
    fetchCompanies();
  }, []);

  // ================= PRODUCTS =================
  const fetchProducts = async (pageNo) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `https://react-live.sourceindia-electronics.com/v1/api/products?is_delete=0&status=1&is_approve=1&limit=20&page=${pageNo}`
      );

      const data = res.data.products || [];

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      setProducts((prev) => [...prev, ...data]);

      if (pageNo === 1 && data.length > 0) {
        setTopInfo({
          category: data[0].category_name || "",
          subcategory: data[0].subcategory_name || "",
          itemCategory: data[0].item_category_name || "",
        });

        const uniqueStates = [];
        const seenStates = new Set();

        data.forEach((item) => {
          if (item.state_name && !seenStates.has(item.state_name)) {
            seenStates.add(item.state_name);
            uniqueStates.push({ name: item.state_name });
          }
        });

        setStates(uniqueStates);

        const uniqueItem = [];
        const seenItem = new Set();

        data.forEach((item) => {
          if (
            item.item_category_name &&
            !seenItem.has(item.item_category_name)
          ) {
            seenItem.add(item.item_category_name);
            uniqueItem.push({
              id: item.item_category_id,
              name: item.item_category_name,
            });
          }
        });

        setItemCategories(uniqueItem);
      }

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ================= CATEGORY =================
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://react-live.sourceindia-electronics.com/v1/api/categories?is_delete=0"
      );
      setCategories(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= SUBCATEGORY =================
  const fetchSubCategories = async () => {
    try {
      const res = await axios.get(
        "https://react-live.sourceindia-electronics.com/v1/api/item_category/by-selected-category-subcategory"
      );

      const data = res.data || [];

      const unique = [];
      const seen = new Set();

      data.forEach((item) => {
        if (item.subcategory_name && !seen.has(item.subcategory_name)) {
          seen.add(item.subcategory_name);
          unique.push({
            id: item.subcategory_id,
            name: item.subcategory_name,
          });
        }
      });

      setSubCategories(unique);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= COMPANY =================
  const fetchCompanies = async () => {
    try {
      const res = await axios.get(
        "https://react-live.sourceindia-electronics.com/v1/api/products/companies?is_delete=0"
      );

      const data = res.data.data || res.data.companies || [];

      const unique = [];
      const seen = new Set();

      data.forEach((item) => {
        const name = item.organization_name;

        if (name && !seen.has(name)) {
          seen.add(name);
          unique.push({
            id: item.id,
            name: name,
          });
        }
      });

      setCompanies(unique);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid mt-3">
      <div className="row">

        {/* ✅ FULL SIDEBAR RESTORED */}
        <div className="col-md-3">
          <h6>Search Products</h6>
          <input className="form-control" />

          <h5 className="mt-3">States</h5>
          <div style={{ maxHeight: 150, overflowY: "auto" }}>
            {states.map((s, i) => (
              <div key={i}>
                <input type="checkbox" />
                <span className="ms-2">{s.name}</span>
              </div>
            ))}
          </div>

          <h5 className="mt-3">Categories</h5>
          <div style={{ maxHeight: 150, overflowY: "auto" }}>
            {categories.map((c) => (
              <div key={c.id}>
                <input type="checkbox" />
                <span className="ms-2">{c.name}</span>
              </div>
            ))}
          </div>

          <h5 className="mt-3">Sub Categories</h5>
          <div style={{ maxHeight: 150, overflowY: "auto" }}>
            {subCategories.map((s) => (
              <div key={s.id}>
                <input type="checkbox" />
                <span className="ms-2">{s.name}</span>
              </div>
            ))}
          </div>

          <h5 className="mt-3">Item Categories</h5>
          <div style={{ maxHeight: 150, overflowY: "auto" }}>
            {itemCategories.map((s) => (
              <div key={s.id}>
                <input type="checkbox" />
                <span className="ms-2">{s.name}</span>
              </div>
            ))}
          </div>

          <h5 className="mt-3">Companies</h5>
          <div style={{ maxHeight: 150, overflowY: "auto" }}>
            {companies.map((c) => (
              <div key={c.id}>
                <input type="checkbox" />
                <span className="ms-2">{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="col-md-9">
          <div className="sort-bar mb-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <h4 className="mb-0 text-white">Sort By :</h4>
                <span className="sort-option" onClick={() => handleSort("asc")}>A to Z</span>
                <span className="divider">|</span>
                <span className="sort-option" onClick={() => handleSort("desc")}>Z to A</span>
                <span className="divider">|</span>
                <span className="sort-option" onClick={() => handleSort("new")}>Newest</span>
                <span className="refresh-btn" onClick={handleRefresh}>🔄</span>
              </div>
              <h3 className="product-count">{products.length} Products</h3>
            </div>
          </div>

          <div className="row">
            {products.map((p) => (
              <div className="col-md-4 mb-3" key={p.id}>
                <div className="card product-card">
                  <img
                    src={`${IMAGE_BASE_URL}v1/${p.file_name}`}
                    className="product-img"
                  />
                  <div className="card-body">
                    <h6>{p.title}</h6>
                    <p>{p.company_name}</p>
                    <p>{p.state_name}</p>
                  </div>
                  <div className="card-footer text-center">
                    <button
                      className="btn view-btn"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div ref={loaderRef} style={{ height: "50px" }}></div>

          {loading && (
            <div className="text-center my-4">
              <div className="spinner-border text-primary"></div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default StateFolder;