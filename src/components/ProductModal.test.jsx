import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductModal from './ProductModal'; // Adjust the path as necessary

describe('ProductModal Component', () => {
  const mockOnClose = jest.fn();
  const mockProduct = {
    image: 'https://example.com/image.jpg',
    title: 'Test Product',
    price: '99.99',
    description: 'This is a test product description.'
  };

  test('renders product information correctly', () => {
    render(<ProductModal product={mockProduct} onClose={mockOnClose} />);

    // Check if image, title, price, and description are rendered
    expect(screen.getByAltText('Test Product')).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('This is a test product description.')).toBeInTheDocument();
  });

  test('calls onClose when the close button is clicked', () => {
    render(<ProductModal product={mockProduct} onClose={mockOnClose} />);

    // Check if the close button is rendered
    expect(screen.getByText('Close')).toBeInTheDocument();

    // Simulate button click
    fireEvent.click(screen.getByText('Close'));

    // Check if onClose is called
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('does not render when product is not provided', () => {
    render(<ProductModal product={null} onClose={mockOnClose} />);

    // The modal should not be in the document if no product is provided
    expect(screen.queryByText('Close')).not.toBeInTheDocument();
  });

  test('has AOS attribute for animation', () => {
    render(<ProductModal product={mockProduct} onClose={mockOnClose} />);

    // Check if the AOS attribute is present
    expect(screen.getByTestId('modal')).toHaveAttribute('data-aos', 'fade-in');
  });
});
