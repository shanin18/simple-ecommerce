import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import toast from 'react-hot-toast';
import { fetchProducts, fetchCategories, fetchProductsByCategory } from '../services/productService';

const mock = new MockAdapter(axios);

beforeEach(() => {
  mock.reset();
});

test('fetchProducts should return data on success', async () => {
  const mockData = [{ id: 1, title: 'Product 1' }];
  mock.onGet('https://fakestoreapi.com/products').reply(200, mockData);

  const result = await fetchProducts();
  expect(result).toEqual(mockData);
});

test('fetchProducts should call toast.error on error', async () => {
  mock.onGet('https://fakestoreapi.com/products').reply(500);

  // Mock toast.error to test if it's called
  const toastError = jest.spyOn(toast, 'error').mockImplementation();

  await expect(fetchProducts()).rejects.toThrow();

  expect(toastError).toHaveBeenCalledWith('Error fetching products:', expect.any(Error));
  toastError.mockRestore();
});

test('fetchCategories should return data on success', async () => {
  const mockData = ['Category 1', 'Category 2'];
  mock.onGet('https://fakestoreapi.com/products/categories').reply(200, mockData);

  const result = await fetchCategories();
  expect(result).toEqual(mockData);
});

test('fetchCategories should call toast.error on error', async () => {
  mock.onGet('https://fakestoreapi.com/products/categories').reply(500);

  // Mock toast.error to test if it's called
  const toastError = jest.spyOn(toast, 'error').mockImplementation();

  await expect(fetchCategories()).rejects.toThrow();

  expect(toastError).toHaveBeenCalledWith('Error fetching categories');
  toastError.mockRestore();
});

test('fetchProductsByCategory should return data on success', async () => {
  const category = 'electronics';
  const mockData = [{ id: 1, title: 'Electronics Product' }];
  mock.onGet(`https://fakestoreapi.com/products/category/${category}`).reply(200, mockData);

  const result = await fetchProductsByCategory(category);
  expect(result).toEqual(mockData);
});

test('fetchProductsByCategory should call toast.error on error', async () => {
  const category = 'electronics';
  mock.onGet(`https://fakestoreapi.com/products/category/${category}`).reply(500);

  // Mock toast.error to test if it's called
  const toastError = jest.spyOn(toast, 'error').mockImplementation();

  await expect(fetchProductsByCategory(category)).rejects.toThrow();

  expect(toastError).toHaveBeenCalledWith('Error fetching products by category');
  toastError.mockRestore();
});
