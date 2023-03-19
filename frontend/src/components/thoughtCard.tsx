import React, { Dispatch, SetStateAction } from 'react';
import styles from '@/styles/ThoughtCard.module.css';

export default function ThoughtCard(
    props: {
        setShow: Dispatch<SetStateAction<boolean>>,
        setCurrentPostId: Dispatch<SetStateAction<number>>,  
        title: string,
        description: string
        postId: number,
        createdAt: number
    }) {

    return (
        <div className={styles.card} onClick={() => {
            props.setShow(true)
            props.setCurrentPostId(props.postId)
        }
        }>
            <div className={styles.inside}>
                <h3 className={styles.title}>{props.title}</h3>
                <p className={styles.description}>
                    {props.description}
                </p>
                 .... 
            </div>
            <hr />
            <div className={styles.footer}>
                <p className={styles.createdAt}><b>created At</b>:   {props.createdAt}</p>
            </div>
        </div>
    )
}
