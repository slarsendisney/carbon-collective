import { useState } from 'react'
import '../index.css'
import { AuthProvider } from '../context/auth-context'
import { LazyMotion, domMax } from 'framer-motion'

function App() {
  const [crx, setCrx] = useState('create-chrome-ext')

  return (
    <main>
      <LazyMotion features={domMax}>
        <AuthProvider>
          <h1>{crx}</h1>
        </AuthProvider>
      </LazyMotion>
    </main>
  )
}

export default App
