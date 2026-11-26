import { useState } from 'react'
import { BookOpen, House, Menu, Pause, Play, Tag, User, Users, X } from 'lucide-react'
import { Logo } from '@/components/Logo/Logo'
import { Sidebar } from '@/components/layout/Sidebar/Sidebar'
import { HomeBackground } from '../components/HomeBackground/HomeBackground'
import { ShortcutCard } from '../components/ShortcutCard/ShortcutCard'
import styles from './HomePage.module.css'

export function HomePage() {
  const [paused, setPaused] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const MenuIcon = menuOpen ? X : Menu
  const MotionIcon = paused ? Play : Pause

  return (
    <div
      className={styles.layout}
      onKeyDown={(event) => {
        if (event.key === 'Escape') setMenuOpen(false)
      }}
    >
      <header className={styles.mobileHeader}>
        <Logo variant="dark" />
        <button
          type="button"
          className={styles.menuToggle}
          aria-controls="home-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <MenuIcon size={18} aria-hidden />
          Menu
        </button>
      </header>

      <div id="home-navigation" className={styles.sidebar} data-open={menuOpen}>
        <Sidebar />
      </div>

      <main className={styles.page} data-paused={paused}>
        <HomeBackground paused={paused} />

        <header className={styles.header}>
          <span className={styles.breadcrumb}><House size={14} aria-hidden /> Início</span>
          <span className={styles.edition}>Entre livros e pessoas.</span>
        </header>

        <section className={styles.stage} aria-labelledby="home-title">
          <div className={styles.intro}>
            <p className={styles.eyebrow}>Bem-vindo ao Bookify</p>
            <h1 id="home-title" className={styles.title}>
              O próximo<br />capítulo<br /><em>começa aqui.</em>
            </h1>
            <p className={styles.subtitle}>O que vamos organizar hoje?</p>
            <span className={styles.flourish} aria-hidden="true">↳</span>
          </div>

          <nav className={styles.shortcuts} aria-label="Atalhos da biblioteca">
            <ul className={styles.cards}>
              <ShortcutCard
                title="Gerenciar alunos"
                category="Leitores"
                icon={User}
                description="Cadastros e histórias de quem está aprendendo."
                to="/alunos"
              />
              <ShortcutCard
                title="Gerenciar professores"
                category="Leitores"
                icon={Users}
                description="Encontre e organize os leitores docentes."
                to="/professores"
              />
              <ShortcutCard
                title="Gerenciar livros"
                category="Acervo"
                icon={BookOpen}
                description="Um lugar para cada título da biblioteca."
              />
              <ShortcutCard
                title="Organizar classificações"
                category="Acervo"
                icon={Tag}
                description="Deixe cada assunto no seu lugar."
                to="/classificacoes"
              />
            </ul>
          </nav>
        </section>

        <footer className={styles.footer}>
          <p>Acervo organizado. Histórias em circulação.</p>
          <button
            type="button"
            className={styles.motionToggle}
            aria-pressed={paused}
            onClick={() => setPaused((current) => !current)}
          >
            <MotionIcon size={13} aria-hidden />
            {paused ? 'Retomar animação' : 'Pausar animação'}
          </button>
        </footer>
      </main>
    </div>
  )
}
