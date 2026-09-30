import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, Heart, ShoppingCart, UserRound, MapPin, Menu, X, Plus, LogOut } from 'lucide-react'
import { useStore } from '../context/StoreContext'

const navItems = [
  ['Início', '/'], ['Esporte', '/categoria/futebol'], ['Mulheres', '/categoria/roupas'],
  ['Crianças', '/categoria/futebol'], ['Calçados', '/categoria/calcados'], ['Roupas', '/categoria/roupas'],
  ['Futebol', '/categoria/futebol'], ['Basquete', '/categoria/basquete'], ['Suplementos', '/categoria/suplementos'], ['Marcas', '/categoria/acessorios'],
]
export default function Header() {
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { cartCount, favorites, customer, logout } = useStore()
  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault()
    navigate(`/busca?q=${encodeURIComponent(query)}`)
    setMenuOpen(false)
  }
  return <>
    <div className="top-strip"><span>🚚 Frete grátis a partir de R$ 299</span><span>Parcele em até 4x sem juros</span><span>Compra 100% segura</span></div>
    <header className="site-header">
      <button className="icon-button mobile-menu-button" aria-label="Abrir menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      <Link to="/" className="brand" aria-label="GRENÁ - início"><img src="/brand/grena-mark.svg" alt="GRENÁ" /></Link>
      <form className="search-form" onSubmit={submitSearch}>
        <input aria-label="Buscar produtos" placeholder="O que você está procurando?" value={query} onChange={e => setQuery(e.target.value)} />
        <button aria-label="Buscar" type="submit"><Search size={19} /></button>
      </form>
      <Link className="header-service" to="/pedidos"><MapPin size={20} /><span><small>ACOMPANHE</small>SEU PEDIDO</span></Link>
      <Link className="header-service account-link" to={customer ? '/conta' : '/login'}><UserRound size={22} /><span><small>{customer ? 'OLÁ,' : 'ENTRE OU'}</small>{customer ? customer.name.split(' ')[0] : 'CADASTRE-SE'}</span></Link>
      <Link className="header-icon" to="/favoritos" aria-label="Favoritos"><Heart /><span className="count">{favorites.length}</span></Link>
      <Link className="header-icon" to="/carrinho" aria-label="Carrinho"><ShoppingCart /><span className="count">{cartCount}</span></Link>
      {customer && <button className="icon-button logout-button" title="Sair" onClick={() => { logout(); navigate('/') }}><LogOut size={18} /></button>}
    </header>
    <nav className={`category-nav ${menuOpen ? 'is-open' : ''}`}>
      {navItems.map(([label, to], i) => <NavLink key={`${label}-${i}`} to={to} onClick={() => setMenuOpen(false)} end={to === '/'}>{label}</NavLink>)}
      <Link to="/categoria/acessorios" className="more-link" onClick={() => setMenuOpen(false)}>Mais <Plus size={15} /></Link>
    </nav>
  </>
}