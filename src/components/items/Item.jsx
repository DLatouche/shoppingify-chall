
import React from "react"
import './Item.scss'
import AddIcon from '@material-ui/icons/Add';
const Item = ({ item, }) => {
    return (
        <div className="item">
            <p className="item__name">{item.name}</p>
            <AddIcon className="item__icon" />
        </div>
    )
}


export const ItemStore = ({ item }) => {
    return (
        <Item item={item} />
    )
}

export default ItemStore