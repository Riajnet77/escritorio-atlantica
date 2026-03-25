import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getPost } from '../services/api'

export default function PostDetalhe() {
  const { slug }          = useParams()
  const [post, setPost]   = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPost(slug).then(r => setPost(r.data)).catch(() => {}).finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div className="min-h-screen pt-40 text-center text-white/40">Carregando...</div>
  if (!post) return (
    <div className="min-h-screen pt-40 text-center">
      <p className="text-white/50 mb-6">Artigo não encontrado.</p>
      <Link to="/blog" className="btn-outline">← Voltar ao Blog</Link>
    </div>
  )

  return (
    <>
      <Helmet><title>{post.titulo} | Escritório Atlântica</title></Helmet>

      <section style={{background: "linear-gradient(135deg, #060e1e 0%, #0f2045 60%, #1a3a70 100%)"}} className="pt-36 pb-16 bg-dots">
        <div className="max-w-3xl mx-auto px-6">
          <Link to="/blog" className="text-brand-cyan/60 text-sm hover:text-brand-cyan mb-6 inline-block">← Voltar ao Blog</Link>
          <div className="flex gap-2 mb-4 flex-wrap">
            {post.tags?.map(tag => (
              <span key={tag} className="text-xs bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">{post.titulo}</h1>
          <div className="flex gap-4 text-white/40 text-sm font-body">
            <span>✍️ {post.autor}</span>
            <span>📅 {new Date(post.criado_em).toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
      </section>

      <section style={{background: "linear-gradient(180deg, #0a1630 0%, #0f2045 100%)"}} className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="font-body text-brand-cyan/80 text-lg italic border-l-2 border-brand-cyan/40 pl-5 mb-10">
            {post.resumo}
          </p>
          <div className="font-body text-white/70 leading-relaxed whitespace-pre-wrap text-base">
            {post.conteudo}
          </div>
          <div className="mt-12 bg-brand-cyan/10 border border-brand-cyan/20 rounded-2xl p-6 text-center">
            <p className="font-display text-white font-semibold mb-3">Ficou com dúvidas? Nossa equipe pode ajudar.</p>
            <Link to="/contato" className="btn-primary">Falar com Especialista</Link>
          </div>
        </div>
      </section>
    </>
  )
}
