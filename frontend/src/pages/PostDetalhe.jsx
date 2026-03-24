import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getPost } from '../services/api'

export default function PostDetalhe() {
  const { slug }          = useParams()
  const [post, setPost]   = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPost(slug)
      .then(r => setPost(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div className="pt-40 text-center text-gray-500">Carregando...</div>
  if (!post) return (
    <div className="pt-40 text-center">
      <p className="text-gray-500 mb-4">Artigo não encontrado.</p>
      <Link to="/blog" className="btn-primary">Voltar ao Blog</Link>
    </div>
  )

  return (
    <>
      <Helmet>
        <title>{post.titulo} | Escritório Atlântica</title>
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-900 to-primary-700 text-white">
        <div className="max-w-3xl mx-auto px-4">
          <Link to="/blog" className="text-blue-200 text-sm hover:text-white mb-6 inline-block">
            ← Voltar ao Blog
          </Link>
          <div className="flex gap-2 mb-4 flex-wrap">
            {post.tags?.map(tag => (
              <span key={tag} className="text-xs bg-white/20 px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">{post.titulo}</h1>
          <div className="flex items-center gap-4 text-blue-200 text-sm">
            <span>✍️ {post.autor}</span>
            <span>📅 {new Date(post.criado_em).toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-3xl mx-auto px-4">
        {post.imagem_url && (
          <img src={post.imagem_url} alt={post.titulo} className="w-full rounded-xl mb-10 shadow-lg" />
        )}
        <p className="text-xl text-gray-500 italic mb-8 border-l-4 border-gold-400 pl-4">{post.resumo}</p>
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
          {post.conteudo}
        </div>
        <div className="mt-12 p-6 bg-primary-50 rounded-xl text-center">
          <p className="text-primary-800 font-semibold mb-3">Ficou com dúvidas? Nossa equipe pode ajudar.</p>
          <Link to="/contato" className="btn-primary">Falar com Especialista</Link>
        </div>
      </section>
    </>
  )
}
