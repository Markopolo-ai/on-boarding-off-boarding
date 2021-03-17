import React from 'react'
import Button from './Button.js'

const LeftPanel = () => {

    const onClick = () => (
        console.log("Click")
    )

    return (
        <div>
            <Button onClick={onClick}/>
        </div>
    )
}

export default LeftPanel
