import React, { Dispatch, SetStateAction } from 'react';
import styles from '@/styles/ThoughtCard.module.css';

export default function ThoughtCard(
    props: {
        setShow: Dispatch<SetStateAction<boolean>>,
        setCurrentPostId: Dispatch<SetStateAction<number>>,  
        title: string,
        description: string
        postId: number
    }) {
    
    return (
        <div className={styles.card} onClick={() => {
            props.setShow(true)
            props.setCurrentPostId(props.postId)
        }
        }>
            <div className={styles.inside}>
                <h1 className={styles.title}>{props.title}</h1>
                <p className={styles.description}>
                    {props.description}
                </p>
            </div>
        </div>
    )
}
