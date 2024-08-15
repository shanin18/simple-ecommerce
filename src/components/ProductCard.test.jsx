import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ProductCard from './ProductCard'; // Adjust the path as necessary

describe('ProductCard Component', () => {
  const mockProduct = {
    image: 'https://example.com/image.jpg',
    title: 'Test Product',
    price: 99.99,
  };

  const mockOnAddToCart = jest.fn();
  const mockOnSeeDetails = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders product information correctly', () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={mockOnAddToCart}
        onSeeDetails={mockOnSeeDetails}
      />
    );

    // Check image source
    const image = screen.getByAltText('Test Product');
    expect(image).toBeTruthy(); // Check if image is present
    expect(image.src).toBe('https://example.com/image.jpg');

    // Check title
    const title = screen.getByText('Test Product');
    expect(title).toBeTruthy(); // Check if title is present

    // Check price
    const price = screen.getByText('$99.99');
    expect(price).toBeTruthy(); // Check if price is present
  });

  test('calls onAddToCart when Add to Cart button is clicked', () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={mockOnAddToCart}
        onSeeDetails={mockOnSeeDetails}
      />
    );

    fireEvent.click(screen.getByText('Add to Cart'));

    expect(mockOnAddToCart).toHaveBeenCalled();
  });

  test('calls onSeeDetails when See Details button is clicked', () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={mockOnAddToCart}
        onSeeDetails={mockOnSeeDetails}
      />
    );

    fireEvent.click(screen.getByText('See Details'));

    expect(mockOnSeeDetails).toHaveBeenCalled();
  });
});
