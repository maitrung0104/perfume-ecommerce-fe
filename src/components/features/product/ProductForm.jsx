"use client"

import { useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useProducts } from "../../../context/ProductContext";
import { useNavigate } from "react-router-dom";

export default function ProductForm() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [gender, setGender] = useState("")
  const [isFeatured, setIsFeatured] = useState(false)
  const [concentration, setConcentration] = useState("")
  const [origin, setOrigin] = useState("")
  const [tags, setTags] = useState("")
  const [variants, setVariants] = useState([{ id: 1, volume: "", price: "", quantity: "" }])
  const [nextVariantId, setNextVariantId] = useState(2)
  const [imageUrls, setImageUrls] = useState([""])

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
      [{ align: [] }],
    ],
  }
const { addProduct } = useProducts();
const navigate = useNavigate();

  const formats = [
    "font", "header", "bold", "italic", "underline", "strike", "color",
    "background", "list", "bullet", "blockquote", "code-block", "link", "image", "video", "align"
  ]

  const handleVariantChange = (id, field, value) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    )
  }

  const handleAddVariant = () => {
    setVariants((prev) => [...prev, { id: nextVariantId, volume: "", price: "", quantity: "" }])
    setNextVariantId((prevId) => prevId + 1)
  }

  const handleRemoveVariant = (id) => {
    setVariants((prev) => prev.filter((v) => v.id !== id))
  }

  const handleImageUrlChange = (index, value) => {
    const updated = [...imageUrls]
    updated[index] = value
    setImageUrls(updated)
  }

  const handleAddImageUrl = () => {
    setImageUrls([...imageUrls, ""])
  }

  const handleRemoveImageUrl = (index) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const processedTags = tags.split(",").map((t) => t.trim()).filter((t) => t !== "")
    const processedVariants = variants.map((v) => ({
      ...v,
      price: Number(v.price),
      quantity: Number(v.quantity),
    }))
    const processedImages = imageUrls.filter((url) => url.trim() !== "")

    const productData = {
      name,
      description,
      gender,
      isFeatured,
      concentration,
      origin,
      tags: processedTags,
      variants: processedVariants,
      images: processedImages
    }

  addProduct(productData); 
    alert("Đã gửi sản phẩm!");
      navigate("/productlist"); // ✅ chuyển về ProductList

  }

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md text-gray-900">
      <h2 className="text-2xl font-bold mb-4">Tạo sản phẩm nước hoa</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Tên sản phẩm</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium">Giới tính</label>
          <div className="flex gap-4">
            {["male", "female", "unisex"].map((g) => (
              <label key={g} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={gender === g}
                  onChange={(e) => setGender(e.target.value)}
                />
                {g}
              </label>
            ))}
          </div>
        </div>

        {/* Featured */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
          />
          <label>Sản phẩm nổi bật</label>
        </div>

        {/* Variants */}
        <div className="border p-4 rounded-md bg-gray-50 space-y-4">
          <h3 className="font-semibold">Biến thể</h3>
          {variants.map((variant) => (
            <div key={variant.id} className="flex gap-4">
              <input
                placeholder="Dung tích"
                value={variant.volume}
                onChange={(e) => handleVariantChange(variant.id, "volume", e.target.value)}
                className="border px-2 py-1 rounded"
              />
              <input
                placeholder="Giá"
                type="number"
                value={variant.price}
                onChange={(e) => handleVariantChange(variant.id, "price", e.target.value)}
                className="border px-2 py-1 rounded"
              />
              <input
                placeholder="Số lượng"
                type="number"
                value={variant.quantity}
                onChange={(e) => handleVariantChange(variant.id, "quantity", e.target.value)}
                className="border px-2 py-1 rounded"
              />
              {variants.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveVariant(variant.id)}
                  className="bg-red-500 text-white px-3 rounded"
                >
                  Xóa
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddVariant}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Thêm biến thể
          </button>
        </div>

        {/* Concentration */}
        <input
          placeholder="Nồng độ"
          value={concentration}
          onChange={(e) => setConcentration(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />

        {/* Origin */}
        <input
          placeholder="Xuất xứ"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />

        {/* Tags */}
        <input
          placeholder="Tags (cách nhau bằng dấu phẩy)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />

        {/* Nhập nhiều URL ảnh */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Link ảnh sản phẩm</label>
          {imageUrls.map((url, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder="https://..."
                value={url}
                onChange={(e) => handleImageUrlChange(index, e.target.value)}
                className="flex-1 border px-3 py-2 rounded"
              />
              {imageUrls.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveImageUrl(index)}
                  className="bg-red-500 text-white px-3 rounded"
                >
                  X
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddImageUrl}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            + Thêm link ảnh
          </button>
        </div>

        {/* Description */}
        <div className="mt-4">
          <label className="block text-sm font-medium">Mô tả</label>
          <ReactQuill
            value={description}
            onChange={setDescription}
            modules={modules}
            formats={formats}
            theme="snow"
            className="min-h-[200px] border rounded bg-white text-gray-900"
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Lưu sản phẩm
        </button>
      </form>
    </div>
  )
}
