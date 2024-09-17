import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import './bootstrap.min.css'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
      </Routes>
    </>
  )
}

export default App
