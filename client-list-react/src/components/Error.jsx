import React from 'react'

const Error = ({children}) => {
  return (
    <div className='bg-red-600 py-5 px-10 text-center text-white uppercase font-bold mb-5'>
        {children}
    </div>
  )
}

export default Error