import React from "react";

const Spinner = () => (
  <div
    className="flex justify-center items-center h-64"
    data-testid="spinner-container"
  >
    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500" />
  </div>
);

export default Spinner;
