import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { products } from '../data/products'
import { useStore } from '../context/StoreContext'
import ProductGrid from '../components/ProductGrid'
export default function Favorites() {
  const { favorites } = useStore()
  const items = products.filter(p => favorites.includes(p.id))
  return <div className="favorites-page"><div className="breadcrumbs"><Link to="/">Início</Link><span>/</span><span>Favoritos</span></div><div className="page-title"><span className="section-kicker">SUA LISTA</span><h1>Meus favoritos <span>({items.length})</span></h1></div>{items.length ? <ProductGrid items={items} /> : <div className="empty-cart"><div className="empty-cart-icon"><Heart size={34} /></div><h2>Você ainda não salvou favoritos</h2><p>Toque no coração de um produto para guardá-lo aqui.</p><Link to="/" className="button button-primary">EXPLORAR PRODUTOS</Link></div>}</div>
}