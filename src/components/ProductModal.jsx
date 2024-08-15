import React from 'react';

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70"
      data-aos="fade-in"
      data-testid="modal" // Add this line
    >
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-lg w-full m-4">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-cover mb-4"
        />
        <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
        <p className="text-gray-700 mb-4">${product.price}</p>
        <p className="text-gray-700">{product.description}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
