import { useEffect, useState } from 'react'
import Orb from '../Orb/Orb'
import styles from './HomeBackground.module.css'

type HomeBackgroundProps = {
  paused: boolean
}

export function HomeBackground({ paused }: HomeBackgroundProps) {
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(preference.matches)
    preference.addEventListener('change', updatePreference)
    return () => preference.removeEventListener('change', updatePreference)
  }, [])

  return (
    <div className={styles.background} aria-hidden="true">
      <div className={styles.fallback} />
      <Orb
        colors={['#6b8664', '#b27b56', '#2d4e35']}
        backgroundColor="#faf7f2"
        size={1.1}
        glow={0.7}
        bleed={0.65}
        speed={0.3}
        hoverIntensity={0.35}
        highlight={0.45}
        opacity={1}
        dpr={1}
        intro={false}
        paused={paused || reducedMotion}
        followCursor={!reducedMotion}
        rotateOnHover={!reducedMotion}
        clickPulse={false}
      />
    </div>
  )
}
