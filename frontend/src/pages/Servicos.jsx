import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getServicos } from '../services/api'

const EMOJIS = ['🏢','📊','📋','👥','⚖️','📈','💼','🗂️']

const ESTATICOS = [
  { slug: 'abertura-empresas',     titulo: 'Abertura e Regularização de Empresas',  descricao_curta: 'Abertura de MEI, ME e LTDA com toda a documentação e registro junto aos órgãos competentes.', descricao_completa: 'Cuidamos de todo o processo de abertura, alteração e encerramento de empresas.' },
  { slug: 'contabilidade',          titulo: 'Contabilidade para MEI, ME e LTDA',      descricao_curta: 'Escrituração contábil completa, balancetes, balanços e demonstrações financeiras.',              descricao_completa: 'Escrituração contábil mensal, apuração de resultados e relatórios gerenciais.' },
  { slug: 'imposto-de-renda',       titulo: 'Declaração de Imposto de Renda',         descricao_curta: 'IR Pessoa Física e Jurídica, com análise de restituição e orientação fiscal completa.',          descricao_completa: 'Preparação e entrega da declaração de IR com maximização de restituição.' },
  { slug: 'folha-pagamento',        titulo: 'Folha de Pagamento e Encargos',          descricao_curta: 'Processamento de folha, férias, 13º salário, FGTS, INSS e obrigações acessórias.',               descricao_completa: 'Gestão completa da folha de pagamento e encargos trabalhistas.' },
  { slug: 'assessoria-fiscal',      titulo: 'Assessoria Fiscal e Tributária',         descricao_curta: 'Orientação fiscal, apuração de impostos e conformidade com as obrigações tributárias.',           descricao_completa: 'Planejamento e assessoria fiscal para redução legal da carga tributária.' },
  { slug: 'escrituracao-contabil',  titulo: 'Escrituração Contábil',                  descricao_curta: 'Registro contábil preciso de todas as operações financeiras da sua empresa.',                      descricao_completa: 'Escrituração contábil de acordo com as normas do CFC e legislação vigente.' },
  { slug: 'planejamento-tributario',titulo: 'Planejamento Tributário',                descricao_curta: 'Estratégias legais para reduzir impostos e enquadrar sua empresa no melhor regime.',               descricao_completa: 'Análise e escolha do melhor regime tributário para sua empresa.' },
]

export default function Servicos() {
  const [servicos, setServicos] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    getServicos()
      .then(r => setServicos(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const lista = servicos.length > 0 ? servicos : ESTATICOS

  return (
    <>
      <Helmet>
        <title>Serviços | Escritório Atlântica</title>
      </Helmet>

      <section style={{background: "linear-gradient(135deg, #060e1e 0%, #0f2045 60%, #1a3a70 100%)"}} className="pt-36 pb-20 bg-dots">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="cyan-line mx-auto" />
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">Nossos Serviços</h1>
          <p className="font-body text-white/50 text-lg">
            Soluções contábeis e fiscais completas para o crescimento do seu negócio.
          </p>
        </div>
      </section>

      <section className="section-mid py-24 bg-grid">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="text-center text-white/40 py-20">Carregando...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {lista.map((s, i) => (
                <div key={s.slug || i} className="card-service group flex flex-col">
                  <div className="text-3xl mb-4">{EMOJIS[i % EMOJIS.length]}</div>
                  <h2 className="font-display text-white text-lg font-semibold mb-2 group-hover:text-brand-cyan transition-colors">
                    {s.titulo}
                  </h2>
                  <p className="font-body text-white/50 text-sm leading-relaxed flex-grow mb-5">
                    {s.descricao_curta}
                  </p>
                  {s.slug && (
                    <Link to={`/servicos/${s.slug}`}
                      className="text-brand-cyan text-xs font-semibold uppercase tracking-wider hover:underline self-start">
                      Ver detalhes →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{background: "linear-gradient(180deg, #0a1630 0%, #0f2045 100%)"}} className="py-16 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h3 className="font-display text-2xl text-white font-bold mb-3">
            Não encontrou o que procura?
          </h3>
          <p className="font-body text-white/50 mb-6">
            Entre em contato e veja como podemos ajudar seu negócio.
          </p>
          <Link to="/contato" className="btn-primary">Falar com Especialista</Link>
        </div>
      </section>
    </>
  )
}
