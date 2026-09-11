import api from './api'

export const servicosService = {
  async listar() {
    const { data } = await api.get('/servicos')
    return data
  },

  async obterPorSlug(slug) {
    const { data } = await api.get(`/servicos/${slug}`)
    return data
  },

  async criar(payload) {
    const { data } = await api.post('/admin/servicos', payload)
    return data
  },

  async atualizar(id, payload) {
    const { data } = await api.put(`/admin/servicos/${id}`, payload)
    return data
  },

  async excluir(id) {
    await api.delete(`/admin/servicos/${id}`)
  },
}
