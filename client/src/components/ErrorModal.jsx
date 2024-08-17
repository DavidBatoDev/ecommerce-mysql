import React from 'react'
import '../styles/ErrorModal.css'
import Alert from '@mui/material/Alert';


const Error = ({errorMsg, clearError}) => {
  return (
    <div className='screen-container'> 
        <Alert severity="error" className='error-container'>
            <div className='error-info'>
                <p>{errorMsg}</p>
                <span onClick={clearError}>X</span>
            </div>
        </Alert>
    </div>
  )
}

export default Error
