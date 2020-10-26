import React, { useEffect } from 'react';
import { useState } from 'react';
import { ICONS } from '../../utilities/Constants'
import './dropdown.scss';

export const Dropdown = ({onOptionClick, value, options}) => {

    const [showDropdown,setShowDropdown] = useState(false);

    useEffect(() => {
        document.addEventListener('mousedown',onOutSideClick)
        return () => {
            document.removeEventListener('mousedown',onOutSideClick)
        }
    })

    const getSelectedOptionLabel = () => {
        if(!options || !options.length) return 'DIFFICULTY LEVEL';
        const selectedOption = options.find((option) => option.value === value);
        if(selectedOption) return selectedOption.label;
        return 'DIFFICULTY LEVEL';
    }

    const selectOption = (optionValue) => {
        onOptionClick(optionValue);
        setShowDropdown(false)
    }

    const onOutSideClick = (event) => {
        const selectedElement = document.getElementsByClassName('dropdown');
        if (selectedElement && selectedElement[0] && !selectedElement[0].contains(event.target)) {
            setShowDropdown(false);
        }
    }

    return <div className="dropdown">
                <button type="button" className="dropdown-button" onClick={() => setShowDropdown(!showDropdown)}>
                    <div className="dropdown-button-text">
                      {getSelectedOptionLabel()}
                    </div>
                    <div className="dropdown-button-icon">
                        <img src={ICONS.ARROW_DROPDOWN.path} alt={ICONS.ARROW_DROPDOWN.alt}/>
                    </div>
                </button>
                {showDropdown && 
                <div className="dropdown-options">
                    {options.map((option) => 
                    <button className="option" type="button" onClick={() => selectOption(option.value)} key={option.value}>{option.label}</button>)}
                </div>}
            </div>
}