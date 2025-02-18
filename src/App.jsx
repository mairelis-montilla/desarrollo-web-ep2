import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MainFooter from './common/MainFooter'
import MainHeader from './common/MainHeader'
import MainNav from './common/MainNav'
import Inicio from './pages/Inicio'
import Inversiones from './pages/Inversiones'
import Proveedores from './pages/Proveedores'
import Empleados from './pages/Empleados'
import Tienda from './pages/Tienda'
import Carrito from './pages/Carrito'
import ProductoDetalle from './pages/ProductoDetalle'
import Pagina404 from './pages/Pagina404'
import Login from './pages/Login'
import Directores from './pages/Directores'
import Seleccionados from './pages/Seleccionados'

function App() {
  return (
    <>
      <BrowserRouter>
        <MainHeader />
        <MainNav />
        <main id='main-content'>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/inversiones" element={<Inversiones />} />
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/empleados" element={<Empleados />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/productodetalle/:idproducto" element={<ProductoDetalle />} />
            <Route path="/login" element={<Login />} />
            <Route path="/directores" element={<Directores />} />
            <Route path="/seleccionados" element={<Seleccionados />} />
            <Route path="*" element={<Pagina404/>} />
          </Routes>
        </main>
        <MainFooter />
      </BrowserRouter>
    </>
  )
}

export default App
