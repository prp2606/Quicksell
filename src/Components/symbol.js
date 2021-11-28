import React from "react";

const Symbol = ({ symbol, _id }) => {
  return (
    <div className="btn" id={_id}>
      <p>{symbol}</p>
    </div>
  );
};

export default Symbol;
