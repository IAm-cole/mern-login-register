import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { useEffect, useState } from 'react'
import axios from 'axios'


function App() {
  const [user, setUser] = useState(" ");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get("/api/users/me", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          setUser(res.data);
        } catch (error) {
          setError(error.response ? error.response.data.message : "An error occurred");
        }
        }
      }
    
     fetchUser() 
    
  },[])

 

  return (
    <>
      <Router>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path='/' element={<Home user={user} error={error} />} />
          <Route path='/login' element={<Login setUser={setUser} />} />
          <Route path='/register' element={<Register setUser={setUser} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
