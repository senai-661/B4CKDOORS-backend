import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CreditCard, QrCode, Barcode, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { useStore } from '../context/StoreContext'
const money = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
export default function Checkout() {
  const { cart, cartTotal, customer, login, placeOrder } = useStore()
  const navigate = useNavigate()
  const [payment, setPayment] = useState('pix')
  const [done, setDone] = useState(false)
  if (!cart.length && !done) return <div className="empty-state"><h2>Não há itens para finalizar</h2><Link to="/">Voltar para a loja</Link></div>
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!customer) {
      const data = new FormData(e.currentTarget)
      login(String(data.get('name')), String(data.get('email')))
    }
    const order = placeOrder()
    if (order) setDone(true)
  }
  if (done) return <div className="checkout-success"><span><CheckCircle2 size={44} /></span><h1>Pedido confirmado!</h1><p>Obrigado por comprar na GRENÁ. Seu pedido foi registrado nesta demonstração.</p><Link to="/pedidos" className="button button-primary">ACOMPANHAR PEDIDO</Link><Link to="/" className="text-link">Voltar à loja</Link></div>
  const total = cartTotal >= 299 ? cartTotal : cartTotal + 19.90
  return <div className="checkout-page">
    <div className="breadcrumbs"><Link to="/">Início</Link><span>/</span><Link to="/carrinho">Carrinho</Link><span>/</span><span>Pagamento</span></div>
    <div className="page-title"><span className="section-kicker">COMPRA SEGURA</span><h1>Finalizar compra</h1></div>
    <form className="checkout-layout" onSubmit={submit}>
      <div className="checkout-forms">
        <section className="form-card"><div className="form-card-heading"><span>1</span><div><h2>Seus dados</h2><p>Para onde enviaremos as atualizações do pedido.</p></div></div><div className="form-grid"><label>Nome completo<input name="name" defaultValue={customer?.name ?? ''} required placeholder="Seu nome" /></label><label>E-mail<input type="email" name="email" defaultValue={customer?.email ?? ''} required placeholder="voce@email.com" /></label><label>CPF<input name="cpf" required minLength={11} placeholder="000.000.000-00" /></label><label>Telefone<input name="phone" required placeholder="(00) 00000-0000" /></label></div></section>
        <section className="form-card"><div className="form-card-heading"><span>2</span><div><h2>Endereço de entrega</h2><p>Preencha o endereço para entrega.</p></div></div><div className="form-grid"><label>CEP<input name="cep" required placeholder="00000-000" /></label><label>Estado<input name="state" required placeholder="UF" maxLength={2} /></label><label className="field-wide">Rua e endereço<input name="address" required placeholder="Rua, avenida, número" /></label><label>Bairro<input name="district" required placeholder="Seu bairro" /></label><label>Cidade<input name="city" required placeholder="Sua cidade" /></label><label>Complemento (opcional)<input name="complement" placeholder="Apartamento, bloco..." /></label></div></section>
        <section className="form-card"><div className="form-card-heading"><span>3</span><div><h2>Forma de pagamento</h2><p>Escolha como deseja pagar.</p></div></div><div className="payment-options"><button type="button" className={payment === 'pix' ? 'payment-option selected' : 'payment-option'} onClick={() => setPayment('pix')}><QrCode /><span><strong>Pix</strong><small>Aprovação rápida</small></span><i /></button><button type="button" className={payment === 'credit' ? 'payment-option selected' : 'payment-option'} onClick={() => setPayment('credit')}><CreditCard /><span><strong>Cartão de crédito</strong><small>Até 4x sem juros</small></span><i /></button><button type="button" className={payment === 'debit' ? 'payment-option selected' : 'payment-option'} onClick={() => setPayment('debit')}><CreditCard /><span><strong>Cartão de débito</strong><small>Pagamento à vista</small></span><i /></button><button type="button" className={payment === 'boleto' ? 'payment-option selected' : 'payment-option'} onClick={() => setPayment('boleto')}><Barcode /><span><strong>Boleto bancário</strong><small>Vencimento em 2 dias úteis</small></span><i /></button></div>{payment === 'credit' && <div className="form-grid payment-extra"><label>Nome no cartão<input required placeholder="Como aparece no cartão" /></label><label>Número do cartão<input required minLength={13} placeholder="0000 0000 0000 0000" /></label><label>Validade<input required placeholder="MM/AA" /></label><label>CVV<input required minLength={3} placeholder="123" /></label><label className="field-wide">Parcelamento<select defaultValue="4"><option value="1">1x sem juros</option><option value="2">2x sem juros</option><option value="3">3x sem juros</option><option value="4">4x sem juros</option></select></label></div>}{payment === 'debit' && <div className="notice-box">Nesta demonstração, os dados do cartão não são enviados a uma operadora de pagamento.</div>}{payment === 'pix' && <div className="notice-box">A chave/código Pix será gerado após a confirmação em uma integração real. Esta versão é demonstrativa.</div>}</section>
      </div>
      <aside className="order-summary checkout-summary"><h2>Seu pedido</h2>{cart.map(item => <div className="checkout-product" key={`${item.product.id}-${item.size}`}><img src={item.product.image} alt="" /><div><strong>{item.product.name}</strong><small>Tam. {item.size} · Qtd. {item.quantity}</small></div><span>{money(item.product.price * item.quantity)}</span></div>)}<div className="summary-line"><span>Subtotal</span><span>{money(cartTotal)}</span></div><div className="summary-line"><span>Frete</span><span>{cartTotal >= 299 ? 'Grátis' : money(19.90)}</span></div><div className="summary-total"><span>Total</span><strong>{money(total)}</strong></div><button className="button button-primary checkout-button" type="submit">CONFIRMAR PEDIDO</button><div className="secure-note"><ShieldCheck size={16} /> Seus dados são usados apenas nesta demonstração.</div></aside>
    </form>
  </div>
}