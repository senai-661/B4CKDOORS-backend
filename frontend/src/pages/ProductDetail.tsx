import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Heart, Minus, Plus, ShieldCheck, Truck, RefreshCw, ShoppingBag, Star } from 'lucide-react'
import { products } from '../data/products'
import { useStore } from '../context/StoreContext'
import ProductGrid from '../components/ProductGrid'
const money = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
export default function ProductDetail() {
  const { id = '' } = useParams()
  const product = products.find(p => p.id === id)
  const [size, setSize] = useState(product?.sizes[0] ?? '')
  const [quantity, setQuantity] = useState(1)
  const { addToCart, toggleFavorite, isFavorite } = useStore()
  const navigate = useNavigate()
  if (!product) return <div className="empty-state"><h2>Produto não encontrado</h2><Link to="/">Voltar para a loja</Link></div>
  const favorite = isFavorite(product.id)
  return <div className="product-detail-page">
    <div className="breadcrumbs"><Link to="/">Início</Link><span>/</span><Link to={`/categoria/${product.category}`}>{product.categoryLabel}</Link><span>/</span><span>{product.name}</span></div>
    <div className="product-detail"><div className="detail-image"><span className="detail-badge">GRENÁ ORIGINAL</span><img src={product.image} alt={product.name} /></div><div className="detail-info"><span className="section-kicker">{product.categoryLabel.toUpperCase()} / COLEÇÃO GRENÁ</span><h1>{product.name}</h1><div className="detail-rating"><span className="stars">★★★★★</span><span>{product.rating.toFixed(1)} · {product.reviews} avaliações</span></div><div className="detail-price">{money(product.price)} <span>no Pix</span></div>{product.oldPrice && <p className="old-price">De {money(product.oldPrice)} <span className="discount-pill">-{Math.round((1 - product.price / product.oldPrice) * 100)}%</span></p>}<p className="installment-detail">ou 4x de <strong>{money(product.price / 4)}</strong> sem juros no cartão</p><p className="detail-description">{product.description}</p>
      <div className="option-label"><strong>Tamanho</strong><span>Guia de medidas</span></div><div className="size-options">{product.sizes.map(s => <button key={s} className={size === s ? 'selected' : ''} onClick={() => setSize(s)}>{s}</button>)}</div>
      <div className="purchase-row"><div className="quantity-control"><button onClick={() => setQuantity(q => Math.max(1, q - 1))} aria-label="Diminuir quantidade"><Minus size={15} /></button><span>{quantity}</span><button onClick={() => setQuantity(q => q + 1)} aria-label="Aumentar quantidade"><Plus size={15} /></button></div><button className="button button-primary add-cart-detail" onClick={() => { for (let i = 0; i < quantity; i++) addToCart(product, size); navigate('/carrinho') }}><ShoppingBag size={18} /> ADICIONAR AO CARRINHO</button><button className={`detail-favorite ${favorite ? 'active' : ''}`} onClick={() => toggleFavorite(product.id)} aria-label="Favoritar"><Heart fill={favorite ? 'currentColor' : 'none'} /></button></div>
      <div className="detail-assurances"><div><Truck /><span><strong>Entrega para todo o Brasil</strong><small>Consulte o prazo no checkout</small></span></div><div><ShieldCheck /><span><strong>Compra segura</strong><small>Seus dados protegidos</small></span></div><div><RefreshCw /><span><strong>Troca facilitada</strong><small>Consulte as condições</small></span></div></div>
    </div></div>
    <section className="section-block"><div className="section-heading"><div><span className="section-kicker">VOCÊ TAMBÉM PODE GOSTAR</span><h2>Produtos relacionados</h2></div></div><ProductGrid items={products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)} /></section>
  </div>
}