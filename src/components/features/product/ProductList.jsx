import { useProducts } from "../../../context/ProductContext";

export default function ProductList() {
  const { products, deleteProduct } = useProducts();

  return (
    <div>
      <h2>Danh sách sản phẩm</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price.toLocaleString()} đ</td>
              <td dangerouslySetInnerHTML={{ __html: p.description }} />
              <td>
                <button onClick={() => deleteProduct(p.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
