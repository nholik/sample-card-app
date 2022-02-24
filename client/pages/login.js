import { useRef, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useAuth } from '../context'

const Login = () => {
  const router = useRouter()
  const [_, setIsLoggedIn] = useAuth()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const formRef = useRef(null)
  const handleSubmit = async (e) => {
    const result = formRef.current.checkValidity()
    setError(null)
    try {
      if (result) {
        setIsSubmitting(true)
        const result = await fetch('/complete-login', {
          method: 'POST',
          body: new FormData(formRef.current),
        })
        if (result.ok) {
          setIsLoggedIn(true)
          router.push('/')
        } else {
          setError('User name or password is incorrect')
        }
      } else {
        formRef.current.reportValidity()
      }
    } catch (e) {
      setError('Unexpected error while logging in, please try again later')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (_) => {
    if (error) {
      setError(null)
    }
  }
  return (
    <div>
      <Head>
        <title>Test application - Login</title>
      </Head>

      <main className="container">
        <form
          ref={formRef}
          className="container py-5 h-100"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-secondary text-white">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2">LOGIN</h2>
                    <div className="form-outline form-white mb-4">
                      <input
                        required
                        type="text"
                        id="username"
                        name="username"
                        className="form-control form-control-lg"
                        onChange={handleInputChange}
                        onBlur={handleInputChange}
                        disabled={isSubmitting}
                      />
                      <label className="form-label" htmlFor="username">
                        User Name
                      </label>
                    </div>
                    <div className="form-outline form-white mb-4">
                      <input
                        required
                        type="password"
                        id="password"
                        name="password"
                        disabled={isSubmitting}
                        className="form-control form-control-lg"
                        onChange={handleInputChange}
                        onBlur={handleInputChange}
                      />
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-outline-light btn-lg px-5"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      Login
                    </button>
                    {error && (
                      <div className="mt-5 alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>

      <footer />
    </div>
  )
}

export default Login
