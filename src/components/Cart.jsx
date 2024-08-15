import React from 'react';

const Cart = ({ cartItems, onRemove }) => {
  return (
    <div className="p-4 border rounded mt-4" data-aos="fade-up">
      <h2 className="text-lg font-bold mb-4">Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} className="mb-2 flex justify-between items-center">
              <div>
                <p>{item.title}</p>
                <p className="text-sm">${item.price}</p>
              </div>
              <button
                onClick={() => onRemove(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
