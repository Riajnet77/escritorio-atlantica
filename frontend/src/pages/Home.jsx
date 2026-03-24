import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getServicos, getPosts } from '../services/api'

export default function Home() {
  const [servicos, setServicos] = useState([])
  const [posts, setPosts]       = useState([])

  useEffect(() => {
    getServicos().then(r => setServicos(r.data.slice(0, 3))).catch(() => {})
    getPosts().then(r => setPosts(r.data.slice(0, 3))).catch(() => {})
  }, [])

  return (
    <>
      <Helmet>
        <title>Escritório Atlântica | Home</title>
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/pattern.svg')] bg-repeat" />
        <div className="relative max-w-7xl mx-auto px-4 py-32 text-center">
          <p className="text-gold-400 uppercase tracking-[0.3em] text-sm font-medium mb-4">
            Bem-vindo ao
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Escritório Atlântica
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto mb-10 font-light">
            Assessoria jurídica e contábil com excelência, ética e resultados comprovados.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/servicos" className="btn-gold">Nossos Serviços</Link>
            <Link to="/contato" className="btn-secondary border-white text-white hover:bg-white hover:text-primary-800">
              Fale Conosco
            </Link>
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="bg-gold-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { valor: '15+', label: 'Anos de Experiência' },
            { valor: '500+', label: 'Clientes Atendidos' },
            { valor: '98%', label: 'Taxa de Satisfação' },
            { valor: '12', label: 'Especialistas' },
          ].map(({ valor, label }) => (
            <div key={label}>
              <div className="text-4xl font-bold font-serif">{valor}</div>
              <div className="text-sm mt-1 text-yellow-100">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Serviços */}
      {servicos.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="section-title">Nossas Áreas de Atuação</h2>
            <p className="section-subtitle mb-12">
              Soluções completas e personalizadas para proteger seus interesses.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {servicos.map(s => (
                <div key={s.id} className="card text-left group">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-700 transition-colors">
                    <span className="text-2xl">⚖️</span>
                  </div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-2">{s.titulo}</h3>
                  <p className="text-gray-600 text-sm mb-4">{s.descricao_curta}</p>
                  <Link to={`/servicos/${s.slug}`} className="text-primary-700 font-medium text-sm hover:text-gold-500 transition-colors">
                    Saiba mais →
                  </Link>
                </div>
              ))}
            </div>
            <Link to="/servicos" className="btn-primary mt-10 inline-block">
              Ver Todos os Serviços
            </Link>
          </div>
        </section>
      )}

      {/* Blog */}
      {posts.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="section-title">Últimas do Blog</h2>
            <p className="section-subtitle mb-12">
              Fique por dentro das novidades jurídicas e contábeis.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map(p => (
                <Link key={p.id} to={`/blog/${p.slug}`} className="card text-left hover:scale-[1.02] transition-transform">
                  <div className="text-xs text-gold-500 font-medium uppercase tracking-wider mb-2">
                    {p.tags?.[0] || 'Artigo'}
                  </div>
                  <h3 className="text-lg font-semibold text-primary-800 mb-2 line-clamp-2">{p.titulo}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3">{p.resumo}</p>
                  <span className="text-primary-700 text-sm font-medium mt-4 inline-block">Ler artigo →</span>
                </Link>
              ))}
            </div>
            <Link to="/blog" className="btn-primary mt-10 inline-block">Ver Todos os Artigos</Link>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-primary-800 text-white py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Pronto para proteger seus direitos?
          </h2>
          <p className="text-blue-200 mb-8">
            Entre em contato agora e agende uma consulta gratuita com nossos especialistas.
          </p>
          <Link to="/contato" className="btn-gold">Agendar Consulta Gratuita</Link>
        </div>
      </section>
    </>
  )
}
