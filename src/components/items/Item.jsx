
import React from "react"
import './Item.scss'
import AddIcon from '@material-ui/icons/Add';
const Item = ({ item, }) => {
    console.log("Item.jsx -> 6: item", item  )
    return (
        <div className="item">
            <p className="item__name">{item.name}</p>
            <AddIcon className="item__icon" />
        </div>
    )
}


export const ItemStore = ({ item }) => {
    console.log("Item.jsx -> 17: item", item  )
    return (
        <Item item={item} />
    )
}

export default ItemStore