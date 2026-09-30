import { useMemo, useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { SlidersHorizontal, ChevronDown } from 'lucide-react'
import { products } from '../data/products'
import ProductGrid from '../components/ProductGrid'
import type { CategorySlug } from '../types'

const labels: Record<string, string> = {
  futebol: 'Futebol', calcados: 'Calçados', roupas: 'Roupas', basquete: 'Basquete', suplementos: 'Suplementos', acessorios: 'Acessórios'
}
export default function Catalog({ search = false }: { search?: boolean }) {
  const { slug = 'futebol' } = useParams()
  const [params] = useSearchParams()
  const query = params.get('q') ?? ''
  const [sort, setSort] = useState('featured')
  const [onlySale, setOnlySale] = useState(false)
  const [maxPrice, setMaxPrice] = useState('all')
  const title = search ? `Resultados para “${query}”` : labels[slug] ?? 'Produtos'
  const filtered = useMemo(() => {
    let list = products.filter(p => search ? `${p.name} ${p.categoryLabel} ${p.team ?? ''}`.toLowerCase().includes(query.toLowerCase()) : p.category === slug)
    if (onlySale) list = list.filter(p => p.oldPrice)
    if (maxPrice !== 'all') list = list.filter(p => p.price <= Number(maxPrice))
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    return list
  }, [slug, search, query, sort, onlySale, maxPrice])
  return <div className="catalog-page">
    <div className="breadcrumbs"><Link to="/">Início</Link><span>/</span><span>{search ? 'Busca' : title}</span></div>
    <div className="catalog-title-row"><div><span className="section-kicker">COLEÇÃO GRENÁ</span><h1>{title}</h1><p>{filtered.length} produtos para você escolher.</p></div><div className="sort-control"><label htmlFor="sort"><SlidersHorizontal size={16} /> Ordenar por</label><div><select id="sort" value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Destaques</option><option value="price-asc">Menor preço</option><option value="price-desc">Maior preço</option><option value="rating">Melhor avaliação</option></select><ChevronDown size={15} /></div></div></div>
    <div className="catalog-layout"><aside className="filter-panel"><h3>Filtros</h3><div className="filter-group"><h4>Categoria</h4>{Object.entries(labels).map(([key, label]) => <Link key={key} to={`/categoria/${key}`} className={slug === key ? 'filter-active' : ''}>{label}<span>›</span></Link>)}</div><div className="filter-group"><h4>Preço</h4><label className="filter-check"><input type="radio" checked={maxPrice === 'all'} onChange={() => setMaxPrice('all')} /> Todos os preços</label><label className="filter-check"><input type="radio" checked={maxPrice === '150'} onChange={() => setMaxPrice('150')} /> Até R$ 150</label><label className="filter-check"><input type="radio" checked={maxPrice === '300'} onChange={() => setMaxPrice('300')} /> Até R$ 300</label><label className="filter-check"><input type="radio" checked={maxPrice === '400'} onChange={() => setMaxPrice('400')} /> Até R$ 400</label></div><div className="filter-group"><h4>Ofertas</h4><label className="filter-check"><input type="checkbox" checked={onlySale} onChange={e => setOnlySale(e.target.checked)} /> Somente produtos em oferta</label></div><button className="clear-filters" onClick={() => { setOnlySale(false); setMaxPrice('all'); setSort('featured') }}>Limpar filtros</button></aside><div className="catalog-results"><ProductGrid items={filtered} /></div></div>
  </div>
}