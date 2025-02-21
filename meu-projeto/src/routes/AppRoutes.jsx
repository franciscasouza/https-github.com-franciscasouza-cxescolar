import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthGuard from '../core/guards/AuthGuard';
import PublicRoute from '../components/PublicRoute';
import DashboardLayout from '../components/Layout/DashboardLayout';
import Loading from '../components/Loading';

// Lazy-loaded pages
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const EscolasPage = lazy(() => import('../pages/EscolaPages/EscolasPages'));
const FornecedoresPage = lazy(() => import('../pages/ForncedoresPage/FornecedoresPage'));
const RepasseEscolarPage = lazy(() => import('../pages/RepasseEscolarPage/RepasseEscolarPage'));
const RubricaPage = lazy(() => import('../pages/Rubrica/RubricaPage'));
const NotFound = lazy(() => import('../pages/NotFound'));

function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        
        {/* Rotas protegidas */}
        <Route element={<AuthGuard><DashboardLayout /></AuthGuard>}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/escolas" element={<EscolasPage />} />
          <Route path="/fornecedores" element={<FornecedoresPage />} />
          <Route path="/repasses-escolares" element={<RepasseEscolarPage />} />
          <Route path="/rubricas" element={<RubricaPage />} />
        </Route>

        {/* Rota 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
