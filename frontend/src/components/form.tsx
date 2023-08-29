import React, { Dispatch, SetStateAction } from 'react'
import styles from '@/styles/Form.module.css'
import { useMutation } from 'urql';
import { createPost } from '@/queries/postQueries';
import {motion} from 'framer-motion';

interface Props {
    show2: boolean,
    setShow2: Dispatch<SetStateAction<boolean>>,
    title: string,
    setTitle: Dispatch<SetStateAction<string>>,
    description: string,
    setDescription: Dispatch<SetStateAction<string>>
}

export const AddThoughtCard: React.FC<Props> = (props) => {
    if (!props.show2) return null;

    const [_result, executeMutation] = useMutation(createPost)

    const handleMutation = async (title: string, description: string) => {
        const variables = { description, title };
        const data = await executeMutation(variables);
        console.log(data)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 0.2,
            }}
            className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.close} onClick={() => props.setShow2(false)}>
                    <svg className="feather feather-x" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="18" x2="6" y1="6" y2="18" /><line x1="6" x2="18" y1="6" y2="18" /></svg>
                </div>
                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.fields}>
                        <label className={styles.label}><b>Enter title: </b></label>
                        <input type='text' className={styles.textTitle}
                            onChange={(e) => props.setTitle(e.target.value)} />
                            <br />
                        <label className={styles.label}><b>Enter description:</b></label>
                        <textarea
                            rows={10}
                            className={styles.textDescription}
                            onChange={(e) => props.setDescription(e.target.value)} />
                    </div>
                    <div className={styles.submit} onClick={() => {
                        handleMutation(
                            props.title,
                            props.description
                        );
                        props.setShow2(false)
                    }}>submit</div>
                </form>
            </div>
        </motion.div>
    )
}
