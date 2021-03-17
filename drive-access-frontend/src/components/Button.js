import React from 'react'

const Button = ({onClick}) => {
    return (
        <button onClick={onClick} type="button" className="btn">Add</button>
    )
}

export default Button
