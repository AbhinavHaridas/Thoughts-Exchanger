import ModalCard from '@/components/modalCard'
import ThoughtCard from '@/components/thoughtCard'
import styles from '@/styles/Home.module.css'
import { useState } from 'react';
import { getAllPosts } from '@/queries/postQueries';
import { useQuery } from 'urql';

export default function Home() {
  const [show, setShow] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(0);

  const [result, executeQuery] = useQuery({
    query: getAllPosts,
  });

  const { data, fetching, error }   = result;

  if (fetching) return <p>Loading....</p>
  if (error) return <p>Oh no....{error.message} </p>

  console.log(data)

  return (
    <>
      <div className={styles.cardSection}>

        {
          data['getAllPosts'].map((post: any) => {
            return (
              <ThoughtCard title={post['title']} 
                description={post['description']} 
                setShow={setShow} 
                postId={post['id']}
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

      </div>
    </>
  )
}
