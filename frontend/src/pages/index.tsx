import ModalCard from '@/components/modalCard'
import ThoughtCard from '@/components/thoughtCard'
import styles from '@/styles/Home.module.css'
import { useState } from 'react';
import { getAllPosts } from '@/queries/postQueries';
import { useQuery } from 'urql';
import AddButton from '@/components/addButton';
import AddThoughtCard from '@/components/form';
import NavBar from '@/components/navBar';

export default function Home() {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  const [result, executeQuery] = useQuery({
    query: getAllPosts,
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading....</p>
  if (error) return <p>Oh no....{error.message} </p>

  console.log(data)

  return (
    <>
      <div className={styles.page}>
        <div className={styles.cardSection}>
          {
            data['getAllPosts'].map((post: any) => {
              return (
                <ThoughtCard title={post['title']}
                  description={post['description']}
                  setShow={setShow}
                  postId={post['id']}
                  createdAt={post['createdAt']}
                  setCurrentPostId={setCurrentPostId}
                />
              )
            })
          }

          {
            show && (
              <>
                <div className={styles.blurBackground} />
                <ModalCard show={show} postId={currentPostId} setShow={setShow} />
              </>
            )
          }

          {
            show2 && (
              <>
                <div className={styles.blurBackground} />
                <AddThoughtCard
                  show2={show2}
                  setShow2={setShow2}
                  title={title}
                  setTitle={setTitle}
                  description={description}
                  setDescription={setDescription}
                />
              </>
            )
          }
        </div>
        <div className={styles.footer}>
          <AddButton show2={show2} setShow2={setShow2} />
        </div>
      </div>
    </>
  )
}
