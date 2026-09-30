import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { LockKeyhole, UserRound } from 'lucide-react'
import { useStore } from '../context/StoreContext'
export default function Auth({ register = false }: { register?: boolean }) {
  const { login } = useStore()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [error, setError] = useState('')
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') || String(data.get('email')).split('@')[0])
    const email = String(data.get('email'))
    if (register && String(data.get('password')) !== String(data.get('confirm'))) {
      setError('As senhas não coincidem.')
      return
    }
    login(name, email)
    navigate(params.get('redirect') || '/conta')
  }
  return <div className="auth-page"><div className="auth-card"><div className="auth-icon"><UserRound size={24} /></div><span className="section-kicker">BEM-VINDO À GRENÁ</span><h1>{register ? 'Crie sua conta' : 'Entre na sua conta'}</h1><p>{register ? 'Cadastre-se para acompanhar seus pedidos e salvar favoritos.' : 'Acesse seus pedidos, favoritos e seus dados.'}</p><form onSubmit={submit} className="auth-form">{register && <label>Nome completo<input name="name" required placeholder="Como podemos te chamar?" /></label>}<label>E-mail<input name="email" type="email" required placeholder="voce@email.com" /></label><label>Senha<input name="password" type="password" required minLength={4} placeholder="Digite sua senha" /></label>{register && <label>Confirmar senha<input name="confirm" type="password" required minLength={4} placeholder="Repita sua senha" /></label>}{error && <p className="form-error">{error}</p>}<button className="button button-primary" type="submit">{register ? 'CRIAR CONTA' : 'ENTRAR'} <LockKeyhole size={16} /></button></form><div className="auth-switch">{register ? 'Já tem uma conta?' : 'Ainda não tem uma conta?'} <Link to={register ? '/login' : '/cadastro'}>{register ? 'Entrar' : 'Cadastre-se'}</Link></div><small className="demo-note">Demonstração acadêmica: autenticação local, sem servidor.</small></div></div>
}