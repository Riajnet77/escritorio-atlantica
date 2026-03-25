import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getServicos, getPosts } from '../services/api'

const SERVICOS_ESTATICOS = [
  { emoji: '🏢', titulo: 'Abertura de Empresas',        desc: 'Regularização e abertura de MEI, ME e LTDA com agilidade.' },
  { emoji: '📊', titulo: 'Contabilidade Empresarial',   desc: 'Escrituração contábil completa para empresas de todos os portes.' },
  { emoji: '📋', titulo: 'Declaração de Imposto de Renda', desc: 'IR Pessoa Física e Jurídica com segurança e precisão.' },
  { emoji: '👥', titulo: 'Folha de Pagamento',           desc: 'Gestão de folha, encargos e obrigações trabalhistas.' },
  { emoji: '⚖️', titulo: 'Assessoria Fiscal e Tributária', desc: 'Planejamento tributário para reduzir sua carga fiscal.' },
  { emoji: '📈', titulo: 'Planejamento Tributário',      desc: 'Estratégias legais para otimizar impostos da sua empresa.' },
]

export default function Home() {
  const [servicos, setServicos] = useState([])
  const [posts, setPosts]       = useState([])

  useEffect(() => {
    getServicos().then(r => setServicos(r.data.slice(0, 6))).catch(() => {})
    getPosts().then(r => setPosts(r.data.slice(0, 3))).catch(() => {})
  }, [])

  const displayServicos = servicos.length > 0
    ? servicos.map((s, i) => ({ ...SERVICOS_ESTATICOS[i % SERVICOS_ESTATICOS.length], ...s }))
    : SERVICOS_ESTATICOS

  return (
    <>
      <Helmet>
        <title>Escritório Atlântica | Contabilidade desde 1986</title>
        <meta name="description" content="Escritório Atlântica – Contabilidade, assessoria fiscal e tributária em Campo Grande, MS. Mais de 38 anos de experiência." />
      </Helmet>

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-dots" style={{background: 'linear-gradient(135deg, #060e1e 0%, #0f2045 60%, #1a3a70 100%)'}}>
        {/* Orbs decorativos */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #2a5298 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)' }} />

        {/* Linha diagonal decorativa */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-[15%] w-px h-full bg-gradient-to-b from-transparent via-brand-cyan/20 to-transparent" />
          <div className="absolute top-0 right-[30%] w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-40 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6 animate-fadeup">
              <div className="h-px w-10 bg-brand-cyan" />
              <span className="font-body text-brand-cyan text-xs tracking-[0.3em] uppercase font-semibold">
                Desde 1986 · Campo Grande, MS
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] mb-6 animate-fadeup-delay">
              Contabilidade<br />
              <span className="text-brand-cyan">que transforma</span><br />
              seu negócio
            </h1>

            <p className="font-body text-white/60 text-lg leading-relaxed mb-10 max-w-lg animate-fadeup-delay2">
              Mais de 38 anos oferecendo soluções contábeis, fiscais e tributárias
              para empresas e pessoas físicas com ética e excelência.
            </p>

            <div className="flex flex-wrap gap-4 animate-fadeup-delay2">
              <Link to="/contato" className="btn-primary">
                Fale com um Especialista
              </Link>
              <Link to="/servicos" className="btn-outline">
                Nossos Serviços
              </Link>
            </div>
          </div>

          {/* Card flutuante */}
          <div className="hidden lg:block relative">
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-[0_24px_64px_rgba(0,0,0,0.4)]">
              <div className="absolute -top-3 -right-3 bg-brand-cyan text-navy-900 text-xs font-bold px-4 py-1.5 rounded-full">
                ✓ CRC/MS 00239/0-0
              </div>
              <h3 className="font-display text-white text-xl font-semibold mb-6">Nossos Serviços</h3>
              <ul className="space-y-4">
                {SERVICOS_ESTATICOS.map(s => (
                  <li key={s.titulo} className="flex items-center gap-3 text-white/70 text-sm font-body">
                    <span className="w-5 h-5 rounded-full bg-brand-cyan/20 flex items-center justify-center flex-shrink-0">
                      <span className="w-2 h-2 rounded-full bg-brand-cyan" />
                    </span>
                    {s.titulo}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                <span className="text-2xl">📞</span>
                <div>
                  <div className="text-white text-sm font-semibold">(67) 3431-4383</div>
                  <div className="text-white/40 text-xs">WhatsApp: (67) 99975-2307</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-10 bg-gradient-to-b from-brand-cyan to-transparent" />
        </div>
      </section>

      {/* ══ NÚMEROS ═══════════════════════════════════════════════════════ */}
      <section className="bg-brand-cyan py-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n: '38+',  l: 'Anos de Experiência' },
            { n: '1986', l: 'Ano de Fundação' },
            { n: '500+', l: 'Clientes Atendidos' },
            { n: '7',    l: 'Serviços Especializados' },
          ].map(({ n, l }) => (
            <div key={l}>
              <div className="font-display text-4xl font-bold text-navy-900">{n}</div>
              <div className="font-body text-navy-900/70 text-sm mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SERVIÇOS ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-grid" style={{background: 'linear-gradient(180deg, #0a1630 0%, #0f2045 100%)'}}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="cyan-line mx-auto" />
            <h2 className="heading-section">Nossos Serviços</h2>
            <p className="font-body text-white/50 max-w-xl mx-auto">
              Soluções contábeis completas para MEI, ME, LTDA e Pessoa Física.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayServicos.map((s, i) => (
              <div key={i} className="card-service group">
                <div className="text-3xl mb-4">{s.emoji}</div>
                <h3 className="font-display text-white text-lg font-semibold mb-2">{s.titulo}</h3>
                <p className="font-body text-white/50 text-sm leading-relaxed mb-4">{s.descricao_curta || s.desc}</p>
                {s.slug && (
                  <Link to={`/servicos/${s.slug}`}
                    className="text-brand-cyan text-xs font-semibold tracking-wider uppercase hover:underline">
                    Saiba mais →
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/servicos" className="btn-outline">Ver Todos os Serviços</Link>
          </div>
        </div>
      </section>

      {/* ══ POR QUE NÓS ═══════════════════════════════════════════════════ */}
      <section className="py-24" style={{background: 'linear-gradient(135deg, #060e1e 0%, #0f2045 60%, #1a3a70 100%)'}}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="cyan-line" />
            <h2 className="heading-section">Por que escolher o Escritório Atlântica?</h2>
            <p className="font-body text-white/50 leading-relaxed mb-8">
              Com mais de 38 anos de atuação em Campo Grande, somos referência em contabilidade
              para pequenas e médias empresas no Mato Grosso do Sul.
            </p>
            <ul className="space-y-5">
              {[
                { t: 'Experiência comprovada', d: 'Fundado em 1986, com décadas de atendimento e clientes fidelizados.' },
                { t: 'Equipe especializada', d: 'Profissionais registrados no CRC/MS com atualização constante.' },
                { t: 'Atendimento personalizado', d: 'Cada cliente recebe atenção dedicada às suas necessidades.' },
                { t: 'Tecnologia e compliance', d: 'Sistemas modernos garantindo precisão e conformidade fiscal.' },
              ].map(({ t, d }) => (
                <li key={t} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-brand-cyan" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-body font-semibold text-white text-sm">{t}</div>
                    <div className="font-body text-white/45 text-sm mt-0.5">{d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { emoji: '🏆', t: 'Qualidade', d: 'Padrão de excelência em todos os serviços' },
              { emoji: '🤝', t: 'Confiança', d: 'Relação ética e transparente com clientes' },
              { emoji: '⚡', t: 'Agilidade', d: 'Prazos cumpridos com precisão' },
              { emoji: '🔒', t: 'Segurança', d: 'Sigilo e proteção das suas informações' },
            ].map(({ emoji, t, d }) => (
              <div key={t} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-brand-cyan/30 transition-colors">
                <div className="text-3xl mb-3">{emoji}</div>
                <div className="font-display text-white font-semibold mb-1">{t}</div>
                <div className="font-body text-white/40 text-xs">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BLOG ══════════════════════════════════════════════════════════ */}
      {posts.length > 0 && (
        <section className="py-24" style={{background: 'linear-gradient(180deg, #0a1630 0%, #0f2045 100%)'}}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <div className="cyan-line mx-auto" />
              <h2 className="heading-section">Últimas do Blog</h2>
              <p className="font-body text-white/50">Fique por dentro das novidades contábeis e fiscais.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map(p => (
                <Link key={p.id} to={`/blog/${p.slug}`}
                  className="card-service block group">
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {p.tags?.slice(0,2).map(tag => (
                      <span key={tag} className="text-xs bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-brand-cyan transition-colors">
                    {p.titulo}
                  </h3>
                  <p className="font-body text-white/45 text-sm line-clamp-3">{p.resumo}</p>
                  <span className="text-brand-cyan text-xs font-semibold uppercase tracking-wider mt-4 inline-block">
                    Ler artigo →
                  </span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/blog" className="btn-outline">Ver Todos os Artigos</Link>
            </div>
          </div>
        </section>
      )}

      {/* ══ CTA FINAL ═════════════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden" style={{background: 'linear-gradient(135deg, #1e3a6e 0%, #0f2045 100%)'}}>
        <div className="absolute inset-0 bg-dots opacity-40" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="cyan-line mx-auto" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Pronto para organizar<br />as finanças da sua empresa?
          </h2>
          <p className="font-body text-white/60 mb-10 text-lg">
            Entre em contato agora e agende uma consulta gratuita com nossos especialistas.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contato" className="btn-primary">Agendar Consulta Gratuita</Link>
            <a href="https://wa.me/5567999752307" target="_blank" rel="noopener noreferrer" className="btn-outline">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
