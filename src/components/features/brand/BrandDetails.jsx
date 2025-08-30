import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getBrandById } from "../../../services/api"

export default function BrandDetail() {
  const { id } = useParams()
  const [brand, setBrand] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getBrandById(id).then(setBrand)
  }, [id])

  if (!brand) return <p className="text-center">Đang tải...</p>

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md text-gray-900">
      <h2 className="text-2xl font-bold mb-4">{brand.name}</h2>
      {brand.logoUrl && (
        <img src={brand.logoUrl} alt={brand.name} className="w-32 h-32 object-contain mb-4" />
      )}
      <p><strong>Quốc gia:</strong> {brand.country}</p>
      <p className="mt-2">{brand.description}</p>

      <button
        onClick={() => navigate("/brandlist")}
        className="mt-6 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
      >
        Quay lại
      </button>
    </div>
  )
}
