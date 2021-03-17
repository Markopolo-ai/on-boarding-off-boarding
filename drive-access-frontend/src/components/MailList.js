import React from 'react'
import Mails from './Mails.js'

const MailList = ({mail_list, onDelete}) => {

    return (
        <div>
            {mail_list.map( (item) => (
                <Mails 
                key={item.id}
                item={item}  
                onDelete={onDelete}
                />
            ))
            }
        </div>
    )
}

export default MailList
