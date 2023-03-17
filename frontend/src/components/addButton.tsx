import React, { Dispatch, SetStateAction } from 'react'
import styles from '@/styles/AddButton.module.css';


export default function AddButton(props: {
    show2: boolean, 
    setShow2: Dispatch<SetStateAction<boolean>> 
}) {
  return (
    <div className={styles.footer}>
        <div className={styles.button} onClick={() => props.setShow2(true)}>
            +
        </div>    
    </div>
  )
}
