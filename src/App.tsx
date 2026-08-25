import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Archivo } from './pages/Archivo';
import { Mapa } from './pages/Mapa';
import { Proyecto } from './pages/Proyecto';
import { Historias } from './pages/Historias';
import { Talleres } from './pages/Talleres';
import { Aprende } from './pages/Aprende';
import { Admin } from './pages/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="proyecto" element={<Proyecto />} />
          <Route path="archivo" element={<Archivo />} />
          <Route path="historias" element={<Historias />} />
          <Route path="mapa" element={<Mapa />} />
          <Route path="talleres" element={<Talleres />} />
          <Route path="aprende" element={<Aprende />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
