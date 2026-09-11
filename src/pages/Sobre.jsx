import { useEffect, useState } from 'react'
import { updateMeta } from '../utils/seo'
import { getSiteContent } from '../mock/content'

export default function Sobre() {
  const [content, setContent] = useState(getSiteContent())

  useEffect(() => {
    updateMeta({
      title: 'Sobre',
      description: 'Conheça a história, missão, visão e valores da RTA Ambiental.',
      canonical: 'https://www.rtaambiental.com.br/sobre',
    })

    const syncContent = () => setContent(getSiteContent())
    window.addEventListener('rta:content-updated', syncContent)
    return () => window.removeEventListener('rta:content-updated', syncContent)
  }, [])

  const sobreCards = Array.isArray(content?.sobreBuilder?.layout) ? content.sobreBuilder.layout : []

  return (
    <section className="public-page section" style={{ '--page-image': "url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2200&q=85)" }}>
      <div className="container max-w-4xl mx-auto">
        <h1 className="section-title">{content.sobre.title}</h1>
        <p className="section-subtitle mb-10">{content.sobre.subtitle}</p>

        <div className="prose prose-neutral max-w-none">
          <p className="text-neutral-600 text-lg leading-relaxed mb-6">
            A RTA Ambiental é uma empresa especializada em soluções ambientais, atuando
            com foco em sustentabilidade, conformidade legal e responsabilidade socioambiental.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            {sobreCards.length > 0 ? (
              sobreCards.map((card) => (
                <div
                  key={card.id}
                  className="group relative overflow-hidden rounded-[28px] border-4 p-6 text-left transition-all duration-500 ease-out min-h-[240px] hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(15,23,42,0.22)]"
                  style={{
                    borderColor: card.borderColor || '#36ad55',
                    backgroundColor: card.backgroundColor || '#ffffff',
                  }}
                >
                  {card.imageUrl && (
                    <>
                      <img
                        src={card.imageUrl}
                        alt={card.title}
                        className="absolute inset-0 w-full h-full object-cover transition duration-700 ease-out group-hover:scale-110"
                      />
                      <span className="absolute inset-0 bg-slate-950/75" />
                    </>
                  )}
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                      <h3
                        className="font-heading font-bold text-xl mb-2 transition-colors group-hover:text-white/90"
                        style={{ color: card.imageUrl ? '#ffffff' : (card.textColor || '#101c43') }}
                      >
                        {card.title}
                      </h3>
                      <p
                        className="text-sm line-clamp-4"
                        style={{ color: card.imageUrl ? 'rgba(255,255,255,0.9)' : (card.textColor ? `${card.textColor}cc` : '#606060') }}
                      >
                        {card.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              [
                { title: 'Missão', text: content.sobre.mission },
                { title: 'Visão', text: content.sobre.vision },
                { title: 'Valores', text: content.sobre.values },
              ].map(({ title, text }) => (
                <div key={title} className="card border border-neutral-100">
                  <h3 className="font-heading font-semibold text-primary-700 mb-2">{title}</h3>
                  <p className="text-sm text-neutral-600">{text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
