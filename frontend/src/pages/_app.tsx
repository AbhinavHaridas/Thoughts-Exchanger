import NavBar from '@/components/navBar';
import { graphQLClient } from '@/graphql';
import styles from '@/styles/App.module.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app'
import { Provider } from 'urql';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider value={graphQLClient}>
      <div className={styles.page}>
        <NavBar />
        <Component {...pageProps} />
      </div>
    </Provider>
    );
}
