import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'


const test = () => {
  return (
    <div>
<div className='d-flex align-items-center justify-content-between'>
  <p className='mx-3 '>Function</p>
  <FontAwesomeIcon className='d-flex justify-content-end' icon={faAngleLeft} />
</div>

    </div>
  )
}

export default test