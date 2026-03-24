import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getServico } from '../services/api'

export default function ServicoDetalhe() {
  const { slug }              = useParams()
  const [servico, setServico] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getServico(slug)
      .then(r => setServico(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return (
    <div className="section-dark min-h-screen pt-40 text-center">
      <div className="text-white/40">Carregando...</div>
    </div>
  )
  if (!servico) return (
    <div className="section-dark min-h-screen pt-40 text-center">
      <p className="text-white/50 mb-6">Serviço não encontrado.</p>
      <Link to="/servicos" className="btn-outline">← Voltar</Link>
    </div>
  )

  return (
    <>
      <Helmet><title>{servico.titulo} | Escritório Atlântica</title></Helmet>

      <section className="section-dark pt-36 pb-16 bg-dots">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/servicos" className="text-brand-cyan/60 text-sm hover:text-brand-cyan mb-6 inline-flex items-center gap-2">
            ← Todos os Serviços
          </Link>
          <div className="cyan-line" />
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">{servico.titulo}</h1>
          <p className="font-body text-white/50 text-lg">{servico.descricao_curta}</p>
        </div>
      </section>

      <section className="section-mid py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="font-body text-white/70 leading-relaxed whitespace-pre-wrap text-lg mb-12">
            {servico.descricao_completa}
          </div>
          <div className="bg-brand-cyan/10 border border-brand-cyan/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-display text-white font-semibold">
              Precisa desse serviço? Fale com um especialista.
            </p>
            <Link to="/contato" className="btn-primary whitespace-nowrap">Entrar em Contato</Link>
          </div>
        </div>
      </section>
    </>
  )
}
