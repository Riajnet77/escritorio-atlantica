import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-primary-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <h3 className="text-white text-xl font-serif font-bold mb-3">Escritório Atlântica</h3>
          <p className="text-sm leading-relaxed">
            Assessoria jurídica e contábil com excelência, ética e resultados para nossos clientes.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Navegação</h4>
          <ul className="space-y-2 text-sm">
            {[
              { to: '/', label: 'Home' },
              { to: '/sobre', label: 'Sobre Nós' },
              { to: '/servicos', label: 'Serviços' },
              { to: '/blog', label: 'Blog' },
              { to: '/contato', label: 'Contato' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="hover:text-gold-400 transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contato</h4>
          <ul className="space-y-2 text-sm">
            <li>📍 Rua Exemplo, 123 – Sala 01</li>
            <li>📞 (11) 99999-9999</li>
            <li>✉️ contato@escritorioatlantica.com.br</li>
            <li>🕐 Seg–Sex: 08h às 18h</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-800 py-4 text-center text-xs text-gray-500">
        © {year} Escritório Atlântica. Todos os direitos reservados.
      </div>
    </footer>
  )
}
