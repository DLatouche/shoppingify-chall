
import React, { useCallback, useEffect, useState } from "react"
import './Item.scss'
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from "react-redux";
import { setAsideAction } from "../../../redux/actions/aside.action";
import { setCurrentItemReducer } from "../../../redux/actions/currentItem.action";
import { toggleDrawerAction } from "../../../redux/actions/drawer.action";
import { drawerSelector } from "../../../redux/selectors/drawer.selector";
const Item = ({ item, add, disabled, setAside, setCurrentItem, isOpened, useMenu, toggleDrawer }) => {
    const [itemView, setItem] = useState({ ...item })
    useEffect(() => {
        setItem(item)
    }, [item])

    const showItem = () => {
        setCurrentItem(itemView)
        setAside("DETAILS")
        if (useMenu) {
            if (!isOpened) toggleDrawer()
        }
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


export const ItemStore = ({ item, add, disabled, useMenu }) => {
    const dispatch = useDispatch()
    const drawer = useSelector(drawerSelector)

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

    const toggleDrawer = useCallback(
        () => {
            return dispatch(toggleDrawerAction())
        },
        [dispatch]
    )

    return (
        <Item item={item} useMenu={useMenu} add={add} disabled={disabled} setAside={setAside} setCurrentItem={setCurrentItem} isOpened={drawer} toggleDrawer={toggleDrawer} />
    )
}

export default ItemStore