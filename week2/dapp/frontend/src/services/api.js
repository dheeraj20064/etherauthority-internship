import axios from "axios"
import { API_URL } from "../config/contracts"

// Create axios instance with base URL
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

// ─── INTERN APIs ───────────────────────────────

// Register new intern → POST /api/interns/register
export const registerIntern = async (internData) => {
    const response = await api.post(
        "/api/interns/register", 
        internData
    )
    return response.data
}

// Get all interns → GET /api/interns
export const getAllInterns = async () => {
    const response = await api.get("/api/interns")
    return response.data
}

// Get intern by ID → GET /api/interns/:id
export const getInternById = async (id) => {
    const response = await api.get(`/api/interns/${id}`)
    return response.data
}

// Update intern → PUT /api/interns/:id
export const updateIntern = async (id, data) => {
    const response = await api.put(
        `/api/interns/${id}`, 
        data
    )
    return response.data
}

// Delete intern → DELETE /api/interns/:id
export const deleteIntern = async (id) => {
    const response = await api.delete(`/api/interns/${id}`)
    return response.data
}