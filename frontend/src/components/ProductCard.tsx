import { Heart, Plus, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { useStore } from '../context/StoreContext'

const money = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, isFavorite } = useStore()
  const favorite = isFavorite(product.id)
  return <article className="product-card">
    <div className="product-image-wrap">
      {product.badge && <span className="product-badge">{product.badge}</span>}
      <button className={`favorite-button ${favorite ? 'active' : ''}`} aria-label={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'} onClick={() => toggleFavorite(product.id)}><Heart size={19} fill={favorite ? 'currentColor' : 'none'} /></button>
      <Link to={`/produto/${product.id}`} className="product-image-link"><img src={product.image} alt={product.name} className="product-image" /></Link>
      <button className="quick-add" onClick={() => addToCart(product)} aria-label={`Adicionar ${product.name} ao carrinho`}><Plus size={20} /></button>
    </div>
    <div className="product-info">
      <div className="rating"><span className="stars">{'★'.repeat(Math.round(product.rating))}</span><span>{product.rating.toFixed(1)} ({product.reviews})</span></div>
      <Link to={`/produto/${product.id}`} className="product-name">{product.name}</Link>
      <div className="product-price">{money(product.price)} <span>no Pix</span></div>
      <div className="product-installments">ou 4x de {money(product.price / 4)} sem juros</div>
    </div>
  </article>
}