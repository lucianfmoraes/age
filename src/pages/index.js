import Head from 'next/head'
import { postData } from '../lib/request';
import styles from '../styles/Home.modules.css'
import { useState } from 'react';
import { useRouter } from 'next/router'

export default function Home({posts}) {

  const [data, setData] = useState({email: null, password: null});
  const router = useRouter()

  const submit = (e) => {
    e.preventDefault()

    if(data.email && data.password) {
      postData('/api/login', data).then(data => {
        console.log(data); 
        if (data.status === "success") router.push('/dashboard')
      });
    }
  }

  return (

    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form  className={styles.login}>
          <input 
            type={"text"} 
            placeholder="Enter Your Email" 
            onChange={(e) => setData({...data, email: e.target.value})} />

          <input 
            type={"password"}  
            placeholder="Enter Your Password"
            onChange={(e) => setData({...data, password: e.target.value})} />
          <button onClick={submit}>Login</button>
        </form>
      </main>
    </div>
  )
}