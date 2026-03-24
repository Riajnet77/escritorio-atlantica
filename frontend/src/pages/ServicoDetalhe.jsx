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

  if (loading) return <div className="pt-40 text-center text-gray-500">Carregando...</div>
  if (!servico) return (
    <div className="pt-40 text-center">
      <p className="text-gray-500 mb-4">Serviço não encontrado.</p>
      <Link to="/servicos" className="btn-primary">Voltar</Link>
    </div>
  )

  return (
    <>
      <Helmet>
        <title>{servico.titulo} | Escritório Atlântica</title>
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-900 to-primary-700 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/servicos" className="text-blue-200 text-sm hover:text-white mb-6 inline-block">
            ← Todos os Serviços
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{servico.titulo}</h1>
          <p className="text-blue-200 text-lg">{servico.descricao_curta}</p>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4">
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap mb-12">
          {servico.descricao_completa}
        </div>
        <div className="bg-primary-50 border-l-4 border-primary-700 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-semibold text-primary-800">Precisa desse serviço? Fale com um especialista.</p>
          <Link to="/contato" className="btn-primary whitespace-nowrap">Entrar em Contato</Link>
        </div>
      </section>
    </>
  )
}
