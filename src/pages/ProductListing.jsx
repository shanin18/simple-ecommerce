import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import Cart from "../components/Cart";
import { fetchProducts } from "../services/productService";
import toast, { Toaster } from "react-hot-toast";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 1000]);
  const [sortOption, setSortOption] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
      })
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlePriceRangeChange = (min, max) => {
    setSelectedPriceRange([min, max]);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    setCartItems((prevCartItems) => [...prevCartItems, product]);
    toast.success('Item added!');
  };

  const handleRemoveFromCart = (index) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((_, i) => i !== index)
    );

    toast.success("item removed!")
  };

  // Apply search, filter, and sort logic to products
  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    )
    .filter(
      (product) =>
        product.price >= selectedPriceRange[0] &&
        product.price <= selectedPriceRange[1]
    )
    .sort((a, b) => {
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      if (sortOption === "name-asc") return a.title.localeCompare(b.title);
      if (sortOption === "name-desc") return b.title.localeCompare(a.title);
      return 0;
    });

  return (
    <div className="p-4">
      {/* Search and Filters */}
      <div className="flex flex-wrap flex-row items-center md:justify-between md:mb-4 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border rounded mb-2 md:mb-0 md:mr-4"
        />
        <select
          onChange={handleCategoryChange}
          className="p-2 border rounded mb-2 md:mb-0 md:mr-4"
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
        <select
          onChange={handleSortChange}
          className="p-2 border rounded mb-2 md:mb-0"
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A-Z</option>
          <option value="name-desc">Name: Z-A</option>
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="flex flex-wrap gap-y-3 items-center mb-4">
        <label className="mr-2">Price Range:</label>
        <div>
          <input
            type="number"
            value={selectedPriceRange[0]}
            onChange={(e) =>
              handlePriceRangeChange(
                Number(e.target.value),
                selectedPriceRange[1]
              )
            }
            className="p-2 border rounded mr-2"
            min="0"
          />
          <span className="mr-2">to</span>
          <input
            type="number"
            value={selectedPriceRange[1]}
            onChange={(e) =>
              handlePriceRangeChange(
                selectedPriceRange[0],
                Number(e.target.value)
              )
            }
            className="p-2 border rounded"
            min="0"
          />
        </div>
      </div>

      {/* Product Listing and Cart */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                  onSeeDetails={() => handleProductClick(product)}
                />
              ))}
            </div>
          ) : (
            <p className="font-medium text-gray-700 text-center mt-8">
              No products found!
            </p>
          )}
        </div>
        <Cart cartItems={cartItems} onRemove={handleRemoveFromCart} />
      </div>

      {/* Product Modal */}
      <ProductModal product={selectedProduct} onClose={handleCloseModal} />
    </div>
  );
};

export default ProductListing;
