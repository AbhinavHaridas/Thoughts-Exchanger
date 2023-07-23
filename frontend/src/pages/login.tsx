import React from 'react';
import styles from '@/styles/Login.module.css';
import {motion} from "framer-motion";

export default function Login() {
  return (
    <>
      <div className={styles.page}>
        <motion.h1 initial={{ opacity: 0, x: -10, scale: 0.9 }}
             animate={{ opacity: 1, x: 0, scale: 1 }}
             transition={{ duration: 0.4 }}
             className={styles.title}>Login Here</motion.h1>
        <motion.form
            initial={{
              x: 20,
              opacity: 0
            }}
            animate={{
              x: 0,
              opacity: 1
            }}
            transition={{
              delay: 0,
              duration: 0.2,
              ease: [1, 0.5, 0.8, 1]
            }}
            className={styles.loginWindow}>
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
        </motion.form>
      </div>
    </>

  )
}
