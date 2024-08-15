import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './Pagination'; // Adjust the path as necessary

describe('Pagination Component', () => {
  const onPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders pagination buttons correctly', () => {
    render(
      <Pagination
        totalProducts={50}
        productsPerPage={10}
        currentPage={1}
        onPageChange={onPageChange}
      />
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5); // 5 buttons: 1 for each page

    buttons.forEach(button => {
      expect(button).toBeInTheDocument();
    });
  });

  test('calls onPageChange when a page number is clicked', () => {
    render(
      <Pagination
        totalProducts={50}
        productsPerPage={10}
        currentPage={1}
        onPageChange={onPageChange}
      />
    );

    const pageButton = screen.getByText('2');
    fireEvent.click(pageButton);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  test('highlights the current page button', () => {
    render(
      <Pagination
        totalProducts={50}
        productsPerPage={10}
        currentPage={2}
        onPageChange={onPageChange}
      />
    );

    const currentPageButton = screen.getByText('2');
    expect(currentPageButton).toHaveClass('bg-blue-500 text-white');
  });
});
