import styles from './BrandPanel.module.css'

export function BooksIllustration() {
  return (
    <svg className={styles.illustration} viewBox="0 0 480 250" fill="none" aria-hidden="true">
      <path d="M18 230h444" stroke="#c5b9a6" />
      <g className={styles.book}>
        <g transform="rotate(-4 220 178)">
          <path d="M42 160h315v50H42c-12 0-18-10-18-25s6-25 18-25Z" fill="#aa573e" />
          <path d="M354 167H48c-7 0-11 7-11 18s4 18 11 18h306" fill="#faf7f2" />
          <path d="M52 177h291M48 185h297M52 193h291" stroke="#d9d0c3" />
          <path d="M353 160v50" stroke="#803e2c" strokeWidth="2" />
        </g>
      </g>
      <g className={styles.bookTop}>
        <g transform="rotate(2 205 145)">
          <rect x="45" y="116" width="304" height="43" rx="3" fill="#2d4e35" />
          <path d="M63 116v43M70 116v43M325 116v43" stroke="#69816a" />
          <text x="91" y="143" fill="#f0eae1" fontFamily="Georgia, serif" fontSize="17" letterSpacing="1">histórias que ficam</text>
          <path d="M298 132h12m-12 7h12" stroke="#c6b58c" />
        </g>
      </g>
      <g className={styles.bookStanding}>
        <g transform="rotate(-8 371 145)">
          <rect x="342" y="40" width="66" height="185" rx="3" fill="#c9ab70" />
          <path d="M350 40v185M358 55h34M358 59h34M358 207h34" stroke="#9b7c43" />
          <text transform="translate(378 188) rotate(-90)" fill="#393b2c" fontFamily="Georgia, serif" fontSize="17" letterSpacing="1">novas leituras</text>
        </g>
      </g>
      <g className={styles.bookplate}>
        <g transform="rotate(-5 153 71)">
          <path d="M65 33h173v76H65z" fill="#faf7f2" stroke="#c5b9a6" />
          <path d="M81 51h60M81 64h140M81 77h140M81 90h89" stroke="#d9d0c3" />
          <text x="183" y="54" fill="#aa573e" fontFamily="Georgia, serif" fontSize="14" fontStyle="italic">ex libris</text>
        </g>
      </g>
    </svg>
  )
}
