import React from 'react'
import {FaTimes} from 'react-icons/fa'

const Mails = ({item, onDelete}) => {
    return (
        <div className="task">
            <h3>{item.name} <FaTimes style={{color:'red', cursor:'pointer'}} onClick={() => onDelete(item.id)} /> </h3>
            <p>{item.email}</p>
        </div>
    )
}

export default Mails
