"use client"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createBrand, getBrandById, updateBrand } from "../../../services/api"

export default function BrandForm() {
  const [name, setName] = useState("")
  const [country, setCountry] = useState("")
  const [description, setDescription] = useState("")
  const [logoUrl, setLogoUrl] = useState("")
  const navigate = useNavigate()
  const { id } = useParams() // param khi edit

  useEffect(() => {
    if (id) {
      getBrandById(id).then((data) => {
        setName(data.name)
        setCountry(data.country)
        setDescription(data.description)
        setLogoUrl(data.logoUrl)
      })
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const brandData = { name, country, description, logoUrl }

    try {
      if (id) {
        await updateBrand(id, brandData)
        alert("Cập nhật brand thành công!")
      } else {
        await createBrand(brandData)
        alert("Thêm brand thành công!")
      }
      navigate("/brandlist")
    } catch (error) {
      console.error("Error saving brand:", error)
      alert("Lỗi khi lưu brand")
    }
  }

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md text-gray-900">
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Chỉnh sửa Brand" : "Thêm Brand mới"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Tên brand</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium">Quốc gia</label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        {/* Logo URL */}
        <div>
          <label className="block text-sm font-medium">Logo URL</label>
          <input
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Mô tả</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          {id ? "Cập nhật Brand" : "Lưu Brand"}
        </button>
      </form>
    </div>
  )
}
