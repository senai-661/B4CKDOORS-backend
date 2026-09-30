export type CategorySlug = 'futebol' | 'calcados' | 'roupas' | 'basquete' | 'suplementos' | 'acessorios'

export interface Product {
  id: string
  name: string
  category: CategorySlug
  categoryLabel: string
  team?: string
  price: number
  oldPrice?: number
  rating: number
  reviews: number
  image: string
  badge?: string
  description: string
  sizes: string[]
  colors: string[]
  featured?: boolean
}
export interface CartItem {
  product: Product
  size: string
  quantity: number
}
export interface Customer {
  name: string
  email: string
}
export interface Order {
  id: string
  date: string
  total: number
  status: 'Pagamento aprovado' | 'Em preparação' | 'Enviado' | 'Entregue'
  items: CartItem[]
}