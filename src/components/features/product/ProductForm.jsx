import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useProducts } from "../../../context/ProductContext";
import { useNavigate } from "react-router-dom";

export default function ProductForm() {
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({ name, price: Number(price), description });
    navigate("/productlist");
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "auto" }}>
      <div>
        <label>Tên sản phẩm</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Giá</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Mô tả</label>
        <ReactQuill value={description} onChange={setDescription} />
      </div>

      <button type="submit">Lưu</button>
    </form>
  );
}
