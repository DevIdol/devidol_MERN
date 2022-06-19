import { createContext, useEffect, useState } from 'react'
import { axiosInstance } from './config'
import Router from './Router/Router'
export const CounterContext = createContext()
function App() {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault()
  })
  const [count, setCount] = useState()
  useEffect(() => {
    const CountData = async () => {
      try {
        const { data: res } = await axiosInstance.get('/visitor')
        setCount(res.counter)
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          console.log(error.response.data.message)
        }
      }
    }
    CountData()
  }, [])
  return (
    <CounterContext.Provider value={count}>
      <Router />
    </CounterContext.Provider>
  )
}

export default App
