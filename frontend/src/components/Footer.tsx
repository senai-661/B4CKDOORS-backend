import { Link } from 'react-router-dom'
import { Instagram, Facebook, Youtube, ShieldCheck, Truck, RefreshCw, CreditCard } from 'lucide-react'
export default function Footer() {
  return <footer className="site-footer">
    <div className="footer-benefits">
      <div><Truck /><span><strong>Entrega para todo o Brasil</strong><small>Rastreie seu pedido online</small></span></div>
      <div><CreditCard /><span><strong>Parcele em até 4x</strong><small>Sem juros no cartão</small></span></div>
      <div><ShieldCheck /><span><strong>Compra segura</strong><small>Seus dados protegidos</small></span></div>
      <div><RefreshCw /><span><strong>Troca facilitada</strong><small>Até 7 dias após receber</small></span></div>
    </div>
    <div className="footer-main">
      <div className="footer-about"><img src="/brand/grena-mark.svg" alt="GRENÁ" /><p>Sua paixão pelo esporte, em cada detalhe.</p><div className="socials"><a href="https://instagram.com" aria-label="Instagram"><Instagram /></a><a href="https://facebook.com" aria-label="Facebook"><Facebook /></a><a href="https://youtube.com" aria-label="YouTube"><Youtube /></a></div></div>
      <div><h4>Atendimento</h4><Link to="/pedidos">Meus pedidos</Link><Link to="/conta">Minha conta</Link><a href="mailto:atendimento@grena.com.br">Fale conosco</a><span className="footer-muted">Seg–Sex, 9h às 18h</span></div>
      <div><h4>Institucional</h4><a href="#sobre">Sobre a GRENÁ</a><a href="#privacidade">Privacidade</a><a href="#trocas">Trocas e devoluções</a><a href="#entrega">Entrega</a></div>
      <div className="newsletter"><h4>Receba nossas novidades</h4><p>Ofertas e lançamentos direto no seu e-mail.</p><form onSubmit={e => { e.preventDefault(); alert('Obrigado! Seu e-mail foi cadastrado nesta demonstração.') }}><input type="email" required placeholder="Seu melhor e-mail" aria-label="Seu melhor e-mail" /><button type="submit">Cadastrar</button></form></div>
    </div>
    <div className="footer-bottom"><span>© 2026 GRENÁ. Projeto acadêmico — Sprint 06.</span><span>Paleta: preto · grená · branco · cinza · grafite</span></div>
  </footer>
}