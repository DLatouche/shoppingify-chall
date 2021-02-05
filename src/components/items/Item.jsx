
import React, { useEffect, useState } from "react"
import './Item.scss'
import AddIcon from '@material-ui/icons/Add';
const Item = ({ item, add, disabled }) => {
    const [itemView, setItem] = useState({ ...item })
    useEffect(() => {
        setItem(item)
    }, [item])
    return (
        <div className={!disabled ? "item" : "item item--disabled"}>
            <p className="item__name">{itemView.name}</p>
            <AddIcon className="item__icon" onClick={() => { if (!disabled) add(itemView) }} />
        </div>
    )
}


export const ItemStore = ({ item, add, disabled }) => {
    return (
        <Item item={item} add={add} disabled={disabled} />
    )
}

export default ItemStore