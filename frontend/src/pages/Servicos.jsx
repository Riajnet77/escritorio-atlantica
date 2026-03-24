import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getServicos } from '../services/api'

export default function Servicos() {
  const [servicos, setServicos] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    getServicos()
      .then(r => setServicos(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Helmet>
        <title>Serviços | Escritório Atlântica</title>
      </Helmet>

      <section className="pt-32 pb-20 bg-gradient-to-br from-primary-900 to-primary-700 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Nossos Serviços</h1>
          <p className="text-blue-200 text-lg">
            Soluções jurídicas e contábeis completas para cada necessidade.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="text-center text-gray-500 py-20">Carregando serviços...</div>
        ) : servicos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">Nenhum serviço cadastrado ainda.</p>
            <p className="text-sm text-gray-400">Adicione serviços via API: POST /api/servicos/</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicos.map(s => (
              <div key={s.id} className="card group">
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary-700 transition-colors">
                  <span className="text-3xl">⚖️</span>
                </div>
                <h2 className="text-xl font-semibold text-primary-800 mb-2">{s.titulo}</h2>
                <p className="text-gray-600 text-sm mb-5 leading-relaxed">{s.descricao_curta}</p>
                <Link
                  to={`/servicos/${s.slug}`}
                  className="text-primary-700 font-medium text-sm hover:text-gold-500 transition-colors"
                >
                  Ver detalhes →
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
