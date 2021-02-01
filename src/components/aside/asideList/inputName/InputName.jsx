
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import './InputName.scss';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
const InputName = ({ name }) => {
    const [editing, setEditing] = useState(false)
    const [stateName, setName] = useState(name)
    const inputRef = useRef(null);

    useLayoutEffect(() => {
        if (editing) {
          inputRef.current.focus();
        }
      }, [editing]);

    const updateEditing = () => setEditing(!editing)

    const onChange = (e) => {
        let value = e.target.value
        setName(value)
    }

    const onCancel = (e) => {
        setName(name)
        updateEditing()
    }

    const onValidate = (e) => {
        updateEditing()
    }
    return (
        <div className={!editing ? "inputName" : "inputName inputName--editing"}>
            <input className="inputName__input" ref={inputRef} value={stateName} onChange={onChange} disabled={!editing} />
            <EditIcon onClick={updateEditing} className="inputName__icon inputName__icon--edit" />
            <DoneIcon onClick={onValidate} className="inputName__icon inputName__icon--validate" />
            <CloseIcon onClick={onCancel} className="inputName__icon inputName__icon--cancel" />
        </div>
    )
}

export const InputNameStore = ({ name }) => {
    return (
        <InputName name={name} />
    )
}

export default InputNameStore