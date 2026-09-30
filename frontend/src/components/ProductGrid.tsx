import type { Product } from '../types'
import ProductCard from './ProductCard'
export default function ProductGrid({ items }: { items: Product[] }) {
  if (!items.length) return <div className="empty-state"><span>:(</span><h3>Nenhum produto encontrado</h3><p>Tente mudar os filtros ou fazer outra busca.</p></div>
  return <div className="product-grid">{items.map(product => <ProductCard key={product.id} product={product} />)}</div>
}