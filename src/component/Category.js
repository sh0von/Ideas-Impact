import React from "react";
import { v4 as uuidv4 } from "uuid";

const Category = ({ category, handleCategoryChange, industries, handleClearFilter }) => {
  return (
    <div className="column is-one-third">
      <div className="field">
        <label className="label">Select</label>
        <div className="control">
          <div className="select is-fullwidth">
            <select className="form-select" value={category} onChange={handleCategoryChange}>
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
      {category && (
        <div className="field">
          <label className="label">..</label>
          <button type="button" className="button" onClick={handleClearFilter}>
            Clear Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default Category;
