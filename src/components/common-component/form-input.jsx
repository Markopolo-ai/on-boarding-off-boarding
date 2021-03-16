import React from 'react';

import "./form-input.scss";

const FormInput = ({handleChange, label,type,value, ...otherProps}) => {

    return (
        <div className="group">
            {<div><input type={type} className="form-input" value={value} onChange={handleChange} {...otherProps} />
                {
                label ? (<label className ={`${value ? 'shrink': ''} form-input-label `}>{label}
                </label>) : null
                }</div>}
            
        </div>
    )
}

export default FormInput;