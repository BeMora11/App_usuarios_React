import React from 'react'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ErrorMessage = ({ msg, icon }) => {
  return (
    <div className='text-sm text-red-600 ml-1 mt-0.5'>
      {icon === true && <FontAwesomeIcon className='mr-1' icon={faExclamationCircle} />}
      {msg}
    </div>
  )
}

export default ErrorMessage