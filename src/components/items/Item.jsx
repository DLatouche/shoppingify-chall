
import React from "react"
import './Item.scss'
import AddIcon from '@material-ui/icons/Add';
const Item = ({ item, add }) => {
    return (
        <div className="item">
            <p className="item__name">{item.name}</p>
            <AddIcon className="item__icon" onClick={() => { add(item) }} />
        </div>
    )
}


export const ItemStore = ({ item, add }) => {
    return (
        <Item item={item} add={add} />
    )
}

export default ItemStore