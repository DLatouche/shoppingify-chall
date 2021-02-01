
import React, { useState } from "react"
import './ItemList.scss';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
const ItemList = ({ item }) => {
    const [stateItem, setItem] = useState(item)

const add = () => {
    item = { ...stateItem }
    item.quantity += 1
    setItem(item)
}
const deduct = () => {
    item = { ...stateItem }
    item.quantity -= 1
    setItem(item)

}
const remove = () => {
    item = { ...stateItem }
    item.quantity = 0
    setItem(item)

}
return (
    <div className={"itemList"}>
        <p className="itemList__name">{stateItem.name}</p>
        <ItemButton quantity={stateItem.quantity} add={add} deduct={deduct} remove={remove}/>

    </div>
)
}

const ItemButton = ({ quantity, remove, deduct, add }) => {
    const [editing, setEditing] = useState(false)

    const updateEditing = () => setEditing(!editing)


    return (
        <div className={!editing ? "ItemList__button" : "ItemList__button ItemList__button--editing"} >
            <DeleteOutlineIcon onClick={remove} className="ItemList__button__icon ItemList__button__icon--delete" />
            <RemoveIcon onClick={deduct} className="ItemList__button__icon ItemList__button__icon--remove" />
            <p onClick={updateEditing} className="ItemList__button__quantity">{quantity}<em className="ItemList__button__quantity_pcs">pcs</em></p>
            <AddIcon onClick={add} className="ItemList__button__icon ItemList__button__icon--add" />
        </div>
    )
}

export const ItemListStore = ({ item }) => {
    return (
        <ItemList item={item} />
    )
}

export default ItemListStore