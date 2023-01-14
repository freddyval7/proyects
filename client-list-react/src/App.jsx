import { useState, useEffect } from 'react'
import Formulario from './components/Formulario'

function App() {

  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")) ?? [])
  const [user, setUser] = useState({})

  useEffect(() => {
      localStorage.setItem("users", JSON.stringify(users))
  }, [users])

  return (
    <div className='bg-slate-800'>
      <Formulario 
        users={users}
        setUsers={setUsers}
        user={user}
        setUser={setUser}
      />
    </div>
  )
}

export default App
