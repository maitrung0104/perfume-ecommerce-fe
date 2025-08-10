import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function ProductForm({ onSubmit, initialData }) {
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price || "");
  const [description, setDescription] = useState(initialData?.description || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, price, description });
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
