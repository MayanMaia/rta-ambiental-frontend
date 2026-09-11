/**
 * Funções de sanitização para dados de formulário antes do envio.
 */

/** Remove tags HTML de uma string */
export const stripHtml = (str = '') =>
  str.replace(/<[^>]*>/g, '').trim()

/** Sanitiza todos os campos string de um objeto */
export const sanitizeObject = (obj) =>
  Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [
      k,
      typeof v === 'string' ? stripHtml(v) : v,
    ]),
  )

/** Formata telefone: (11) 91234-5678 */
export const formatPhone = (value = '') => {
  const d = value.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 10)
    return d.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
  return d.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
}

/** Formata CPF: 000.000.000-00 */
export const formatCpf = (value = '') =>
  value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4')
