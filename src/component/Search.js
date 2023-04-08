import React from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="column is-one-third">
      <div className="field">
        <label className="label">Search</label>
        <div className="control">
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
  );
};

export default Search;
