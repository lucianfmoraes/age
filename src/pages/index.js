
import { postData } from '../lib/request';
// import {container, main, login } from '../styles/home.css'
import { useState } from 'react';
import { useRouter } from 'next/router'

export default function Home({posts}) {

  const [data, setData] = useState({email: null, password: null});
  const router = useRouter()
  const main =  `min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;`
  const container = `padding: 0 2rem;`
  const login = `width: 450px;`

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

    <div style={{container}}>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{main}}>
        <form  style={{login}}>
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