const API_URL = "http://localhost:8080/api";

// 🔑 Helper: gắn Authorization header nếu có token
function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/* =====================
   🔹 AUTH API
===================== */
export async function login(data) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Login failed");
  }

  return res.json();
}

export async function register(data) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Register failed");
  }

  return res.json();
}

/* =====================
   🔹 BRAND API
===================== */
export async function getBrands() {
  const res = await fetch(`${API_URL}/brands`);
  return res.json();
}

export async function createBrand(data) {
  const res = await fetch(`${API_URL}/brands`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create brand");
  return res.json();
}

export async function deleteBrand(id) {
  const res = await fetch(`${API_URL}/brands/${id}`, {
    method: "DELETE",
    headers: { ...authHeader() },
  });

  if (!res.ok) throw new Error("Failed to delete brand");
}

export async function getBrandById(id) {
  const res = await fetch(`${API_URL}/brands/${id}`);
  if (!res.ok) throw new Error("Failed to fetch brand");
  return res.json();
}

export async function updateBrand(id, data) {
  const res = await fetch(`${API_URL}/brands/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update brand");
  return res.json();
}
