"use client"

import { useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
// import { useProducts } from "../../../context/ProductContext"; // Commented out: Not available in v0 environment
// import { useNavigate } from "react-router-dom"; // Commented out: Not available in v0 environment

export default function ProductForm() {
  // const { addProduct } = useProducts(); // Commented out
  // const navigate = useNavigate(); // Commented out

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [gender, setGender] = useState("")
  const [isFeatured, setIsFeatured] = useState(false)

  // New states for additional fields (concentration, origin, tags remain top-level)
  const [concentration, setConcentration] = useState("") // Nồng độ
  const [origin, setOrigin] = useState("") // Xuất xứ
  const [tags, setTags] = useState("") // Tags (ví dụ: chuỗi phân cách bằng dấu phẩy)

  // State mới cho các biến thể (variants)
  const [variants, setVariants] = useState([
    { id: 1, volume: "", price: "", quantity: "" }, // Biến thể mặc định
  ])
  const [nextVariantId, setNextVariantId] = useState(2) // Để tạo ID duy nhất cho biến thể mới

  // ✅ Toolbar với font chữ
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

  // ✅ Khai báo formats
  const formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "blockquote",
    "code-block",
    "link",
    "image",
    "video",
    "align",
  ]

  // Hàm xử lý khi thay đổi giá trị của một biến thể
  const handleVariantChange = (id, field, value) => {
    setVariants((prevVariants) =>
      prevVariants.map((variant) => (variant.id === id ? { ...variant, [field]: value } : variant)),
    )
  }

  // Hàm thêm một biến thể mới
  const handleAddVariant = () => {
    setVariants((prevVariants) => [...prevVariants, { id: nextVariantId, volume: "", price: "", quantity: "" }])
    setNextVariantId((prevId) => prevId + 1)
  }

  // Hàm xóa một biến thể
  const handleRemoveVariant = (id) => {
    setVariants((prevVariants) => prevVariants.filter((variant) => variant.id !== id))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Chuyển đổi tags thành mảng và lọc bỏ các tag rỗng
    const processedTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "")

    // Chuyển đổi giá và số lượng trong variants thành số
    const processedVariants = variants.map((variant) => ({
      ...variant,
      price: Number(variant.price),
      quantity: Number(variant.quantity),
    }))

    const productData = {
      name,
      description,
      gender,
      isFeatured,
      concentration,
      origin,
      tags: processedTags,
      variants: processedVariants, // Gửi mảng variants
    }

    // addProduct(productData); // Cập nhật hàm addProduct
    // navigate("/productlist"); // Commented out
    console.log(productData) // Log dữ liệu để kiểm tra
    alert("Dữ liệu sản phẩm đã được gửi! Kiểm tra console để biết chi tiết.")
  }

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Tạo sản phẩm nước hoa</h2>
      <p className="text-gray-600 mb-6">Điền thông tin chi tiết cho sản phẩm nước hoa mới.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Tên sản phẩm
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Nhập tên sản phẩm"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* New Gender Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Giới tính</label>
          <div className="flex space-x-6">
            <div className="flex items-center">
              <input
                type="radio"
                id="gender-male"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label htmlFor="gender-male" className="ml-2 block text-sm text-gray-900">
                Nam
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="gender-female"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label htmlFor="gender-female" className="ml-2 block text-sm text-gray-900">
                Nữ
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="gender-unisex"
                name="gender"
                value="unisex"
                checked={gender === "unisex"}
                onChange={(e) => setGender(e.target.value)}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label htmlFor="gender-unisex" className="ml-2 block text-sm text-gray-900">
                Unisex
              </label>
            </div>
          </div>
        </div>

        {/* New Featured Product Checkbox */}
        <div className="flex items-center">
          <input
            id="is-featured"
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <label htmlFor="is-featured" className="ml-2 block text-sm text-gray-900">
            Sản phẩm nổi bật
          </label>
        </div>

        {/* Variants Section */}
        <div className="space-y-4 border p-4 rounded-md bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800">Biến thể sản phẩm</h3>
          {variants.map((variant, index) => (
            <div key={variant.id} className="flex items-end space-x-4">
              <div className="flex-1 space-y-2">
                <label htmlFor={`volume-${variant.id}`} className="block text-sm font-medium text-gray-700">
                  Dung tích (ml)
                </label>
                <input
                  id={`volume-${variant.id}`}
                  type="text"
                  value={variant.volume}
                  onChange={(e) => handleVariantChange(variant.id, "volume", e.target.value)}
                  placeholder="Ví dụ: 50ml"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex-1 space-y-2">
                <label htmlFor={`price-${variant.id}`} className="block text-sm font-medium text-gray-700">
                  Giá
                </label>
                <input
                  id={`price-${variant.id}`}
                  type="number"
                  value={variant.price}
                  onChange={(e) => handleVariantChange(variant.id, "price", e.target.value)}
                  required
                  min="0"
                  placeholder="Giá của biến thể"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex-1 space-y-2">
                <label htmlFor={`quantity-${variant.id}`} className="block text-sm font-medium text-gray-700">
                  Số lượng
                </label>
                <input
                  id={`quantity-${variant.id}`}
                  type="number"
                  value={variant.quantity}
                  onChange={(e) => handleVariantChange(variant.id, "quantity", e.target.value)}
                  required
                  min="0"
                  placeholder="Số lượng tồn kho"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {variants.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveVariant(variant.id)}
                  className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Xóa
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddVariant}
            className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Thêm biến thể
          </button>
        </div>

        {/* Concentration Field */}
        <div className="space-y-2">
          <label htmlFor="concentration" className="block text-sm font-medium text-gray-700">
            Nồng độ
          </label>
          <input
            id="concentration"
            type="text"
            value={concentration}
            onChange={(e) => setConcentration(e.target.value)}
            placeholder="Ví dụ: EDP, EDT, EDC"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Origin Field */}
        <div className="space-y-2">
          <label htmlFor="origin" className="block text-sm font-medium text-gray-700">
            Xuất xứ
          </label>
          <input
            id="origin"
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Ví dụ: Pháp, Mỹ, Ý"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Tags Field */}
        <div className="space-y-2">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags (phân cách bằng dấu phẩy)
          </label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Ví dụ: hoa, gỗ, tươi mát, mùa hè"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Mô tả
          </label>
          <ReactQuill
            value={description}
            onChange={setDescription}
            modules={modules}
            formats={formats}
            theme="snow"
            className="min-h-[200px] border border-gray-300 rounded-md" // Thêm border và rounded cho Quill
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Lưu sản phẩm
          </button>
        </div>
      </form>
    </div>
  )
}
