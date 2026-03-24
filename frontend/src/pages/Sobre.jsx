import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const equipe = [
  { nome: 'Dra. Ana Souza', cargo: 'Sócia-Fundadora · Direito Civil', emoji: '👩‍⚖️' },
  { nome: 'Dr. Carlos Lima', cargo: 'Sócio · Direito Tributário', emoji: '👨‍⚖️' },
  { nome: 'Dra. Mariana Costa', cargo: 'Contadora Sênior', emoji: '👩‍💼' },
]

const valores = [
  { titulo: 'Ética', desc: 'Agimos com integridade em todas as relações.', emoji: '🤝' },
  { titulo: 'Excelência', desc: 'Buscamos o mais alto padrão em cada entrega.', emoji: '⭐' },
  { titulo: 'Comprometimento', desc: 'Dedicação total ao sucesso do cliente.', emoji: '🎯' },
  { titulo: 'Transparência', desc: 'Comunicação clara e honesta sempre.', emoji: '💡' },
]

export default function Sobre() {
  return (
    <>
      <Helmet>
        <title>Sobre Nós | Escritório Atlântica</title>
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary-900 to-primary-700 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Sobre o Escritório</h1>
          <p className="text-blue-200 text-lg">
            Mais de 15 anos construindo confiança e entregando resultados.
          </p>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-20 max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title">Nossa História</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Fundado em 2009, o Escritório Atlântica nasceu com a missão de oferecer assessoria
              jurídica e contábil de alto nível para pessoas físicas e empresas, aliando expertise
              técnica a um atendimento humano e próximo.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Ao longo dos anos, consolidamos nossa presença no mercado atendendo clientes em
              diversas áreas do direito e da contabilidade, sempre pautados pela ética e excelência.
            </p>
            <Link to="/contato" className="btn-primary">Fale com Nossa Equipe</Link>
          </div>
          <div className="bg-primary-50 rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">⚖️</div>
            <blockquote className="text-primary-800 font-serif text-lg italic">
              "Nosso compromisso é ser o parceiro estratégico que o seu negócio e a sua vida merecem."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="section-title">Nossos Valores</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            {valores.map(v => (
              <div key={v.titulo} className="card text-center">
                <div className="text-4xl mb-3">{v.emoji}</div>
                <h3 className="font-semibold text-primary-800 mb-1">{v.titulo}</h3>
                <p className="text-gray-500 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="py-20 max-w-5xl mx-auto px-4 text-center">
        <h2 className="section-title">Nossa Equipe</h2>
        <p className="section-subtitle mb-12">Profissionais altamente qualificados ao seu lado.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {equipe.map(m => (
            <div key={m.nome} className="card text-center">
              <div className="text-5xl mb-4">{m.emoji}</div>
              <h3 className="text-lg font-semibold text-primary-800">{m.nome}</h3>
              <p className="text-gray-500 text-sm mt-1">{m.cargo}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
