import React, { useState } from 'react'
import Layout from './layout/Layout'
import './App.css'
import Landing from './layout/LandingPage.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Layout>
        <Landing />
      </Layout>
    </>
  )
}

export default App
