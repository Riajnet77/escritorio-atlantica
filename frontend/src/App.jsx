import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Servicos from './pages/Servicos'
import ServicoDetalhe from './pages/ServicoDetalhe'
import Blog from './pages/Blog'
import PostDetalhe from './pages/PostDetalhe'
import Contato from './pages/Contato'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/"              element={<Home />} />
          <Route path="/sobre"         element={<Sobre />} />
          <Route path="/servicos"      element={<Servicos />} />
          <Route path="/servicos/:slug" element={<ServicoDetalhe />} />
          <Route path="/blog"          element={<Blog />} />
          <Route path="/blog/:slug"    element={<PostDetalhe />} />
          <Route path="/contato"       element={<Contato />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}
