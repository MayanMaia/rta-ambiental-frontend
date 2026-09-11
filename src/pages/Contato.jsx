import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { updateMeta } from '../utils/seo'
import { contatoService } from '../services/contato.service'
import { validators } from '../utils/validators'
import { sanitizeObject } from '../utils/sanitize'

export default function Contato() {
  const [enviado, setEnviado] = useState(false)
  const [erro,    setErro]    = useState(null)

  useEffect(() => {
    updateMeta({
      title: 'Contato',
      description: 'Entre em contato com a RTA Ambiental.',
      canonical: 'https://www.rtaambiental.com.br/contato',
    })
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm()

  const onSubmit = async (raw) => {
    setErro(null)
    try {
      const dados = sanitizeObject(raw)
      await contatoService.enviar(dados)
      setEnviado(true)
      reset()
    } catch {
      setErro('Ocorreu um erro ao enviar a mensagem. Tente novamente.')
    }
  }

  return (
    <section className="public-page section" style={{ '--page-image': "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=85)" }}>
      <div className="container max-w-2xl mx-auto">
        <h1 className="section-title">Contato</h1>
        <p className="section-subtitle mb-10">
          Preencha o formulário e nossa equipe entrará em contato em breve.
        </p>

        {enviado ? (
          <div className="card border border-green-200 bg-green-50 text-center py-12">
            <p className="text-green-700 font-semibold text-lg mb-2">Mensagem enviada!</p>
            <p className="text-green-600 text-sm">Obrigado pelo contato. Responderemos em breve.</p>
            <button onClick={() => setEnviado(false)} className="btn-primary mt-6">
              Enviar nova mensagem
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            <div>
              <label className="label" htmlFor="nome">Nome *</label>
              <input
                id="nome"
                className={`input ${errors.nome ? 'input-error' : ''}`}
                placeholder="Seu nome completo"
                {...register('nome', { required: 'Nome é obrigatório', minLength: { value: 2, message: 'Mínimo 2 caracteres' } })}
              />
              {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome.message}</p>}
            </div>

            <div>
              <label className="label" htmlFor="email">E-mail *</label>
              <input
                id="email"
                type="email"
                className={`input ${errors.email ? 'input-error' : ''}`}
                placeholder="seu@email.com"
                {...register('email', validators.email)}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="label" htmlFor="telefone">Telefone</label>
              <input
                id="telefone"
                type="tel"
                className={`input ${errors.telefone ? 'input-error' : ''}`}
                placeholder="(00) 00000-0000"
                {...register('telefone', validators.telefone)}
              />
              {errors.telefone && <p className="text-red-500 text-xs mt-1">{errors.telefone.message}</p>}
            </div>

            <div>
              <label className="label" htmlFor="empresa">Empresa</label>
              <input
                id="empresa"
                className="input"
                placeholder="Nome da sua empresa (opcional)"
                {...register('empresa')}
              />
            </div>

            <div>
              <label className="label" htmlFor="mensagem">Mensagem *</label>
              <textarea
                id="mensagem"
                rows={5}
                className={`input resize-none ${errors.mensagem ? 'input-error' : ''}`}
                placeholder="Descreva como podemos ajudar..."
                {...register('mensagem', { required: 'Mensagem é obrigatória', minLength: { value: 10, message: 'Mínimo 10 caracteres' } })}
              />
              {errors.mensagem && <p className="text-red-500 text-xs mt-1">{errors.mensagem.message}</p>}
            </div>

            {erro && <p className="text-red-600 text-sm">{erro}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
            </button>

            <p className="text-xs text-neutral-400 text-center">
              Ao enviar, você concorda com nossa{' '}
              <a href="/politica-de-privacidade" className="underline hover:text-neutral-600">
                Política de Privacidade
              </a>.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
