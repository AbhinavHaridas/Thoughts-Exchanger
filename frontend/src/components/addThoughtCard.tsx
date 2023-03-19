import React, { Dispatch, SetStateAction } from 'react'
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

    const handleMutation = async (title: string, description: string) => {
        const variables = { description, title };
        const data = await executeMutation(variables);
        console.log(data)
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.close} onClick={() => props.setShow2(false)}>
                        <svg className="feather feather-x" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
                </div>
                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <label className={styles.label}>Enter title: </label><input type='text' className={styles.textTitle}
                        onChange={(e) => props.setTitle(e.target.value)} />
                    <label className={styles.label}>Enter description: </label>
                    <textarea
                        rows={20}
                        cols={40}
                        className={styles.textDescription}
                        onChange={(e) => props.setDescription(e.target.value)} />
                    <button className={styles.submit} onClick={() => {
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
