// src/components/Cart.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cart from './Cart';

describe('Cart Component', () => {
  const mockOnRemove = jest.fn();

  test('renders Cart with empty state', () => {
    render(<Cart cartItems={[]} onRemove={mockOnRemove} />);
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  test('renders Cart with items and handles remove button click', () => {
    const cartItems = [
      { title: 'Product 1', price: 29.99 },
      { title: 'Product 2', price: 49.99 },
    ];

    render(<Cart cartItems={cartItems} onRemove={mockOnRemove} />);

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('$49.99')).toBeInTheDocument();

    const removeButtons = screen.getAllByText('Remove');
    fireEvent.click(removeButtons[0]);

    expect(mockOnRemove).toHaveBeenCalledTimes(1);
    expect(mockOnRemove).toHaveBeenCalledWith(0);
  });
});
