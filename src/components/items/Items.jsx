
import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addItemToListAction } from "../../redux/actions/list.action"
import { categoriesSortedSelector } from "../../redux/selectors/categories.selector"
import { itemsSortedByCategorySelector, itemsSortedSelector } from "../../redux/selectors/items.selector"
import { currentListSelector } from "../../redux/selectors/lists.selector"
import { include } from "../../utilities/helper"
import InputSearch from "../general/search/InputSearch"
import ItemStore from "./Item"
import './Items.scss'

const Items = ({ items, categoriesWithFruits, addToCurrentList }) => {

    const [itemsToShow, setItemsToShow] = useState(items)

    const onSearch = (value) => {
        let list = items.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
        setItemsToShow(list)
    }

    const addToList = async (item) => {
        let result = await addToCurrentList(item)
        if (result.status === "FAILED") console.log("%cItems.jsx -> 24 ERROR: result.message", 'background: #FF0000; color:#FFFFFF', result.message)
    }

    return (
        <div className="items">
            <div className="items__header">
                <p className="items__intro"><em className="items__intro__word">Shoppingify</em> allows you take your shopping list wherever you go</p>
                <InputSearch onSearch={onSearch} list={items} />
            </div>
            <div className="items__categories">
                {categoriesWithFruits.map(category => categoryView({ category, itemsToShow, addToList }))}
            </div>
        </div>
    )
}

const categoryView = ({ category, itemsToShow, addToList }) => {
    let { items } = category
    let itemsView = items.map(item => {
        if (include(itemsToShow, (itemList) => {
            return item.id === itemList.id
        })) {
            return <ItemStore key={item.id} item={item} add={addToList} />
        }
    })
    return (<div key={category.id} className="items__category">
        <p className="items__category__name">{category.name}</p>
        {items.length === 0 ? <p className="items_category_noItem">No item in this category</p> : null}
        <div className="items__category__items">
            {itemsView}
        </div>
    </div>)
}


export const ItemsStore = () => {
    const items = useSelector(itemsSortedSelector)
    const categories = useSelector(categoriesSortedSelector)
    const currentList = useSelector(currentListSelector)

    const dispatch = useDispatch()
    const addToCurrentList = useCallback(
        (item) => {
            return dispatch(addItemToListAction({ item, list: currentList[0] }))
        },
        [dispatch]
    )

    // List of categories with their items
    let categoriesWithFruits = []
    let categoriesWithFruitsMap = {}
    categories.forEach(category => {
        categoriesWithFruitsMap[category.id] = { ...category, items: [] }
    })
    items.forEach((item) => {
        categoriesWithFruitsMap[item.category.id].items.push(item)
    })
    Object.keys(categoriesWithFruitsMap).forEach(key => categoriesWithFruits.push(categoriesWithFruitsMap[key]))


    return (
        <Items items={items} categoriesWithFruits={categoriesWithFruits} addToCurrentList={addToCurrentList} />
    )
}

export default ItemsStore