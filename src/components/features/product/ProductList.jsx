"use client"

import { useProducts } from "../../../context/ProductContext" // Đường dẫn tương đối
import { useNavigate } from "react-router-dom"

export default function ProductList() {
  const { products, deleteProduct } = useProducts()
  const navigate = useNavigate()

  const handleAddProductClick = () => {
    navigate("/productform")
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Danh sách sản phẩm</h2>
        <button
          onClick={handleAddProductClick}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Thêm sản phẩm mới
        </button>
      </div>
      {products.length === 0 ? (
        <p className="text-center text-gray-500 py-8">Chưa có sản phẩm nào. Hãy thêm một sản phẩm!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[150px]">
                  Tên sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]">
                  Giá
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mô tả
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-[150px]">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.price.toLocaleString()} đ</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div
                      className="prose prose-sm max-w-none overflow-hidden text-ellipsis whitespace-nowrap"
                      dangerouslySetInnerHTML={{ __html: p.description }}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => deleteProduct(p.id)} className="text-red-600 hover:text-red-900 ml-4">
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
