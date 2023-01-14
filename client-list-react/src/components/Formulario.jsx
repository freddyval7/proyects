import React from 'react'
import { useState, useEffect } from 'react'
import { generarId } from '../helpers'
import User from "./User"
import Modal from './Modal'
import Spinner from './Spinner'

const Formulario = ({users, setUsers, user, setUser}) => {

    const [loading, setLoading] = useState(false)

    const [showModal, setShowModal] = useState(false)

    const handleOnClose = () => setShowModal(false)

    useEffect(() => {
      let isCancelled = false
        const consultAPI = async () => {
            setLoading(true)

            const url = "https://reqres.in/api/users"
            const response = await fetch(url)
            const result = await response.json()
            if(!isCancelled){
                const arrayUsers = result.data.map(user => {
                    const obj = {
                        id: generarId(),
                        firstName: user.first_name,
                        lastName: user.last_name,
                        email: user.email
                    }
                    return obj
                })
                setUsers(arrayUsers)
                setLoading(false)
            }
        } 
        consultAPI()
      return () => {
        isCancelled = true
      }
    }, [])
    
    const deleteUser = id => {
        const userUpdated = users.filter(user => user.id !== id)
        setUsers(userUpdated)
    }

  return (
    <div className='container w-2/3 mx-auto py-8 flex flex-col items-center justify-center md:h-screen'>
        <h2 className='text-gray-200 text-3xl text-center'>Listado de Clientes</h2>
        <p className='text-gray-200 text-3lg text-center mt-2'>Administra tus {" "}
            <span className='text-green-500 font-bold'>Clientes</span>
        </p>

        {loading ? <Spinner/> : (
            <>
                {users && users.length ? (
                    <>
                            <ul className='container bg-white shadow-lg rounded-md w-5/6 mx-auto my-5 px-8 py-5 list-disc overflow-y-scroll'>
                                {users.map(user => (
                                    <User 
                                        key={user.id}
                                        user={user}
                                        setUser={setUser}
                                        deleteUser={deleteUser}
                                        setShowModal={setShowModal}
                                    />
                                ))}
                            </ul>

                            <button
                                onClick={() => setShowModal(true)}
                                type = "button"
                                className="w-auto mx-auto py-2 mb-8 px-8 bg-green-500 hover:bg-green-600 text-white uppercase font-bold rounded-lg transition-all"
                                >Agregar Cliente
                            </button>
                     </>
                ): (
                    <>
                        <p className='text-gray-200 text-3lg text-center mt-2 mb-5'>The list is {" "}
                            <span className='text-green-500 font-bold'>Empty</span>
                        </p>
                        <button
                            onClick={() => setShowModal(true)}
                            type = "button"
                            className="w-auto mx-auto py-2 mb-8 px-8 bg-green-500 hover:bg-green-600 text-white uppercase font-bold rounded-lg transition-all"
                            >Agregar Cliente
                        </button>
                    </>
                )}
            </>

        )}

        <Modal
            visible={showModal}
            onClose={handleOnClose}
            user={user}
            setUser={setUser}
            users={users}
            setUsers={setUsers}
        />
    </div>
  )
}

export default Formulario