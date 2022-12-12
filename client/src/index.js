import React, { Fragment, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import "react-toastify/dist/ReactToastify.css";
import App from './App'
import { ThemeProvider } from './Context/ThemeContext/ThemeContext'
import Loading from './Loading/Loading'
import { AuthContextProvider } from './Context/AuthContext/AuthContext'
import { ConfirmProvider } from 'material-ui-confirm'
const PreLoader = () => {
  const [isLoading, setIsLoading] = useState(undefined)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true)
    }, 1400)
  }, [])
  return (
    <Fragment>
      {!isLoading ? (
        <Loading />
      ) : (
        <AuthContextProvider>
          <ConfirmProvider>
            <App />
          </ConfirmProvider>
        </AuthContextProvider>
      )}
    </Fragment>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider>
    <PreLoader />
  </ThemeProvider>,
)
