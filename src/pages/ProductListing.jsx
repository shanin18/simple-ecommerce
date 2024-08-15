import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import Cart from "../components/Cart";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
import Filter from "../components/Filter";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { fetchProducts, fetchCategories } from "../services/productService";
import { BsGrid1X2, BsList } from "react-icons/bs";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState({
    min: 0,
    max: 1000,
  });
  const [sortOption, setSortOption] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };

    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        toast.error("Error fetching categories:", error);
      }
    };

    loadProducts();
    loadCategories();
  }, []);

  const handleSearch = (query) => {
    setSearchTerm(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (priceRange) => {
    setSelectedPriceRange({
      min: Number(priceRange.min) || 0,
      max: Number(priceRange.max) || 1000,
    });
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    setCurrentPage(1);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    setCartItems((prevCartItems) => [...prevCartItems, product]);
    toast.success("Item added!");
  };

  const handleRemoveFromCart = (index) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((_, i) => i !== index)
    );
    toast.success("Item removed!");
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
        product.price >= selectedPriceRange.min &&
        product.price <= selectedPriceRange.max
    )
    .sort((a, b) => {
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      if (sortOption === "name-asc") return a.title.localeCompare(b.title);
      if (sortOption === "name-desc") return b.title.localeCompare(a.title);
      return 0;
    });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="p-4">
      <SearchBar
        searchQuery={searchTerm}
        setSearchQuery={handleSearch}
      />
      <div className="flex justify-between lg:items-center flex-wrap gap-4">
        {/* Search and Filters */}
        <Filter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={handleCategoryChange}
          priceRange={selectedPriceRange}
          setPriceRange={handlePriceRangeChange}
          sortOption={sortOption}
          setSortOption={handleSortChange}
        />

        {/* View Mode Toggle */}
        <button
          onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          className="p-2 border rounded h-fit"
        >
          {viewMode === "grid" ? <BsList /> : <BsGrid1X2 />}
        </button>
      </div>

      {/* Product Listing */}
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {currentProducts.length > 0 ? (
            <div
              className={`${
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  : "space-y-4"
              } gap-4 mt-8`}
            >
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                  onSeeDetails={() => handleProductClick(product)}
                />
              ))}
            </div>
          ) : (
            <p className="text-lg text-center mt-8 w-full">
              No products found!
            </p>
          )}

          {/* Pagination */}
          <Pagination
            totalProducts={filteredProducts.length}
            productsPerPage={productsPerPage}
            currentPage={currentPage}
            onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
          />
        </div>
      )}

      {/* Cart and Modal */}
      <Cart cartItems={cartItems} onRemove={handleRemoveFromCart} />
      <ProductModal product={selectedProduct} onClose={handleCloseModal} />
    </div>
  );
};

export default ProductListing;
