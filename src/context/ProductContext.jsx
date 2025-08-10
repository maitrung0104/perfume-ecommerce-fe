import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now() }]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
