import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: 'linear-gradient(180deg, #060e1e 0%, #030810 100%)' }}>
      {/* Linha decorativa topo */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-cyan to-transparent opacity-40" />

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Marca */}
        <div>
          <div className="mb-5">
            <div className="font-display text-2xl font-bold text-white">Atlântica</div>
            <div className="text-[10px] text-brand-cyan tracking-[0.25em] uppercase font-body">
              Escritório de Contabilidade
            </div>
          </div>
          <p className="text-white/50 text-sm leading-relaxed mb-4">
            Assessoria contábil e fiscal com ética, transparência e compromisso desde 1986.
          </p>
          <div className="text-xs text-white/30 space-y-1">
            <div>CNPJ: 01.940.725/0001-22</div>
            <div>CRC/MS – 00239/0-0</div>
            <div>Fundado em 27/06/1986</div>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-body text-xs font-semibold text-brand-cyan uppercase tracking-[0.2em] mb-5">
            Navegação
          </h4>
          <ul className="space-y-3">
            {[
              { to: '/',         label: 'Home' },
              { to: '/sobre',    label: 'Sobre Nós' },
              { to: '/servicos', label: 'Serviços' },
              { to: '/blog',     label: 'Blog' },
              { to: '/contato',  label: 'Contato' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-white/50 text-sm hover:text-brand-cyan transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-brand-cyan/40 group-hover:bg-brand-cyan transition-colors" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h4 className="font-body text-xs font-semibold text-brand-cyan uppercase tracking-[0.2em] mb-5">
            Contato
          </h4>
          <ul className="space-y-3 text-sm text-white/50">
            <li className="flex items-start gap-3">
              <span className="text-brand-cyan mt-0.5">📍</span>
              <span>Rua Emilio Dias Brandão, nº 257<br />Bairro Santa Izabel – Campo Grande, MS</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-brand-cyan">📞</span>
              <a href="tel:6734314383" className="hover:text-brand-cyan transition-colors">(67) 3431-4383</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-brand-cyan">📱</span>
              <div className="flex flex-col gap-1">
                <a href="https://wa.me/5567999752307" className="hover:text-brand-cyan transition-colors">(67) 99975-2307</a>
                <a href="https://wa.me/5567999529701" className="hover:text-brand-cyan transition-colors">(67) 99952-9701</a>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-brand-cyan">✉️</span>
              <a href="mailto:escatlantica@gmail.com" className="hover:text-brand-cyan transition-colors">
                escatlantica@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-brand-cyan">🕐</span>
              <span>Seg–Sex: 08h às 18h</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/25">
          <span>© {year} Escritório Atlântica. Todos os direitos reservados.</span>
          <span>CNPJ 01.940.725/0001-22 · CRC/MS 00239/0-0</span>
        </div>
      </div>
    </footer>
  )
}
