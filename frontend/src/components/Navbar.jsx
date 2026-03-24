import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const links = [
  { to: '/',         label: 'Home' },
  { to: '/sobre',    label: 'Sobre' },
  { to: '/servicos', label: 'Serviços' },
  { to: '/blog',     label: 'Blog' },
  { to: '/contato',  label: 'Contato' },
]

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname }             = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
      scrolled
        ? 'bg-[#060e1e]/95 backdrop-blur-md shadow-[0_2px_24px_rgba(0,0,0,0.4)] py-3'
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none group">
          <span className="font-display text-xl font-bold text-white tracking-wide group-hover:text-brand-cyan transition-colors duration-300">
            Atlântica
          </span>
          <span className="text-[10px] text-brand-cyan tracking-[0.25em] uppercase font-body font-medium">
            Escritório de Contabilidade
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `font-body text-sm font-medium transition-all duration-200 relative after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:bg-brand-cyan after:transition-all after:duration-300 ${
                  isActive
                    ? 'text-brand-cyan after:w-full'
                    : 'text-white/80 hover:text-white after:w-0 hover:after:w-full'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link to="/contato" className="btn-primary text-sm py-2.5 px-6 ml-2">
            Fale Conosco
          </Link>
        </nav>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}>
        <div className="bg-[#060e1e]/98 backdrop-blur-md border-t border-white/10 px-6 py-5 flex flex-col gap-1">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `font-body text-base py-3 border-b border-white/5 transition-colors ${
                  isActive ? 'text-brand-cyan' : 'text-white/80'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link to="/contato" className="btn-primary text-center mt-4">
            Fale Conosco
          </Link>
        </div>
      </div>
    </header>
  )
}
