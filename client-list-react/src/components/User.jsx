import React from 'react'
import Swal from 'sweetalert2'

const User = ({user, setUser, deleteUser, setShowModal}) => {

    const { id, firstName, lastName, email } = user

    const handleUser = () => {
      setUser(user)
      setShowModal(true)
    }

    const handleDelete = () => {
        Swal.fire({
            title: 'Do you want to delete the client?',
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
                deleteUser(id)
              Swal.fire('Delete!', '', 'success')
            } 
          })
    }

  return (
    <div>
        <li className='my-5 flex gap-5 justify-between items-center w-full shadow-lg rounded-md p-5'>
            <div className='cursor-pointer' onClick={() => handleUser()}>
                <span className='font-semibold'>{firstName} {lastName} {" "}</span> 
                - ({email})
            </div>
            <button
                onClick={handleDelete}
                type = "button"
                className="py-2 px-8 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg transition-all"
            >Eliminar</button>
        </li>
    </div>
  )
}

export default User