import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./bulma.min.css";
import mongoose from "mongoose";

// create a Mongoose schema for your data
const productSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  industry: String
});

// create a Mongoose model for your schema
const Product = mongoose.model("Product", productSchema);

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    // connect to your MongoDB database
    mongoose.connect("mongodb://localhost:27017/myapp", { useNewUrlParser: true, useUnifiedTopology: true });
    // fetch data from the database
    Product.find().then((products) => {
      setData(products);
      setFilteredData(products);
    });
  }, []);

  useEffect(() => {
    const results = data.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.industry.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm, data]);

  useEffect(() => {
    if (category) {
      const results = data.filter(
        (item) => item.industry.toLowerCase() === category.toLowerCase()
      );
      setFilteredData(results);
    } else {
      setFilteredData(data);
    }
  }, [category, data]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleClearFilter = () => {
    setCategory("");
  };
  // get current items based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData
    .slice(indexOfFirstItem, indexOfLastItem);

  // calculate number of pages
  const totalPages = Math.ceil(
    filteredData.length / itemsPerPage
  );

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const industries = [...new Set(data.map((item) => item.industry.toLowerCase()))];

  const suggestions = [...new Set([...industries, ...data.map((item) => item.title.toLowerCase()), ...data.map((item) => item.description.toLowerCase()),]),
  ];

  return (
    <div className="">

      <section class="hero is-primary">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Organic Vegetable Delivery Service
            </h1>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="columns">
            <div class="column is-one-third">
              <div class="field">
                <label class="label">Search</label>
                <div class="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Search for products or categories"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div class="column is-one-third">
              <div class="field">
                <label class="label">Select</label>
                <div class="control">
                  <div class="select is-fullwidth">

                    <select
                      className="form-select"
                      value={category}
                      onChange={handleCategoryChange}
                    >
                      <option value="">All</option>
                      {industries.map((industry) => (
                        <option key={uuidv4()} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div> 
            <div class="column is-one-third"><div class="field"><label class="label">..</label>
            {category && (
                      <button
                        type="button"
                        className="button"
                        onClick={handleClearFilter}
                      >
                        Clear Filter
                      </button>
                    )}
          </div></div></div>


          <div class="columns is-multiline">
            {currentItems.map((item) => (

              <div class="column is-one-third">
                <div class="card">
                  <div class="card-content">
                    <div class="content" key={item.id}>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <p>Industry: {item.industry}</p>
                    </div></div></div></div>

            ))}</div>

          {totalPages > 1 && (
            <div class="columns">
              <div class="column is-full">
                <nav class="pagination is-centered " role="navigation" aria-label="pagination">
                  <ul class="pagination-list">
                    {[...Array(totalPages)].map((_, index) => (
                      <li key={index}><a class=" pagination-link is-current" onClick={() => paginate(index + 1)} aria-label="Goto page 1">{index + 1}</a></li>

                    ))}</ul>
                </nav>
              </div>
            </div>



          )}

          <div class="columns">
            <div class="column is-half">
              <h3 class="title is-3">Subscribe to Our Newsletter</h3>
              <form action="">
                <div class="field has-addons">
                  <div class="control is-expanded">
                    <input
                      type="email"
                      className="input"
                      placeholder="abc@email.com"
                    />
                  </div>
                  <div class="control">
                    <button class="button is-primary" type="submit">Subscribe</button>
                  </div>
                </div>
              </form>
            </div>
          </div></div>
      </section>
    </div>
  );
}
export default App;