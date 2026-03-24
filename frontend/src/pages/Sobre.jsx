import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export default function Sobre() {
  return (
    <>
      <Helmet>
        <title>Sobre Nós | Escritório Atlântica</title>
      </Helmet>

      {/* Hero */}
      <section className="section-dark pt-36 pb-20 bg-dots">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="cyan-line mx-auto" />
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">Sobre Nós</h1>
          <p className="font-body text-white/50 text-lg">Quase 4 décadas de confiança e expertise contábil.</p>
        </div>
      </section>

      {/* História */}
      <section className="section-mid py-24">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="cyan-line" />
            <h2 className="heading-section">Nossa História</h2>
            <p className="font-body text-white/60 leading-relaxed mb-5">
              Fundado em <strong className="text-white">27 de junho de 1986</strong>, o Escritório Atlântica nasceu
              com a missão de oferecer serviços contábeis de excelência para empresas e pessoas físicas
              em Campo Grande e região.
            </p>
            <p className="font-body text-white/60 leading-relaxed mb-5">
              Ao longo de mais de 38 anos, construímos uma reputação sólida baseada em ética,
              transparência e comprometimento com cada cliente. Acompanhamos as transformações
              do cenário fiscal brasileiro, sempre nos atualizando para oferecer o melhor.
            </p>
            <p className="font-body text-white/60 leading-relaxed mb-8">
              Registrado no <strong className="text-white">CRC/MS sob nº 00239/0-0</strong>, nosso escritório
              atende MEI, microempresas, empresas de médio porte e pessoas físicas com a mesma
              dedicação e qualidade.
            </p>
            <Link to="/contato" className="btn-primary">Fale com Nossa Equipe</Link>
          </div>

          {/* Timeline */}
          <div className="relative pl-8 border-l border-brand-cyan/20">
            {[
              { ano: '1986', t: 'Fundação',            d: 'Abertura do Escritório Atlântica em Campo Grande, MS.' },
              { ano: '1990', t: 'Expansão',             d: 'Ampliação dos serviços para atender médias empresas.' },
              { ano: '2000', t: 'Modernização',         d: 'Adoção de sistemas digitais e contabilidade eletrônica.' },
              { ano: '2010', t: 'Crescimento',          d: 'Consolidação como referência no mercado local.' },
              { ano: '2024', t: 'Presente',             d: 'Atendendo centenas de clientes com tecnologia de ponta.' },
            ].map(({ ano, t, d }) => (
              <div key={ano} className="relative mb-8 last:mb-0">
                <div className="absolute -left-[41px] w-4 h-4 rounded-full bg-brand-cyan border-4 border-[#0a1630]" />
                <div className="text-brand-cyan text-xs font-mono font-bold mb-1">{ano}</div>
                <div className="font-display text-white font-semibold mb-1">{t}</div>
                <div className="font-body text-white/45 text-sm">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="section-dark py-20 bg-grid">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="cyan-line mx-auto" />
          <h2 className="heading-section">Nossos Valores</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-12">
            {[
              { e: '⚖️', t: 'Ética',          d: 'Integridade em todas as relações.' },
              { e: '🎯', t: 'Compromisso',     d: 'Dedicação total ao sucesso do cliente.' },
              { e: '💡', t: 'Transparência',   d: 'Comunicação clara e honesta.' },
              { e: '📚', t: 'Conhecimento',    d: 'Atualização constante da legislação.' },
            ].map(({ e, t, d }) => (
              <div key={t} className="card-service text-center">
                <div className="text-4xl mb-3">{e}</div>
                <div className="font-display text-white font-semibold mb-2">{t}</div>
                <div className="font-body text-white/45 text-sm">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dados legais */}
      <section className="section-mid py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { l: 'CNPJ',      v: '01.940.725/0001-22' },
              { l: 'CRC/MS',    v: '00239/0-0' },
              { l: 'Fundação',  v: '27/06/1986' },
              { l: 'Cidade',    v: 'Campo Grande, MS' },
            ].map(({ l, v }) => (
              <div key={l}>
                <div className="font-body text-xs text-brand-cyan uppercase tracking-widest mb-1">{l}</div>
                <div className="font-display text-white font-semibold text-sm">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
