import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return (
      <>
        <Head>
          <title>With DeSo</title>
        </Head>
        <Component {...pageProps} />
        <ToastContainer />
      </>
    )
}

export default MyApp
