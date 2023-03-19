import React, { Dispatch, SetStateAction } from 'react';
import styles from '@/styles/ModalCard.module.css';
import { useQuery } from 'urql';
import { getSpecificPost } from '@/queries/postQueries';

export default function ModalCard(
    props: {
        show: boolean,
        setShow: Dispatch<SetStateAction<boolean>>,
        postId: number
    }) {
    if (!props.show) return null;


    const [result, reExecuteQuery] = useQuery(
        {
            query: getSpecificPost(props.postId)
        }
    )

    const { data, fetching, error } = result;

    if (fetching) return <p>Loading .....</p>
    if (error) return <p>Hmmmm there is .... {error.message} </p>

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h1 className={styles.modalHeader}>{data['getSpecificPost']['title']}</h1>
                <hr />
                <p className={styles.modalDescription}>{data['getSpecificPost']['description']}</p>
            </div>
            <div className={styles.modalButton} onClick={() => props.setShow(false)}><p>Close</p></div>
        </div>
    )
}
