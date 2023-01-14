import React, { useState, useEffect } from 'react'
import { generarId } from '../helpers'
import Error from './Error'
import Swal from 'sweetalert2'

const Modal = ({visible, onClose, users, setUsers, user, setUser}) => {

    const [error, setError] = useState(false)
    const [firstName, setfirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        if( Object.keys(user).length > 0 ){
            setfirstName(user.firstName)
            setLastName(user.lastName)
            setEmail(user.email)
        }
    },[user])

    const handleOnClose = (e) => {
        if(e.target.id === "container"){
            onClose()
        }
    }

    if(!visible) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if([user.firstName,user.email,user.lastName].includes("")){
            setError(true)
            return
        }

        setError(false)

        const objUser = {
            firstName,
            lastName,
            email,
        }

        if(user.id){
            Swal.fire({
                title: 'Do you want to change the client?',
                showDenyButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: 'No',
                customClass: {
                  actions: 'my-actions',
                  cancelButton: 'order-1 right-gap',
                  confirmButton: 'order-2',
                  denyButton: 'order-3',
                }
            }).then((result) => {
            if (result.isConfirmed) {
                setfirstName("")
                setLastName("")
                setEmail("")

                objUser.id = user.id;
                const usersUpdt = users.map( currentUser => currentUser.id === user.id ? objUser : currentUser )

                setUsers(usersUpdt)
                setUser({})
                onClose()
                Swal.fire('Changed!', '', 'success')
            } 
            })
        } else{
            Swal.fire({
                title: 'Do you want to add the client?',
                showDenyButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: 'No',
                customClass: {
                  actions: 'my-actions',
                  cancelButton: 'order-1 right-gap',
                  confirmButton: 'order-2',
                  denyButton: 'order-3',
                }
            }).then((result) => {
            if (result.isConfirmed) {
                setfirstName("")
                setLastName("")
                setEmail("")
                objUser.id = generarId();
                setUsers([...users, objUser])
                onClose()
                Swal.fire('Added!', '', 'success')
            } 
            })
        }

        
    }

  return (
    <div 
        id='container'
        onClick={handleOnClose} 
        className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'
    >
        <div className='bg-white p-2 rounded flex flex-col'>
            <form className='p-5'>
                {error && <Error>All fields are required</Error>}
                <div>
                    <label className='font-semibold block uppercase' htmlFor="firstName">Name:</label>
                    <input 
                        onChange={(e) => setfirstName(e.target.value)} 
                        value={firstName}
                        type="text" 
                        name="firstName" 
                        placeholder='Enter the name...'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    />
                </div>
                <div className='my-5'>
                    <label className='font-semibold block uppercase' htmlFor="lastName">Last Name:</label>
                    <input
                        onChange={(e) => setLastName(e.target.value)} 
                        value={lastName}
                        type="text"
                        name="lastName"
                        placeholder='Enter the Last name...'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    />
                </div>
                <div>
                    <label className='font-semibold block uppercase' htmlFor="email">Email Adress:</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email}
                        type="email" 
                        name="email" 
                        placeholder='Enter the email...'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    />
                </div>
                <hr />
                <button
                    onClick={handleSubmit}
                    type = "button"
                    className="justify-self-end mt-5 py-2 px-8 bg-blue-600 hover:bg-blue-700 text-white uppercase font-bold rounded-lg transition-all"
                >{user.id ? "Editar" : "Agregar"}
                </button>
            </form>
        </div>
    </div>
  )
}

export default Modal