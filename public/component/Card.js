import React from "react";

const Card = ({ item }) => {
  return (
    <div className="column is-one-third">
      <div className="card">
        <div className="card-content">
          <div className="content" key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>Industry: {item.industry}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
