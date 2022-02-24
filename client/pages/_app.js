import '../styles/index.scss'
import NavBar from '../components/NavBar'
import { AuthProvider } from '../context'

const App = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <NavBar />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default App
