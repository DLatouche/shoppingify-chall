
import React, { useCallback, useEffect, useState } from "react"
import './Item.scss'
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from "react-redux";
import { setAsideAction } from "../../../redux/actions/aside.action";
import { setCurrentItemReducer } from "../../../redux/actions/currentItem.action";
const Item = ({ item, add, disabled, setAside, setCurrentItem }) => {
    const [itemView, setItem] = useState({ ...item })
    useEffect(() => {
        setItem(item)
    }, [item])

    const showItem = () => {
        setCurrentItem(itemView)
        setAside("DETAILS")
    }

    const onClickAdd = (e) => {
        e.stopPropagation();
        if (!disabled) add(itemView)
    }
    return (
        <div className={!disabled ? "item" : "item item--disabled"} onClick={showItem}>
            <p className="item__name">{itemView.name}</p>
            <AddIcon className="item__icon" onClick={onClickAdd} />
        </div>
    )
}


export const ItemStore = ({ item, add, disabled }) => {
    const dispatch = useDispatch()

    const setAside = useCallback(
        (aside) => {
            return dispatch(setAsideAction(aside))
        },
        [dispatch]
    )

    const setCurrentItem = useCallback(
        (item) => {
            return dispatch(setCurrentItemReducer(item))
        },
        [dispatch]
    )


    return (
        <Item item={item} add={add} disabled={disabled} setAside={setAside} setCurrentItem={setCurrentItem} />
    )
}

export default ItemStore