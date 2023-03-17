import React, { Dispatch, SetStateAction, useCallback, useState } from 'react'
import styles from '@/styles/AddThoughtCard.module.css'
import { useMutation } from 'urql';
import { createPost } from '@/queries/postQueries';

export default function AddThoughtCard(props: {
    show2: boolean,
    setShow2: Dispatch<SetStateAction<boolean>>,
    title: string,
    setTitle: Dispatch<SetStateAction<string>>,
    description: string,
    setDescription: Dispatch<SetStateAction<string>>
}) {
    if (!props.show2) return null;

    const [_result, executeMutation] = useMutation(createPost)
    
    const handleMutation = async(title: string, description: string) => {
        const variables = { description, title };
        const data = await executeMutation(variables); 
        console.log(data)
    }
    
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <label>Enter title: <input type='text'
                        onChange={(e) => props.setTitle(e.target.value)} /></label>
                    <label>Enter description: </label>
                    <textarea
                        rows={20}
                        cols={40}
                        onChange={(e) => props.setDescription(e.target.value)} />
                    <button onClick={() => {
                        handleMutation(
                        props.title, 
                        props.description
                    );
                    props.setShow2(false)
                    }}>submit</button>
                </form>
            </div>
        </div>
    )
}
