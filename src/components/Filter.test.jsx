import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Filter from './Filter'; // Adjust the path as necessary

describe('Filter Component', () => {
  // Mock functions for setState
  const mockSetSelectedCategory = jest.fn();
  const mockSetPriceRange = jest.fn();
  const mockSetSortOption = jest.fn();

  const categories = ['Electronics', 'Clothing', 'Books'];
  const priceRange = { min: 0, max: 1000 };
  const selectedCategory = '';
  const sortOption = '';

  beforeEach(() => {
    render(
      <Filter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={mockSetSelectedCategory}
        priceRange={priceRange}
        setPriceRange={mockSetPriceRange}
        sortOption={sortOption}
        setSortOption={mockSetSortOption}
      />
    );
  });

  test('renders input fields with correct initial values', () => {
    expect(screen.getByPlaceholderText('Min Price')).toHaveValue(priceRange.min);
    expect(screen.getByPlaceholderText('Max Price')).toHaveValue(priceRange.max);
  });

  test('updates priceRange when inputs change', () => {
    const minPriceInput = screen.getByPlaceholderText('Min Price');
    const maxPriceInput = screen.getByPlaceholderText('Max Price');

    fireEvent.change(minPriceInput, { target: { value: '50' } });
    expect(mockSetPriceRange).toHaveBeenCalledWith({ min: '50', max: priceRange.max });

    fireEvent.change(maxPriceInput, { target: { value: '500' } });
    expect(mockSetPriceRange).toHaveBeenCalledWith({ min: priceRange.min, max: '500' });
  });

  test('updates selectedCategory when category select changes', () => {
    const categorySelect = screen.getAllByRole('combobox')[0]; // Adjusted to target the correct select element

    fireEvent.change(categorySelect, { target: { value: 'Electronics' } });
    expect(mockSetSelectedCategory).toHaveBeenCalledWith('Electronics');
  });

  test('updates sortOption when sort select changes', () => {
    const sortSelect = screen.getAllByRole('combobox')[1]; // Adjusted to target the correct select element

    fireEvent.change(sortSelect, { target: { value: 'price-asc' } });
    expect(mockSetSortOption).toHaveBeenCalledWith('price-asc');
  });

  test('renders correct number of category options', () => {
    const categorySelect = screen.getAllByRole('combobox')[0];
    const options = within(categorySelect).getAllByRole('option');
    expect(options).toHaveLength(categories.length + 1); // +1 for "All Categories"
  });
});
