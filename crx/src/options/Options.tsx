import { LazyMotion, domMax } from 'framer-motion'
import { AuthProvider } from '../context/auth-context'
import { SettingsPage } from './SettingsPage'

function App() {
  return (
    <main>
      <LazyMotion features={domMax}>
        <AuthProvider isOptions>
          <SettingsPage />
        </AuthProvider>
      </LazyMotion>
    </main>
  )
}

export default App
