import { useState, createContext, useContext } from 'react'

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <AuthContext.Provider value={[loggedIn, setLoggedIn]}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useContext(AuthContext)

  const handleLoggedInChanged = (value) => {
    //could do stuff like get user profile or what not
    setLoggedIn(value)
  }

  return [loggedIn, handleLoggedInChanged]
}

export { AuthProvider, useAuth }
