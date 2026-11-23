import { NavLink, useNavigate } from 'react-router'
import {
  ArrowDownLeft,
  ArrowUpRight,
  BookOpen,
  House,
  LogOut,
  Tag,
  User,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { Logo } from '@/components/Logo/Logo'
import { logout } from '@/features/auth/services/authService'
import styles from './Sidebar.module.css'

type NavItem = { label: string; to: string; icon: LucideIcon }
type NavSection = { title?: string; items: NavItem[] }

const sections: NavSection[] = [
  { items: [{ label: 'Home', to: '/inicio', icon: House }] },
  {
    title: 'Leitores',
    items: [
      { label: 'Alunos', to: '/alunos', icon: User },
      { label: 'Professores', to: '/professores', icon: Users },
    ],
  },
  {
    title: 'Acervo',
    items: [
      { label: 'Classificações', to: '/classificacoes', icon: Tag },
      { label: 'Livros', to: '/livros', icon: BookOpen },
    ],
  },
  {
    title: 'Operações',
    items: [
      { label: 'Empréstimos', to: '/emprestimos', icon: ArrowUpRight },
      { label: 'Devoluções', to: '/devolucoes', icon: ArrowDownLeft },
    ],
  },
]

const currentUser = { name: 'Administrador', role: 'Bibliotecário' }

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

export function Sidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <Logo variant="dark" />
      </div>

      <nav className={styles.nav} aria-label="Menu principal">
        {sections.map((section, index) => (
          <div key={section.title ?? index} className={styles.section}>
            {section.title && <p className={styles.sectionTitle}>{section.title}</p>}
            <ul className={styles.list}>
              {section.items.map(({ label, to, icon: Icon }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      [styles.link, isActive && styles.active].filter(Boolean).join(' ')
                    }
                  >
                    <Icon size={16} aria-hidden />
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className={styles.user}>
        <span className={styles.avatar} aria-hidden>
          {getInitials(currentUser.name)}
        </span>
        <div className={styles.userInfo}>
          <p className={styles.userName}>{currentUser.name}</p>
          <p className={styles.userRole}>{currentUser.role}</p>
        </div>
        <button
          type="button"
          className={styles.logout}
          onClick={handleLogout}
          aria-label="Sair"
          title="Sair"
        >
          <LogOut size={16} aria-hidden />
        </button>
      </div>
    </aside>
  )
}
