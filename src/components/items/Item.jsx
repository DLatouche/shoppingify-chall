
import React, { useEffect, useState } from "react"
import './Item.scss'
import AddIcon from '@material-ui/icons/Add';
const Item = ({ item, add }) => {
    const [itemView, setItem] = useState({ ...item })
    useEffect(() => {
        setItem(item)
    }, [item])
    return (
        <div className="item">
            <p className="item__name">{itemView.name}</p>
            <AddIcon className="item__icon" onClick={() => { add(itemView) }} />
        </div>
    )
}


export const ItemStore = ({ item, add }) => {
    return (
        <Item item={item} add={add} />
    )
}

export default ItemStore