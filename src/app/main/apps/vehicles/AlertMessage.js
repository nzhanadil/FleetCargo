import React from 'react'

const AlertMessage = ({message}) => {
    const bgColor = `${message.includes('success') ? 'bg-green' : 'bg-red'}`
    return (
        <div className={`fixed rounded-md py-5 px-10 right-10 bottom-20 ${bgColor} z-50 text-white font-medium text-base`}>
            {message}
        </div>
    )
}

export default AlertMessage
