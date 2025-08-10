import { useEffect, useState } from "react";
import { api } from "../../services/api";
import ProductForm from "./ProductForm";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    api.getProducts().then(setProducts);
  }, []);

  const handleSave = (data) => {
    if (editing) {
      api.updateProduct(editing.id, data).then(() => {
        setEditing(null);
        api.getProducts().then(setProducts);
      });
    } else {
      api.createProduct(data).then(() => {
        api.getProducts().then(setProducts);
      });
    }
  };

  return (
    <div>
      <h2>Quản lý sản phẩm</h2>
      <ProductForm onSubmit={handleSave} initialData={editing} />

      <table>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Giá</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td dangerouslySetInnerHTML={{ __html: p.description }} />
              <td>
                <button onClick={() => setEditing(p)}>Sửa</button>
                <button onClick={() => api.deleteProduct(p.id).then(() => api.getProducts().then(setProducts))}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
