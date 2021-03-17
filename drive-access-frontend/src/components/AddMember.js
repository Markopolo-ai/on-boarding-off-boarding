import React from 'react'
import {useState} from 'react'

const AddMember = ({onAdd}) => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if (!email){
            alert("Email Can't Be Empty")
            return
        }
        if (!name){
            alert("Name Can't Be Empty")
            return
        }

        onAdd({email, name})

        setEmail('')
        setName('')
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <label>Add New Team Member</label>
            <div className='div'>
                <label>Name</label>
                <input className="form-control" 
                type='text' 
                placeholder="New Member Name"
                value={name}
                onChange={
                    (e) => setName(e.target.value)
                }
                />
            </div>
            <div className='div'>
                <label>Email ID</label>
                <input className="form-control" 
                type='email' 
                placeholder="New Member Email" 
                value={email}
                onChange={
                    (e) => setEmail(e.target.value)
                }
                />
            </div>
            <input className="btn btn-block" type='submit' value="Add Member" style={{backgroundColor: '#f8f8ff', color:'black'}} />
        </form>
    )
}

export default AddMember
