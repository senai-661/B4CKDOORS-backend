import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { CartItem, Customer, Order, Product } from '../types'

interface StoreContextValue {
  cart: CartItem[]
  favorites: string[]
  customer: Customer | null
  orders: Order[]
  cartCount: number
  cartTotal: number
  addToCart: (product: Product, size?: string) => void
  updateQuantity: (id: string, size: string, quantity: number) => void
  removeFromCart: (id: string, size: string) => void
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  login: (name: string, email: string) => void
  logout: () => void
  placeOrder: () => Order | null
}
const StoreContext = createContext<StoreContextValue | undefined>(undefined)
const readStorage = <T,>(key: string, fallback: T): T => {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) as T : fallback } catch { return fallback }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => readStorage('grena-cart', []))
  const [favorites, setFavorites] = useState<string[]>(() => readStorage('grena-favorites', []))
  const [customer, setCustomer] = useState<Customer | null>(() => readStorage('grena-customer', null))
  const [orders, setOrders] = useState<Order[]>(() => readStorage('grena-orders', []))

  useEffect(() => { localStorage.setItem('grena-cart', JSON.stringify(cart)) }, [cart])
  useEffect(() => { localStorage.setItem('grena-favorites', JSON.stringify(favorites)) }, [favorites])
  useEffect(() => { localStorage.setItem('grena-customer', JSON.stringify(customer)) }, [customer])
  useEffect(() => { localStorage.setItem('grena-orders', JSON.stringify(orders)) }, [orders])

  const addToCart = (product: Product, size = product.sizes[0] ?? 'Único') => {
    setCart(current => {
      const found = current.find(item => item.product.id === product.id && item.size === size)
      return found
        ? current.map(item => item.product.id === product.id && item.size === size ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { product, size, quantity: 1 }]
    })
  }
  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity < 1) return
    setCart(current => current.map(item => item.product.id === id && item.size === size ? { ...item, quantity } : item))
  }
  const removeFromCart = (id: string, size: string) => setCart(current => current.filter(item => !(item.product.id === id && item.size === size)))
  const toggleFavorite = (id: string) => setFavorites(current => current.includes(id) ? current.filter(x => x !== id) : [...current, id])
  const login = (name: string, email: string) => setCustomer({ name, email })
  const logout = () => setCustomer(null)
  const placeOrder = () => {
    if (!cart.length) return null
    const order: Order = {
      id: `GR-${Date.now().toString().slice(-7)}`,
      date: new Date().toLocaleDateString('pt-BR'),
      total: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      status: 'Pagamento aprovado',
      items: cart,
    }
    setOrders(current => [order, ...current])
    setCart([])
    return order
  }
  const value = useMemo(() => ({
    cart, favorites, customer, orders,
    cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    cartTotal: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    addToCart, updateQuantity, removeFromCart, toggleFavorite,
    isFavorite: (id: string) => favorites.includes(id), login, logout, placeOrder,
  }), [cart, favorites, customer, orders])
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
export function useStore() {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore precisa ser usado dentro de StoreProvider')
  return context
}