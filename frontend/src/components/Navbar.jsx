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
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname }            = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-serif font-bold text-primary-800">
            Atlântica
          </span>
          <span className="text-gold-500 font-light text-sm tracking-widest uppercase">
            Escritório
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-gold-500 border-b-2 border-gold-500 pb-0.5'
                    : scrolled ? 'text-gray-700 hover:text-primary-700' : 'text-gray-800 hover:text-primary-700'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link to="/contato" className="btn-primary text-sm py-2 px-5">
            Fale Conosco
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-700"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-current transition-all ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current mt-1.5 transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current mt-1.5 transition-all ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white shadow-xl px-4 py-6 flex flex-col gap-4">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `text-base font-medium py-2 border-b border-gray-100 ${isActive ? 'text-gold-500' : 'text-gray-700'}`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link to="/contato" className="btn-primary text-center mt-2">
            Fale Conosco
          </Link>
        </div>
      )}
    </header>
  )
}
