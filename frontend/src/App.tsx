import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Auth from './pages/Auth'
import Account from './pages/Account'
import Favorites from './pages/Favorites'
import Orders from './pages/Orders'
import NotFound from './pages/NotFound'

export default function App() {
  return <Routes>
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="categoria/:slug" element={<Catalog />} />
      <Route path="busca" element={<Catalog search />} />
      <Route path="produto/:id" element={<ProductDetail />} />
      <Route path="carrinho" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="login" element={<Auth />} />
      <Route path="cadastro" element={<Auth register />} />
      <Route path="conta" element={<Account />} />
      <Route path="favoritos" element={<Favorites />} />
      <Route path="pedidos" element={<Orders />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
}