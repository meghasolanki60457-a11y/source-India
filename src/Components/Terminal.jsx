import React, { useEffect, useState } from "react";
import axios from "axios";

const IMAGE_BASE_URL =
  "https://react-live.sourceindia-electronics.com/";

const Terminal = () => {
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

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSubCategories();
    fetchCompanies();
  }, []);

  // ================= PRODUCTS (ONLY API UPDATED) =================
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://react-live.sourceindia-electronics.com/v1/api/products?is_delete=0&status=1&is_approve=1&limit=15&page=1&category=1&sub_category=20&item_category_id=44"
      );

      const data = res.data.products || [];
      setProducts(data);

      // TOP BAR (UNCHANGED)
      if (data.length > 0) {
        setTopInfo({
          category: data[0].category_name || "",
          subcategory: data[0].subcategory_name || "",
          itemCategory: data[0].item_category_name || "",
        });
      }

      // STATES (UNCHANGED)
      const uniqueStates = [];
      const seenStates = new Set();

      data.forEach((item) => {
        if (item.state_name && !seenStates.has(item.state_name)) {
          seenStates.add(item.state_name);
          uniqueStates.push({ name: item.state_name });
        }
      });

      setStates(uniqueStates);

      // ITEM CATEGORY (UNCHANGED)
      const uniqueItem = [];
      const seenItem = new Set();

      data.forEach((item) => {
        if (item.item_category_name && !seenItem.has(item.item_category_name)) {
          seenItem.add(item.item_category_name);
          uniqueItem.push({
            id: item.item_category_id,
            name: item.item_category_name,
          });
        }
      });

      setItemCategories(uniqueItem);

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

        {/* ================= SIDEBAR (UNCHANGED) ================= */}
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

        {/* ================= PRODUCTS ================= */}
        <div className="col-md-9">

          {/* TOP BAR */}
          <div className="mb-3 p-3 bg-light border rounded">
            <h5>
              {topInfo.category} {" > "} {topInfo.subcategory}
            </h5>
            <p className="mb-0 text-muted">
              {topInfo.itemCategory}
            </p>
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
                    <button className="btn view-btn">View</button>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

export default Terminal;