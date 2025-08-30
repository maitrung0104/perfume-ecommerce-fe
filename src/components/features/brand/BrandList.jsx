"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getBrands, deleteBrand, getBrandById } from "../../../services/api"

export default function BrandList() {
  const [brands, setBrands] = useState([])
  const [selectedBrand, setSelectedBrand] = useState(null)
  const navigate = useNavigate()

  const loadBrands = async () => {
    try {
      const data = await getBrands()
      setBrands(data)
    } catch (error) {
      console.error("Error fetching brands:", error)
    }
  }

  useEffect(() => {
    loadBrands()
  }, [])

  const handleAddBrandClick = () => {
    navigate("/brandform")
  }

  const handleEdit = (id) => {
    navigate(`/brandform/${id}`) // chuyển sang trang BrandForm với id
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa brand này?")) return
    try {
      await deleteBrand(id)
      loadBrands()
    } catch (error) {
      console.error("Error deleting brand:", error)
    }
  }

  const handleView = async (id) => {
    try {
      const brand = await getBrandById(id)
      setSelectedBrand(brand)
    } catch (error) {
      console.error("Error fetching brand detail:", error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md text-gray-900">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Danh sách Brand</h2>
        <button
          onClick={handleAddBrandClick}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          + Thêm Brand
        </button>
      </div>

      {brands.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          Chưa có brand nào. Hãy thêm một brand!
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Logo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quốc gia</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mô tả</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Hành động</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {brands.map((b) => (
                <tr key={b.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {b.logoUrl ? (
                      <img src={b.logoUrl} alt={b.name} className="w-16 h-16 object-contain rounded-md border" />
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{b.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{b.country}</td>
<td className="px-6 py-4 text-sm text-gray-500 max-w-sm break-words">
  {b.description}
</td>                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleView(b.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Xem
                    </button>
                    <button
                      onClick={() => handleEdit(b.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal xem chi tiết */}
      {selectedBrand && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <h3 className="text-xl font-bold mb-4">{selectedBrand.name}</h3>
            {selectedBrand.logoUrl && (
              <img
                src={selectedBrand.logoUrl}
                alt={selectedBrand.name}
                className="w-32 h-32 object-contain mb-4 mx-auto"
              />
            )}
            <p><strong>Quốc gia:</strong> {selectedBrand.country}</p>
            <p className="mt-2 text-gray-700">{selectedBrand.description}</p>

            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => navigate(`/brandform/${selectedBrand.id}`)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
              >
                Sửa
              </button>
              <button
                onClick={() => setSelectedBrand(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
