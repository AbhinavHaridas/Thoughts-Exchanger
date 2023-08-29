import React, { Dispatch, SetStateAction } from 'react'
import styles from '@/styles/AddButton.module.css';

interface Props {
    show2: boolean,
    setShow2: Dispatch<SetStateAction<boolean>>
}

const AddButton: React.FC<Props> = (props) => {
  return (
    <div className={styles.footer}>
        <div className={styles.button} onClick={() => props.setShow2(true)}>
          <svg className="feather feather-upload" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg> 
        </div>    
    </div>
  )
}

export default AddButton;