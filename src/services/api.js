const API_URL = "http://localhost:8080/api"

export async function getBrands() {
  const res = await fetch(`${API_URL}/brands`)
  return res.json()
}

export async function createBrand(data) {
  const res = await fetch(`${API_URL}/brands`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function deleteBrand(id) {
  await fetch(`${API_URL}/brands/${id}`, { method: "DELETE" })
}
export async function getBrandById(id) {
  const res = await fetch(`${API_URL}/brands/${id}`)
  if (!res.ok) throw new Error("Failed to fetch brand")
  return res.json()
}

export async function updateBrand(id, data) {
  const res = await fetch(`${API_URL}/brands/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return res.json()
}
