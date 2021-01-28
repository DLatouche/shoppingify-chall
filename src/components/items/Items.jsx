
import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteMultiItemAction } from "../../redux/actions/item.action"
import { itemsSortedSelector } from "../../redux/selectors/items.selector"
import InputSearch from "../general/search/InputSearch"
import './Item.scss'

const Items = ({ items, onDeleteMulti, }) => {
    console.log("Items.jsx -> 5: items", items)
    const onSearch = (list) => {
        console.log("Items.jsx -> 12: list", list  )
    }
    return (
        <div className="Items">
            <div className="header">
                <p className="intro"><em className="primaryWord">Shoppingify</em> allows you take your shopping list wherever you go</p>
                <InputSearch onSearch={onSearch} list={items}/>
            </div>
        </div>
    )
}


export const ItemsStore = () => {
    const items = useSelector(itemsSortedSelector)
    const dispatch = useDispatch()
    const onDeleteMulti = useCallback(
        (ids) => {
            return dispatch(deleteMultiItemAction(ids))
        },
        [dispatch]
    )

    return (
        <Items items={items} onDeleteMulti={onDeleteMulti} />
    )
}

export default ItemsStore