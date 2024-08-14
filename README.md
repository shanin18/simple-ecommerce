# E-Commerce Product Listing

A simple e-commerce product listing page built with React.js, Vite, Tailwind CSS, and Axios. This project demonstrates the ability to fetch, display, filter, search, and sort product data from the FakeStoreAPI. It also includes a cart functionality and a modal for detailed product views.

## Features

- **Product Listing:** Fetch and display products from the FakeStoreAPI.
- **Search Functionality:** Search products by name with real-time updates.
- **Filtering:** Filter products based on categories, price range, and availability.
- **Sorting:** Sort products by price (ascending/descending), name (alphabetically), and rating.
- **Responsive Design:** Fully responsive layout for mobile, tablet, and desktop views.
- **Product Modal:** View detailed product information in a modal.
- **Cart Functionality:** Add products to a cart and remove items from it.

## Technologies

- **React.js:** A JavaScript library for building user interfaces.
- **Vite:** A modern build tool that provides a fast development environment.
- **Tailwind CSS:** A utility-first CSS framework for styling.
- **Axios:** A promise-based HTTP client for making API requests.

## Installation

### Prerequisites

- Node.js and npm (or yarn) installed on your machine.

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/e-commerce-product-listing.git
   Navigate to the Project Directory
   ```

bash
Copy code
cd e-commerce-product-listing
Install Dependencies

Using npm:

bash
Copy code
npm install
Or using yarn:

bash
Copy code
yarn install
Start the Development Server

Using npm:

bash
Copy code
npm run dev
Or using yarn:

bash
Copy code
yarn dev
Open your browser and navigate to http://localhost:3000 to see the application.

Usage
Search Products: Type in the search bar to filter products by name.
Filter Products: Use the category dropdown and price range inputs to filter products.
Sort Products: Choose sorting options to organize products by price or name.
View Product Details: Click the "See Details" button on a product card to view more information in a modal.
Add to Cart: Click the "Add to Cart" button to add items to your cart.
View Cart: Click on the cart icon to view and manage cart items.
Folder Structure
css
Copy code
src/
│
├── components/
│ ├── Cart.js
│ ├── ProductCard.js
│ ├── ProductModal.js
│ └── ...
│
├── pages/
│ └── ProductListing.js
│
├── services/
│ └── productService.js
│
├── App.js
├── index.js
└── ...
Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/YourFeature).
Commit your changes (git commit -am 'Add some feature').
Push to the branch (git push origin feature/YourFeature).
Create a new Pull Request.
