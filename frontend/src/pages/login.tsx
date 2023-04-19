import React from 'react';
import styles from '@/styles/Login.module.css';

export default function Login() {
  return (
    <>
      <div className={styles.page}>
        <form className={styles.loginWindow}>
          <label className={styles.label}>Enter Username </label>
          <br />
          <br />
          <input type='text' className={styles.textInput} />
          <br />
          <br />
          <br />
          <label className={styles.label}>Enter Password </label>
          <br />
          <br />
          <input type='password' className={styles.textInput} />
          <div className={styles.submit}>submit</div>
        </form>
      </div>
    </>

  )
}
