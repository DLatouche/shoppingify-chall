
import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setAsideAction } from "../../redux/actions/aside.action"
import { deleteMultiItemAction } from "../../redux/actions/item.action"
import { categoriesSortedSelector } from "../../redux/selectors/categories.selector"
import { itemsSortedByCategorySelector, itemsSortedSelector } from "../../redux/selectors/items.selector"
import { include } from "../../utilities/helper"
import InputSearch from "../general/search/InputSearch"
import ItemStore from "./Item"
import './Items.scss'

const Items = ({ items, onDeleteMulti, categoriesWithFruits, setAside }) => {

    const [itemsToShow, setItemsToShow] = useState(items)

    const onSearch = (value) => {
        let list = items.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
        setItemsToShow(list)
    }

    let aside = 0
    const changeAside = () => {
        aside++
        console.log("Items.jsx -> 21: aside", aside)
        let nameAside = "LIST"
        if (aside === 1) {
            nameAside = "DETAILS"
        }
        else if (aside === 2) {
            nameAside = "ADD_ITEM"
        } else {
            aside = 0
        }
        console.log("Items.jsx -> 30: aside, nameAside", aside, nameAside)

        setAside(nameAside)
    }

    return (
        <div className="items">
            <div className="items__header">
                <p className="items__intro"><em className="items__intro__word" onClick={changeAside}>Shoppingify</em> allows you take your shopping list wherever you go</p>
                <InputSearch onSearch={onSearch} list={items} />
            </div>
            <div className="items__categories">
                {categoriesWithFruits.map(category => categoryView({ category, itemsToShow }))}
            </div>
        </div>
    )
}

const categoryView = ({ category, itemsToShow }) => {
    console.log("Items.jsx -> 53: itemsToShow", itemsToShow)
    let { items } = category
    let itemsView = items.map(item => {
        if (include(itemsToShow, (itemList) => {
            return item.id === itemList.id
        })) {
            return <ItemStore key={item.id} item={item} />
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
    //const itemsSortedByCategories = useSelector(itemsSortedByCategorySelector)
    const dispatch = useDispatch()
    const onDeleteMulti = useCallback(
        (ids) => {
            return dispatch(deleteMultiItemAction(ids))
        },
        [dispatch]
    )

    const setAside = useCallback(
        (aside) => {
            return dispatch(setAsideAction(aside))
        },
        [dispatch]
    )

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
        <Items items={items} categoriesWithFruits={categoriesWithFruits} onDeleteMulti={onDeleteMulti} setAside={setAside} />
    )
}

export default ItemsStore