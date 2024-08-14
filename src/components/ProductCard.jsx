import React from "react";

const ProductCard = ({ product, onAddToCart, onSeeDetails }) => {
  return (
    <div className="border rounded p-4">
      <div className="flex flex-col justify-between min-h-full">
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-40 object-cover mb-4"
          />
          <h2 className="text-lg font-bold">{product.title}</h2>
          <p className="text-gray-600">${product.price}</p>
        </div>
        <div className="mt-2 flex flex-wrap justify-between gap-3">
          <button
            onClick={onAddToCart}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add to Cart
          </button>
          <button
            onClick={onSeeDetails}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            See Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
