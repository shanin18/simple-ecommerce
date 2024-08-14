import { Toaster } from "react-hot-toast";
import ProductListing from "./pages/ProductListing";

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Our Products</h1>
      <ProductListing />
      <Toaster />
    </div>
  );
};

export default App;
