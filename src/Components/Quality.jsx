import React, { useEffect, useState } from "react";
import axios from "axios";

const IMAGE_BASE_URL = "https://react-live.sourceindia-electronics.com/";

const StateFolder = () => {
  const [states, setStates] = useState([]);
  const [products, setProducts] = useState([]);
  const [itemCategories, setItemCategories] = useState([]);

  // 🔥 SEARCH
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStates();
    fetchProducts();
    fetchItemCategories();
  }, []);

  // 🔹 STATES API
  const fetchStates = async () => {
    try {
      const res = await axios.get(
        "https://react-live.sourceindia-electronics.com/v1/api/location/states/101"
      );

      setStates(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 PRODUCTS API
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://react-live.sourceindia-electronics.com/v1/api/products?is_delete=0&status=1&is_approve=1&limit=15&page=1&category=1&sub_category=9&item_category_id=17"
      );

      setProducts(res.data.products || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 ITEM CATEGORY API (YOUR DATA)
  const fetchItemCategories = async () => {
    try {
      const res = await axios.get(
        "https://react-live.sourceindia-electronics.com/v1/api/item_sub_category/by-selected-category-subcategory-itemcategory"
      );

      console.log("ITEM CATEGORY:", res.data);

      setItemCategories(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
      setItemCategories([]);
    }
  };

  // 🔥 SEARCH API
  const fetchSearchProducts = async (value) => {
    try {
      setSearchLoading(true);

      const res = await axios.get(
        `https://react-live.sourceindia-electronics.com/v1/api/seo_pages/slug/products?search=${value}`
      );

      setSearchResults(res.data.products || []);
    } catch (error) {
      console.log(error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value.length > 2) {
      fetchSearchProducts(value);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="container-fluid mt-3">
      <div className="row">

        {/* ================= SIDEBAR ================= */}
        <div className="col-md-3">

          {/* 🔹 STATES */}
          <h5>States</h5>

          {states.map((state) => (
            <div key={state.id} className="mb-2 p-2 border rounded">
              <strong>{state.name}</strong>
              <p className="mb-0">📦 {state.product_count}</p>
            </div>
          ))}

          {/* 🔹 SEARCH */}
          <div className="mt-4">
            <h6>Search Products</h6>

            <input
              type="text"
              className="form-control"
              placeholder="Search product..."
              value={searchText}
              onChange={handleSearch}
            />

            {searchText.length > 2 && (
              <div className="border mt-2 p-2 rounded">

                {searchLoading && <p>Loading...</p>}

                {!searchLoading && searchResults.length === 0 && (
                  <p>No products found</p>
                )}

                {searchResults.map((item) => (
                  <div key={item.id} className="d-flex mb-2">

                    <img
                      src={
                        item.file_name
                          ? `${IMAGE_BASE_URL}v1/${item.file_name}`
                          : "https://via.placeholder.com/50"
                      }
                      alt={item.title}
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                        marginRight: "8px",
                      }}
                    />

                    <small>{item.title}</small>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 🔥 ITEM CATEGORIES (YOUR API DATA) */}
          <h5 className="mt-4">Item Categories</h5>

          {itemCategories.length > 0 ? (
            itemCategories.map((item) => (
              <div
                key={item.id}
                className="mb-2 p-2 border rounded"
                style={{ cursor: "pointer" }}
              >
                <strong>{item.name}</strong>

                <p className="mb-0 text-muted small">
                  {item.SubCategories?.name}
                </p>

                <p className="mb-0 text-success small">
                  📦 {item.product_count}
                </p>
              </div>
            ))
          ) : (
            <p>No item categories found</p>
          )}

        </div>

        {/* ================= PRODUCTS ================= */}
        <div className="col-md-9">

          <h5>Products</h5>

          {loading && <p>Loading products...</p>}

          <div className="row">
            {products.map((item) => (
              <div className="col-md-4 mb-4" key={item.id}>
                <div className="card h-100 shadow-sm p-2">

                  <img
                    src={
                      item.file_name
                        ? `${IMAGE_BASE_URL}v1/${item.file_name}`
                        : "https://via.placeholder.com/150"
                    }
                    alt={item.title}
                    className="img-fluid mb-2"
                    style={{ height: "120px", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />

                  <h6>{item.title}</h6>

                  <p className="text-muted mb-1">
                    {item.company_name}
                  </p>

                  <p className="mb-1">
                    📍 {item.state_name}
                  </p>

                  <p className="small text-secondary">
                    {item.item_category_name}
                  </p>

                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

export default StateFolder;