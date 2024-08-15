import React from 'react';

const Filter = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  sortOption, 
  setSortOption
}) => {
  // Ensure priceRange values are numbers
  const minPrice = priceRange.min || 0;
  const maxPrice = priceRange.max || 0;

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center flex-wrap gap-y-4">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) =>
            setPriceRange({ ...priceRange, min: e.target.value || 0 })
          }
          className="border p-2 rounded-lg mr-2 text-gray-700 outline-none"
          min="0"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) =>
            setPriceRange({ ...priceRange, max: e.target.value || 0 })
          }
          className="border p-2 rounded-lg text-gray-700 outline-none"
          min="0"
        />
      </div>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border p-2 rounded-lg text-gray-700 outline-none"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      className="border p-2 rounded-lg outline-none text-gray-700"
    >
      <option value="">Sort By</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="name-asc">Name: A-Z</option>
      <option value="name-desc">Name: Z-A</option>
    </select>
      
    </div>
  );
};

export default Filter;
