
import React, { useRef, useState } from "react"
import './Input.scss';
import ClearIcon from '@material-ui/icons/Clear';
import { FocusWithin } from 'react-focus-within'
const Input = ({ variant, onChange, className, value, placeholder, name, type = "text" }) => {
    const [valueState, setValue] = useState(value)
    const inputRef = useRef(null);

    const handleChange = (e) => {
        let value = e.target.value
        setValue(value)
        onChange(e, value)
    }

    const handleClear = (e) => {
        setValue("")
        onChange(e, "")
    }

    const handleFocus = () => {
        inputRef.current.focus()
    }

   
    return (
        <FocusWithin
        >
            {({ focusProps, isFocused }) => (
                <div {...focusProps} className={isFocused ? "input input--focused input--" + variant + " " + className : "input input--" + variant + " " + className} >
                    <p className="input__name">{name}</p>
                    <div className="input__container" onClick={handleFocus}>
                        {variant === "multiline" ?
                            <textarea ref={inputRef} className="input__container__input" onChange={handleChange} value={valueState} type={type} placeholder={placeholder} />
                            : <input ref={inputRef} className="input__container__input" onChange={handleChange} value={valueState} type={type} placeholder={placeholder} />
                        }
                        <ClearIcon onClick={handleClear} className="input__container__icon" />
                    </div>
                </div>
            )
            }
        </FocusWithin>

    )
}

export default Input