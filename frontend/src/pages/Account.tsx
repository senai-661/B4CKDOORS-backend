import { Link, useNavigate } from 'react-router-dom'
import { UserRound, Package, Heart, LogOut, ArrowRight } from 'lucide-react'
import { useStore } from '../context/StoreContext'
export default function Account() {
  const { customer, orders, favorites, logout } = useStore()
  const navigate = useNavigate()
  if (!customer) return <div className="auth-required"><h1>Entre na sua conta</h1><p>Faça login para visualizar seus dados e pedidos.</p><Link className="button button-primary" to="/login">ENTRAR</Link></div>
  return <div className="account-page"><div className="page-title"><span className="section-kicker">ÁREA DO CLIENTE</span><h1>Olá, {customer.name.split(' ')[0]}!</h1><p>Gerencie sua conta e acompanhe suas compras.</p></div><div className="account-grid"><Link to="/pedidos" className="account-tile"><Package /><div><h3>Meus pedidos</h3><p>{orders.length} pedido(s) registrado(s)</p></div><ArrowRight /></Link><Link to="/favoritos" className="account-tile"><Heart /><div><h3>Meus favoritos</h3><p>{favorites.length} produto(s) salvo(s)</p></div><ArrowRight /></Link><div className="account-tile account-profile"><UserRound /><div><h3>Meus dados</h3><p>{customer.name}<br />{customer.email}</p></div></div><button className="account-tile account-logout" onClick={() => { logout(); navigate('/') }}><LogOut /><div><h3>Sair da conta</h3><p>Encerrar esta sessão local.</p></div><ArrowRight /></button></div></div>
}