import React, { useEffect, useState } from "react";
import axios from "axios";

const IMAGE_BASE_URL = "https://react-live.sourceindia-electronics.com/";

const Printed = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

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

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSubCategories();
    fetchCompanies();
  }, []);

  // ================= PRODUCTS + TOPBAR API (UPDATED) =================
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://react-live.sourceindia-electronics.com/v1/api/products?is_delete=0&status=1&is_approve=1&limit=15&page=1&category=1&sub_category=52&item_category_id=198"
      );

      const data = res.data.products || [];

      setProducts(data);
      setFilteredProducts(data);

      // ================= TOP BAR =================
      if (data.length > 0) {
        setTopInfo({
          category: data[0].category_name || "",
          subcategory: data[0].subcategory_name || "",
          itemCategory: data[0].item_category_name || "",
        });
      }

      // ================= STATES =================
      const uniqueStates = [];
      const seenStates = new Set();

      data.forEach((item) => {
        if (item.state_name && !seenStates.has(item.state_name)) {
          seenStates.add(item.state_name);
          uniqueStates.push({ name: item.state_name });
        }
      });

      setStates(uniqueStates);

      // ================= ITEM CATEGORIES =================
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
    }
  };

  // ================= SEARCH =================
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = products.filter((p) =>
      p.title?.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredProducts(filtered);
  };

  // ================= STATIC APIs (SAME) =================
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://react-live.sourceindia-electronics.com/v1/api/categories?is_delete=0"
      );
      setCategories(res.data || []);
    } catch (err) {}
  };

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
    } catch (err) {}
  };

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
          unique.push({ id: item.id, name });
        }
      });

      setCompanies(unique);
    } catch (err) {}
  };

  return (
    <div className="container-fluid mt-3">
      <div className="row">

        {/* ================= SIDEBAR ================= */}
        <div className="col-md-3">

          <h6>Search Products</h6>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={handleSearch}
          />

          <h5>States</h5>
          <div>
            {states.map((s, i) => (
              <div key={i}>
                <input type="checkbox" /> {s.name}
              </div>
            ))}
          </div>

          <h5>Categories</h5>
          <div>
            {categories.map((c) => (
              <div key={c.id}>
                <input type="checkbox" /> {c.name}
              </div>
            ))}
          </div>

          <h5>Sub Categories</h5>
          <div>
            {subCategories.map((s) => (
              <div key={s.id}>
                <input type="checkbox" /> {s.name}
              </div>
            ))}
          </div>

          <h5>Item Categories</h5>
          <div>
            {itemCategories.map((s) => (
              <div key={s.id}>
                <input type="checkbox" /> {s.name}
              </div>
            ))}
          </div>

          <h5>Companies</h5>
          <div>
            {companies.map((c) => (
              <div key={c.id}>
                <input type="checkbox" /> {c.name}
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

          {/* PRODUCTS */}
          <div className="row">
            {filteredProducts.map((p) => (
              <div className="col-md-4 mb-3" key={p.id}>
                <div className="card">

                  <img
                    src={`${IMAGE_BASE_URL}v1/${p.file_name}`}
                    alt={p.title}
                    style={{ width: "100%" }}
                  />

                  <div className="card-body">
                    <h6>{p.title}</h6>
                    <p>{p.company_name}</p>
                    <p>{p.state_name}</p>
                  </div>

                </div>
              </div>
            ))}

            {filteredProducts.length === 0 && (
              <div className="col-12 text-center">
                No products found
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default Printed;