import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getPosts } from '../services/api'

export default function Blog() {
  const [posts, setPosts]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPosts()
      .then(r => setPosts(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Helmet>
        <title>Blog | Escritório Atlântica</title>
      </Helmet>

      <section className="pt-32 pb-20 bg-gradient-to-br from-primary-900 to-primary-700 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Blog & Artigos</h1>
          <p className="text-blue-200 text-lg">Informações e análises para manter você atualizado.</p>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="text-center text-gray-500 py-20">Carregando artigos...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-2">Nenhum artigo publicado ainda.</p>
            <p className="text-sm text-gray-400">Adicione posts via API: POST /api/blog/</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(p => (
              <Link key={p.id} to={`/blog/${p.slug}`} className="card flex flex-col hover:scale-[1.02] transition-transform">
                {p.imagem_url && (
                  <img src={p.imagem_url} alt={p.titulo} className="rounded-lg mb-4 w-full h-44 object-cover" />
                )}
                <div className="flex gap-2 mb-3 flex-wrap">
                  {p.tags?.map(tag => (
                    <span key={tag} className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-lg font-semibold text-primary-800 mb-2 line-clamp-2">{p.titulo}</h2>
                <p className="text-gray-600 text-sm line-clamp-3 flex-grow">{p.resumo}</p>
                <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
                  <span>{p.autor}</span>
                  <span>{new Date(p.criado_em).toLocaleDateString('pt-BR')}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
