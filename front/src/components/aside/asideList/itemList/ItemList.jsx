
import React, { useEffect, useState } from "react"
import './ItemList.scss';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
const ItemList = ({ item, removeFromList, listEditing, update }) => {
    const [stateItem, setItem] = useState(item)
    const [isOpened, setOpen] = useState(false)
    useEffect(() => {
        setItem(item)
    }, [item])

    useEffect(() => {
        if(!listEditing) setOpen(false)
    }, [listEditing])

    const add = () => {
        item = { ...stateItem }
        item.quantity += 1
        setItem(item)
        update(item)
    }
    const deduct = () => {
        if (!listEditing) return
        item = { ...stateItem }
        item.quantity -= 1
        setItem(item)
        if (item.quantity === 0) {
            removeFromList(item)
        }else{
            update(item)
        }

    }
    const remove = () => {
        if (!listEditing) return
        item = { ...stateItem }
        item.quantity = 0
        setItem(item)
        removeFromList(item)
    }

    const onCheck = () => {
        let item = { ...stateItem }
        item.check = !item.check
        setItem(item)
        update(item)
    }

    const toggleOpen = () => {
        if (!listEditing) {
            onCheck()
        } else {
            setOpen(!isOpened)
        }
    }

    const onClickName = () => {
        if (!listEditing) {
            onCheck()
        }
    }

    let containerClass = "itemList"
    if (listEditing) containerClass += " itemList--editing"
    if (stateItem.check) containerClass += " itemList--checked"
    return (
        <div className={containerClass}>
            {stateItem.check ? <CheckBoxOutlinedIcon onClick={onCheck} className="itemList__checkbox" /> : <CheckBoxOutlineBlankOutlinedIcon onClick={onCheck} className="itemList__checkbox" />}
            <p onClick={onClickName} className="itemList__name">{stateItem.name}</p>
            <div className={!isOpened ? "ItemList__button" : "ItemList__button ItemList__button--editing"} >
                <DeleteOutlineIcon onClick={remove} className="ItemList__button__icon ItemList__button__icon--delete" />
                <RemoveIcon onClick={deduct} className="ItemList__button__icon ItemList__button__icon--remove" />
                <p onClick={toggleOpen} className="ItemList__button__quantity">{stateItem.quantity}<em className="ItemList__button__quantity_pcs">pcs</em></p>
                <AddIcon onClick={add} className="ItemList__button__icon ItemList__button__icon--add" />
            </div>
        </div>
    )
}

export const ItemListStore = ({ item, removeFromList, editing, update, listState }) => {
    return (
        <ItemList item={item} removeFromList={removeFromList} listEditing={editing} update={update} />
    )
}

export default ItemListStore