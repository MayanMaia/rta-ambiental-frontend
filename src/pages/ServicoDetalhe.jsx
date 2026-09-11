import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { updateMeta } from '../utils/seo'
import { servicosService } from '../services/servicos.service'
import LoadingSpinner from '../components/common/LoadingSpinner'

export default function ServicoDetalhe() {
  const { slug }   = useParams()
  const [s,   setS]       = useState(null)
  const [err, setErr]     = useState(null)
  const [load, setLoad]   = useState(true)

  useEffect(() => {
    servicosService.obterPorSlug(slug)
      .then((data) => {
        setS(data)
        updateMeta({
          title: data.nome,
          description: data.descricao,
          canonical: `https://www.rtaambiental.com.br/servicos/${slug}`,
        })
      })
      .catch(() => setErr('Serviço não encontrado.'))
      .finally(() => setLoad(false))
  }, [slug])

  if (load) return <LoadingSpinner fullPage={false} />
  if (err)  return (
    <div className="section container text-center">
      <p className="text-neutral-600 mb-6">{err}</p>
      <Link to="/servicos" className="btn-primary">Ver todos os serviços</Link>
    </div>
  )

  return (
    <section className="public-page section" style={{ '--page-image': "url('https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=2200&q=85)" }}>
      <div className="container max-w-3xl mx-auto">
        <Link to="/servicos" className="text-sm text-primary-600 hover:underline mb-6 inline-block">
          ← Voltar para Serviços
        </Link>
        <h1 className="section-title">{s.nome}</h1>
        <div className="prose prose-neutral max-w-none text-neutral-600">
          <p>{s.descricao}</p>
          {s.conteudo && <div dangerouslySetInnerHTML={{ __html: s.conteudo }} />}
        </div>
        <div className="mt-10">
          <Link to="/contato" className="btn-primary">Solicitar este serviço</Link>
        </div>
      </div>
    </section>
  )
}
