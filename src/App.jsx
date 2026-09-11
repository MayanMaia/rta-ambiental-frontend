import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'

import PublicLayout  from './layouts/PublicLayout'
import AdminLayout   from './layouts/AdminLayout'
import LoadingSpinner from './components/common/LoadingSpinner'

// Lazy loading das páginas públicas
const Home            = lazy(() => import('./pages/Home'))
const Sobre           = lazy(() => import('./pages/Sobre'))
const Servicos        = lazy(() => import('./pages/Servicos'))
const ServicoDetalhe  = lazy(() => import('./pages/ServicoDetalhe'))
const Contato         = lazy(() => import('./pages/Contato'))
const TrabalheConosco = lazy(() => import('./pages/TrabalheConosco'))
const Privacidade     = lazy(() => import('./pages/Privacidade'))
const NaoEncontrado   = lazy(() => import('./pages/NaoEncontrado'))

// Lazy loading das páginas administrativas
const AdminLogin      = lazy(() => import('./pages/admin/Login'))
const AdminDashboard  = lazy(() => import('./pages/admin/Dashboard'))
const AdminConteudo   = lazy(() => import('./pages/admin/Conteudo'))
const AdminServicos   = lazy(() => import('./pages/admin/Servicos'))
const AdminMensagens  = lazy(() => import('./pages/admin/Mensagens'))
const AdminCandidatos = lazy(() => import('./pages/admin/Candidatos'))
const AdminUsuarios   = lazy(() => import('./pages/admin/Usuarios'))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Rotas públicas */}
          <Route element={<PublicLayout />}>
            <Route index                          element={<Home />} />
            <Route path="sobre"                   element={<Sobre />} />
            <Route path="servicos"                element={<Servicos />} />
            <Route path="servicos/:slug"          element={<ServicoDetalhe />} />
            <Route path="contato"                 element={<Contato />} />
            <Route path="trabalhe-conosco"        element={<TrabalheConosco />} />
            <Route path="politica-de-privacidade" element={<Privacidade />} />
            <Route path="*"                       element={<NaoEncontrado />} />
          </Route>

          {/* Login admin (sem layout público) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Rotas administrativas protegidas */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index                   element={<AdminDashboard />} />
            <Route path="conteudo"         element={<AdminConteudo />} />
            <Route path="servicos"         element={<AdminServicos />} />
            <Route path="mensagens"        element={<AdminMensagens />} />
            <Route path="candidatos"       element={<AdminCandidatos />} />
            <Route path="usuarios"         element={<AdminUsuarios />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
