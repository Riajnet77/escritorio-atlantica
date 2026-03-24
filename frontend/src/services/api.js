import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 10000,
})

// ── Serviços ──────────────────────────────────────────
export const getServicos = () => api.get('/api/servicos/')
export const getServico  = (slug) => api.get(`/api/servicos/${slug}`)

// ── Blog ──────────────────────────────────────────────
export const getPosts = () => api.get('/api/blog/')
export const getPost  = (slug) => api.get(`/api/blog/${slug}`)

// ── Contato ───────────────────────────────────────────
export const enviarContato = (dados) => api.post('/api/contato/', dados)

export default api
