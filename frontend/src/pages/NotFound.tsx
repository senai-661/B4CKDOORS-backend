import { Link } from 'react-router-dom'
export default function NotFound() {
  return <div className="not-found"><span>404</span><h1>Ops! Essa página saiu de campo.</h1><p>Não encontramos o endereço que você tentou acessar.</p><Link to="/" className="button button-primary">VOLTAR PARA O INÍCIO</Link></div>
}