import React from 'react';
import styles from '@/styles/NavBar.module.css';

export default function NavBar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.childIcon}>
        <svg className={styles.feather} fill="none" height="50"
          stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
          stroke-width="2" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
      <div className={styles.childIcon} >
        <svg className="feather feather-edit" fill="none" height="50" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </div>
    </div>
  )
}
