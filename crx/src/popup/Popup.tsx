import '../index.css'
import { AuthProvider } from '../context/auth-context'
import { LazyMotion, domMax } from 'framer-motion'
import { LittleDashboard } from './LittleDashboard'

function App() {
  return (
    <main className='text-gray-700'>
      <LazyMotion features={domMax}>
        <AuthProvider>
          <LittleDashboard />
        </AuthProvider>
      </LazyMotion>
    </main>
  )
}

export default App
