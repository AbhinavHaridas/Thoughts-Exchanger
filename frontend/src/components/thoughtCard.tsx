import React, { Dispatch, SetStateAction } from 'react';
import styles from '@/styles/ThoughtCard.module.css';
import {motion} from "framer-motion";

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
        <motion.div
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
                ease: [1, 0.5, 1, 1]
            }}
            className={styles.card} onClick={() => {
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
        </motion.div>
    )
}
