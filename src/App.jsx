import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProductForm from "./components/features/product/ProductForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/productform" element={<ProductForm />} />
      </Routes>
    </Router>
  );
}

export default App;
