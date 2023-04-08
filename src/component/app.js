import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./bulma.min.css";
import Search from "./Search";
import Paginate from "./Paginate";
import Card from "./Card";
import Category from "./Category";
import Subscribe from "./Subscribe";

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    fetch("https://api.npoint.io/e50104108f2ecba82a45")
      .then((response) => response.json())
      .then((data) => {
        setData(data.page);
        setFilteredData(data.page);
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
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // calculate number of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  const industries = [...new Set(data.map((item) => item.industry.toLowerCase())),];

  const suggestions = [
    ...new Set([
      ...industries,
      ...data.map((item) => item.title.toLowerCase()),
      ...data.map((item) => item.description.toLowerCase()),
    ]),
  ];

  return (
    <div className="">
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Category
        category={category}
        handleCategoryChange={handleCategoryChange}
        handleClearFilter={handleClearFilter}
        industries={industries}
      />
      <div className="columns is-multiline">
        {currentItems.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
      {totalPages > 1 && (
        <Paginate totalPages={totalPages} paginate={paginate} />
      )}
      <Subscribe />
    </div>
  );
}

export default App;
