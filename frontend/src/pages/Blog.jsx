import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getPosts } from '../services/api'

export default function Blog() {
  const [posts, setPosts]     = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPosts().then(r => setPosts(r.data)).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Helmet><title>Blog | Escritório Atlântica</title></Helmet>

      <section style={{background: "linear-gradient(135deg, #060e1e 0%, #0f2045 60%, #1a3a70 100%)"}} className="pt-36 pb-20 bg-dots">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="cyan-line mx-auto" />
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">Blog & Artigos</h1>
          <p className="font-body text-white/50 text-lg">Informações fiscais e contábeis para manter seu negócio em dia.</p>
        </div>
      </section>

      <section style={{background: "linear-gradient(180deg, #0a1630 0%, #0f2045 100%)"}} className="py-24 bg-grid">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="text-center text-white/40 py-20">Carregando artigos...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body text-white/40 mb-2">Nenhum artigo publicado ainda.</p>
              <p className="font-body text-white/25 text-sm">Em breve novidades por aqui!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(p => (
                <Link key={p.id} to={`/blog/${p.slug}`} className="card-service group flex flex-col">
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {p.tags?.slice(0,2).map(tag => (
                      <span key={tag} className="text-xs bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-display text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-brand-cyan transition-colors flex-grow">
                    {p.titulo}
                  </h2>
                  <p className="font-body text-white/45 text-sm line-clamp-3 mb-4">{p.resumo}</p>
                  <div className="flex items-center justify-between text-xs text-white/30 mt-auto">
                    <span>{p.autor}</span>
                    <span>{new Date(p.criado_em).toLocaleDateString('pt-BR')}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
