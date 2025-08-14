import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProductForm from "./components/features/product/ProductForm";
import ProductList from "./components/features/product/ProductList";
import { ProductProvider } from "./context/ProductContext";

function App() {
  return (
     <ProductProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/productform" element={<ProductForm />} />
         <Route path="/productlist" element={<ProductList />} />

      </Routes>
    </Router>
     </ProductProvider>
  );
}

export default App;