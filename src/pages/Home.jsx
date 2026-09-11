import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { updateMeta } from '../utils/seo'
import { getSiteContent } from '../mock/content'

const SERVICES = [
  { title: 'Valoração de resíduos', text: 'Transformamos resíduos em oportunidades de reaproveitamento e valor.', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&q=85' },
  { title: 'Destinação de resíduos', text: 'Gestão segura, rastreável e alinhada à legislação ambiental.', image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=900&q=85' },
  { title: 'Fornecimento de produtos', text: 'Materiais e insumos para processos industriais mais eficientes.', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=85' },
  { title: 'Águas e efluentes', text: 'Soluções técnicas para tratamento, controle e recuperação.', image: 'https://images.unsplash.com/photo-1538300342682-cf57afb97285?auto=format&fit=crop&w=900&q=85' },
]

const parseItems = (items) => {
  if (Array.isArray(items)) return items
  if (typeof items === 'string') {
    return items
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => ({ title: line, text: line }))
  }
  return []
}

function renderBuilderBlock(block) {
  if (!block) return null

  const accentColor = block.accentColor || '#f6aa00'
  const textColor = block.textColor || '#ffffff'
  const backgroundColor = block.backgroundColor || '#101c43'
  const sectionStyle = {
    backgroundColor,
    color: textColor,
  }

  switch (block.type) {
    case 'hero':
      return (
        <section
          className="hero-home text-white"
          style={{
            ...sectionStyle,
            backgroundImage: block.backgroundImage ? `url('${block.backgroundImage}')` : undefined,
          }}
        >
          <div className="hero-home__veil" />
          <div className="container relative z-10 flex min-h-[min(760px,calc(100svh-4.5rem))] items-end pb-16 pt-28 md:pb-24">
            <div className="max-w-3xl animate-slide-up" style={{ textAlign: block.align === 'center' ? 'center' : block.align === 'right' ? 'right' : 'left' }}>
              <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em]" style={{ color: accentColor }}>
                <span className="h-px w-10" style={{ backgroundColor: accentColor }} /> {block.eyebrow || 'Novo bloco de destaque'}
              </p>
              <h1 className="max-w-2xl text-4xl font-heading font-bold leading-[1.05] sm:text-6xl lg:text-7xl" style={{ color: textColor }}>{block.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed sm:text-lg" style={{ color: `${textColor}CC` }}>{block.description}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row" style={{ justifyContent: block.align === 'center' ? 'center' : block.align === 'right' ? 'flex-end' : 'flex-start' }}>
                {block.ctaPrimaryLink ? (
                  <Link to={block.ctaPrimaryLink} className="btn btn-lg" style={{ background: accentColor, color: '#071128' }}>{block.ctaPrimaryText || 'Botão principal'}</Link>
                ) : null}
                {block.ctaSecondaryLink ? (
                  <Link to={block.ctaSecondaryLink} className="btn btn-lg border border-white/50 text-white hover:bg-white/10" style={{ color: textColor }}>{block.ctaSecondaryText || 'Botão secundário'}</Link>
                ) : null}
              </div>
            </div>
          </div>
          <a href="#servicos" className="absolute bottom-6 right-6 z-10 hidden items-center gap-3 text-xs uppercase tracking-widest md:flex" style={{ color: `${textColor}CC` }}>Role para explorar <span className="h-10 w-px" style={{ backgroundColor: accentColor }} /></a>
        </section>
      )
    case 'text':
      return (
        <section className="section" style={sectionStyle}>
          <div className="container max-w-4xl">
            <p className="eyebrow" style={{ color: accentColor }}>Conteúdo</p>
            <h2 className="section-title" style={{ color: textColor }}>{block.title || 'Novo bloco de texto'}</h2>
            {block.description ? <p className="section-subtitle mb-6" style={{ color: `${textColor}CC` }}>{block.description}</p> : null}
            {block.body ? <p className="text-base leading-relaxed" style={{ color: `${textColor}CC` }}>{block.body}</p> : null}
          </div>
        </section>
      )
    case 'media':
      return (
        <section className="section" style={sectionStyle}>
          <div className="container grid items-center gap-8 md:grid-cols-2">
            <div style={{ order: block.align === 'right' ? 2 : 1 }}>
              <img src={block.imageUrl || 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80'} alt={block.title || 'Imagem'} className="h-[420px] w-full rounded-2xl object-cover" />
            </div>
            <div style={{ order: block.align === 'right' ? 1 : 2 }}>
              <p className="eyebrow" style={{ color: accentColor }}>Destaque</p>
              <h2 className="section-title" style={{ color: textColor }}>{block.title || 'Nova seção com imagem'}</h2>
              {block.description ? <p className="section-subtitle mb-6" style={{ color: `${textColor}CC` }}>{block.description}</p> : null}
              {block.body ? <p className="text-base leading-relaxed" style={{ color: `${textColor}CC` }}>{block.body}</p> : null}
              {block.buttonLink ? (
                <Link to={block.buttonLink} className="btn btn-lg mt-6" style={{ background: accentColor, color: '#071128' }}>{block.buttonText || 'Saiba mais'}</Link>
              ) : null}
            </div>
          </div>
        </section>
      )
    case 'cards': {
      const items = parseItems(block.items)
      return (
        <section className="section" style={sectionStyle}>
          <div className="container">
            <div className="mb-10 max-w-3xl">
              <p className="eyebrow" style={{ color: accentColor }}>O que fazemos</p>
              <h2 className="section-title" style={{ color: textColor }}>{block.title || 'Soluções'}</h2>
              {block.description ? <p className="section-subtitle" style={{ color: `${textColor}CC` }}>{block.description}</p> : null}
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {items.map((item, index) => (
                <div key={`${item.title}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" style={{ borderColor: `${accentColor}33` }}>
                  <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold" style={{ background: `${accentColor}22`, color: accentColor }}>{index + 1}</span>
                  <h3 className="mb-3 text-xl font-heading font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-700">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }
    case 'cta':
      return (
        <section className="relative overflow-hidden py-16 text-white md:py-24" style={sectionStyle}>
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-25" />
          <div className="container relative">
            <p className="eyebrow" style={{ color: accentColor }}>Vamos construir juntos</p>
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <h2 className="max-w-2xl text-3xl font-heading font-semibold leading-tight sm:text-5xl" style={{ color: textColor }}>{block.title}</h2>
              {block.buttonLink ? (
                <Link to={block.buttonLink} className="btn btn-lg shrink-0" style={{ background: accentColor, color: '#071128' }}>{block.buttonText || 'Saiba mais'}</Link>
              ) : null}
            </div>
            {block.description ? <p className="mt-4 max-w-2xl" style={{ color: `${textColor}CC` }}>{block.description}</p> : null}
          </div>
        </section>
      )
    default:
      return null
  }
}

export default function Home() {
  const [content, setContent] = useState(getSiteContent())

  useEffect(() => {
    updateMeta({
      title: 'Início',
      description: 'RTA Ambiental oferece soluções ambientais completas. Conheça nossos serviços.',
      canonical: 'https://www.rtaambiental.com.br/',
    })

    const syncContent = () => setContent(getSiteContent())
    window.addEventListener('rta:content-updated', syncContent)
    return () => window.removeEventListener('rta:content-updated', syncContent)
  }, [])

  const builderLayout = Array.isArray(content?.pageBuilder?.layout) ? content.pageBuilder.layout : []

  return (
    <>
      {builderLayout.length > 0 ? (
        builderLayout.map((block) => <div key={block.id}>{renderBuilderBlock(block)}</div>)
      ) : (
        <>
          <section className="hero-home text-white">
            <div className="hero-home__veil" />
            <div className="container relative z-10 flex min-h-[min(760px,calc(100svh-4.5rem))] items-end pb-16 pt-28 md:pb-24">
              <div className="max-w-3xl animate-slide-up">
                <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-[#f6aa00]"><span className="h-px w-10 bg-[#36ad55]" /> {content.home.eyebrow}</p>
                <h1 className="max-w-2xl text-4xl font-heading font-bold leading-[1.05] sm:text-6xl lg:text-7xl">{content.home.title}</h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">{content.home.description}</p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link to="/servicos" className="btn btn-lg bg-[#f6aa00] text-[#071128] hover:bg-[#ffc13b]">Conheça nossas soluções</Link>
                  <Link to="/contato" className="btn btn-lg border border-white/50 text-white hover:bg-white/10">Fale com a nossa equipe</Link>
                </div>
              </div>
            </div>
            <a href="#servicos" className="absolute bottom-6 right-6 z-10 hidden items-center gap-3 text-xs uppercase tracking-widest text-white/70 md:flex">Role para explorar <span className="h-10 w-px bg-[#36ad55]" /></a>
          </section>

          <section id="servicos" className="section bg-[#f7f8f5]">
            <div className="container">
              <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div><p className="eyebrow">O que fazemos</p><h2 className="section-title mb-0 text-[#101c43]">Soluções para cada desafio</h2></div>
                <p className="max-w-md text-sm leading-relaxed text-neutral-600">Da valorização à destinação, entregamos resultados ambientais com método, segurança e visão de longo prazo.</p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {SERVICES.map((service, index) => (
                  <Link key={service.title} to="/servicos" className="service-tile group animate-slide-up" style={{ animationDelay: `${index * 80}ms` }}>
                    <img src={service.image} alt="" loading="lazy" /><span className="service-tile__shade" />
                    <span className="relative z-10 mt-auto block p-5"><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#f6aa00]">0{index + 1}</span><span className="block text-lg font-heading font-semibold text-white">{service.title}</span><span className="mt-2 block max-h-0 overflow-hidden text-sm leading-relaxed text-white/80 opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">{service.text}</span></span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden bg-[#101c43] py-16 text-white md:py-24">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-[url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-25" />
            <div className="container relative"><p className="eyebrow text-[#f6aa00]">Vamos construir juntos</p><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><h2 className="max-w-2xl text-3xl font-heading font-semibold leading-tight sm:text-5xl">Seu próximo projeto pode deixar uma marca positiva.</h2><Link to="/contato" className="btn btn-lg shrink-0 bg-[#36ad55] text-white hover:bg-[#48c76a]">Iniciar conversa</Link></div>
              </div>
          </section>
        </>
      )}
    </>
  )
}
