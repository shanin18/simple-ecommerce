import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar'; // Adjust the path as necessary

describe('SearchBar Component', () => {
  test('renders with the correct placeholder', () => {
    render(<SearchBar searchQuery="" setSearchQuery={() => {}} />);
    
    // Check if the placeholder text is rendered
    expect(screen.getByPlaceholderText('Search for products...')).toBeInTheDocument();
  });

  test('displays the current search query', () => {
    render(<SearchBar searchQuery="Test Query" setSearchQuery={() => {}} />);
    
    // Check if the input value matches the searchQuery prop
    expect(screen.getByPlaceholderText('Search for products...')).toHaveValue('Test Query');
  });

  test('calls setSearchQuery on input change', () => {
    const mockSetSearchQuery = jest.fn();
    render(<SearchBar searchQuery="" setSearchQuery={mockSetSearchQuery} />);
    
    // Simulate input change
    fireEvent.change(screen.getByPlaceholderText('Search for products...'), {
      target: { value: 'New Query' }
    });
    
    // Check if setSearchQuery was called with the correct value
    expect(mockSetSearchQuery).toHaveBeenCalledWith('New Query');
  });
});
