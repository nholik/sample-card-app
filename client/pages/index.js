import { useRef, useState } from 'react'
import Head from 'next/head'

const Home = () => {
  const formRef = useRef(null)
  const [cardNumber, setCardNumber] = useState('')
  const [balance, setBalance] = useState(null)
  const [isChecking, setIsChecking] = useState(false)
  const [error, setError] = useState(null)

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value)
    setError(null)
  }

  const handleBlalanceRequested = async (e) => {
    try {
      setError(null)
      const isValid = formRef.current.checkValidity()
      if (isValid) {
        setIsChecking(true)
        const delay = 500 //simulate delay
        await new Promise((resolve) => setTimeout(resolve, delay))
        const result = await fetch(`/api/balance/${cardNumber}`)
        if (result.ok) {
          const balance = await result.json()
          console.log(balance)
          setBalance(balance)
        } else if (result.status === 404) {
          console.log(result)
          setError('Card number could not be found.')
          setBalance(null)
        } else {
          setError('Unexpected error occured, please try again later.')
          setBalance(null)
        }
      } else {
        formRef.current.reportValidity()
      }
    } catch (e) {
      setError('Unexpected error occured, please try again later.')
      setBalance(null)
    } finally {
      setIsChecking(false)
    }
  }
  return (
    <div>
      <Head>
        <title>Test application</title>
      </Head>

      <main className="container">
        <div className="container py-5 h-100">
          {isChecking ? (
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <h2>Loading...</h2>
              </div>
            </div>
          ) : (
            <form
              ref={formRef}
              className="row d-flex justify-content-center align-items-center h-100"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <h2>Check your balance</h2>

                <div className="form-outline form-white mb-4">
                  <input
                    type="text"
                    pattern="[0-9]*"
                    minLength={16}
                    maxLength={16}
                    required
                    className="form-control form-control-lg"
                    placeholder="Enter your 16 digit card number"
                    onChange={handleCardNumberChange}
                  ></input>
                  <button
                    type="submit"
                    className="btn btn-secondary mt-2"
                    onClick={handleBlalanceRequested}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          )}
          {balance && !isChecking && (
            <div className="row flex justify-content-center">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card p-3">
                  <div className="d-flex flex-row justify-content-between text-align-center"></div>
                  <p className="text-dark"></p>
                  <div className="card-bottom pt-3 px-3 mb-2">
                    <div className="d-flex flex-row justify-content-between text-align-center">
                      <div className="d-flex flex-column">
                        <span>
                          Balance amount for card ending in{' '}
                          {cardNumber.slice(-4)}:
                        </span>
                        <p>
                          <span className="text-dark">{balance}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="row flex justify-content-center">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="mt-5 alert alert-danger" role="alert">
                  {error}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer />
    </div>
  )
}

export default Home
