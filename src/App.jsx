import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProductForm from "./components/features/product/ProductForm";
import ProductList from "./components/features/product/ProductList";
import { ProductProvider } from "./context/ProductContext";
import BrandForm from "./components/features/brand/BrandForm";
import BrandList from "./components/features/brand/BrandList";
import BrandDetail from "./components/features/brand/BrandDetails";


function App() {
  return (
     <ProductProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      
        <Route path="/productform" element={<ProductForm />} />
        <Route path="/productlist" element={<ProductList />} />
      
        <Route path="/brandform" element={<BrandForm />} />
        <Route path="/brandform/:id" element={<BrandForm />} />   {/* Sửa */}

        <Route path="/brandlist" element={<BrandList />} />
        <Route path="/brandlist" element={<BrandList />} />

      </Routes>
    </Router>
     </ProductProvider>
  );
}

export default App;