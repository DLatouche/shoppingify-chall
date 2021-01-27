
import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteMultiItemAction } from "../../redux/actions/item.action"
import { itemsSortedSelector } from "../../redux/selectors/items.selector"

const Items = ({ items, onDeleteMulti, }) => {
    console.log("Items.jsx -> 5: items", items)
    return (
        <div>Items</div>
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