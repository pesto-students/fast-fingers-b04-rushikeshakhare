import React from 'react';
import './textInput.scss';

export const TextInput = ({onChange,value}) => {
    return <input type="text" 
    className="text-input" 
    autoFocus={true} 
    placeholder="TYPE YOUR NAME" 
    spellCheck={false} 
    onChange={onChange}
    value={value}/>
}