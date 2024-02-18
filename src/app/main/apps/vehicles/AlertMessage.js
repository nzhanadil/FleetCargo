import React from 'react'

const AlertMessage = ({add, message}) => {
    const c = `${message === 'ok' && 'bg-green'} ${message === 'err' && 'bg-red'}`
    return (
        <div className={`fixed rounded-md py-5 px-10 right-10 bottom-20 ${c} z-50 text-white font-medium text-base`}>
            {add && message === 'ok' && <p>Vehicle added successfully!</p>}
            {add && message === 'err' && <p>Error! Please try again!</p>}
        </div>
    )
}

export default AlertMessage
