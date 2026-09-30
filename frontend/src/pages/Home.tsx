import { ArrowRight, LockKeyhole, Percent, RefreshCw, CreditCard } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import ProductGrid from '../components/ProductGrid'

const categories = [
  { name: 'Camisas de futebol', detail: 'Vista suas cores', image: '/products/jersey-red.svg', to: '/categoria/futebol' },
  { name: 'Calçados', detail: 'Do treino ao dia a dia', image: '/products/shoe-white.svg', to: '/categoria/calcados' },
  { name: 'Roupas esportivas', detail: 'Conforto em movimento', image: '/products/hoodie-black.svg', to: '/categoria/roupas' },
]
export default function Home() {
  return <div className="home-page">
    <section className="hero">
      <div className="hero-copy"><span className="eyebrow"><i /> TEMPORADA 25/26</span><h1>DESCONTO AUTOMÁTICO<br />NO CARRINHO!</h1><p className="hero-subtitle">PAQUE 2 LEVE 3</p><p className="hero-description">Compre 2 camisas selecionadas e ganhe a 3ª.</p><Link className="button button-primary" to="/categoria/futebol">COMPRAR AGORA <ArrowRight size={17} /></Link><small className="hero-terms">*Consulte os produtos participantes.</small></div>
      <div className="hero-art"><div className="hero-circle"></div><img className="hero-jersey jersey-one" src="/products/jersey-white.svg" alt="Camisa branca" /><img className="hero-jersey jersey-two" src="/products/jersey-yellow.svg" alt="Camisa amarela" /><img className="hero-jersey jersey-three" src="/products/jersey-red.svg" alt="Camisa grená" /><span className="hero-stamp">GRENÁ<br /><b>25/26</b></span></div>
    </section>
    <section className="trust-row">
      <div><span className="trust-icon"><Percent /></span><span><strong>Desconto GRENÁ10</strong><small>10% na primeira compra</small></span></div>
      <div><span className="trust-icon"><CreditCard /></span><span><strong>Parcelamento</strong><small>Em até 4 vezes</small></span></div>
      <div><span className="trust-icon"><LockKeyhole /></span><span><strong>100% seguro</strong><small>Compra protegida</small></span></div>
      <div><span className="trust-icon"><RefreshCw /></span><span><strong>Satisfação garantida</strong><small>Troca ou reembolso</small></span></div>
    </section>
    <section className="section-block"><div className="section-heading"><div><span className="section-kicker">ENCONTRE SEU ESTILO</span><h2>Explore por categoria</h2></div><Link to="/categoria/futebol" className="text-link">Ver tudo <ArrowRight size={16} /></Link></div>
      <div className="category-cards">{categories.map((cat, index) => <Link to={cat.to} className={`category-card category-card-${index + 1}`} key={cat.name}><div><span>{cat.detail}</span><h3>{cat.name}</h3><b>Explorar <ArrowRight size={15} /></b></div><img src={cat.image} alt="" /></Link>)}</div>
    </section>
    <section className="section-block"><div className="section-heading"><div><span className="section-kicker">ESCOLHAS DA TORCIDA</span><h2>Mais vendidos</h2><p>Os favoritos de quem vive o esporte.</p></div><Link to="/categoria/futebol" className="text-link">Ver coleção <ArrowRight size={16} /></Link></div><ProductGrid items={products.filter(p => p.featured).slice(0, 4)} /></section>
    <section className="promo-strip"><div><span>GRENÁ CLUB</span><h2>Seu próximo jogo começa aqui.</h2><p>Encontre camisas, chuteiras e acessórios para ir além.</p></div><Link to="/categoria/calcados" className="button button-light">ENCONTRE SEU EQUIPAMENTO <ArrowRight size={16} /></Link></section>
    <section className="section-block"><div className="section-heading"><div><span className="section-kicker">PARA SEU PRÓXIMO TREINO</span><h2>Calçados em destaque</h2></div><Link to="/categoria/calcados" className="text-link">Ver calçados <ArrowRight size={16} /></Link></div><ProductGrid items={products.filter(p => p.category === 'calcados').slice(0, 4)} /></section>
  </div>
}