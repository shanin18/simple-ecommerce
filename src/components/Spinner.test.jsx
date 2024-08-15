import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Spinner from './Spinner'; // Adjust the path as necessary

describe('Spinner Component', () => {
  test('renders the spinner component', () => {
    render(<Spinner />);
    
    // Check if the spinner container element is in the document
    const spinnerContainer = screen.getByTestId('spinner-container');
    expect(spinnerContainer).toBeInTheDocument();
  });

  test('has correct styles applied', () => {
    render(<Spinner />);
    
    // Check if the spinner container has the correct styles
    const spinnerContainer = screen.getByTestId('spinner-container');
    const spinnerElement = spinnerContainer.querySelector('div');
    
    expect(spinnerElement).toHaveClass('animate-spin');
    expect(spinnerElement).toHaveClass('rounded-full');
    expect(spinnerElement).toHaveClass('h-10');
    expect(spinnerElement).toHaveClass('w-10');
    expect(spinnerElement).toHaveClass('border-t-4');
    expect(spinnerElement).toHaveClass('border-blue-500');
  });

  test('spinner is centered', () => {
    render(<Spinner />);
    
    // Check if the spinner container is centered
    const spinnerContainer = screen.getByTestId('spinner-container');
    expect(spinnerContainer).toHaveClass('flex');
    expect(spinnerContainer).toHaveClass('justify-center');
    expect(spinnerContainer).toHaveClass('items-center');
    expect(spinnerContainer).toHaveClass('h-64');
  });
});
