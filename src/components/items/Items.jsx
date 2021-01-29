
import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteMultiItemAction } from "../../redux/actions/item.action"
import { categoriesSortedSelector } from "../../redux/selectors/categories.selector"
import { itemsSortedByCategorySelector, itemsSortedSelector } from "../../redux/selectors/items.selector"
import InputSearch from "../general/search/InputSearch"
import ItemStore from "./Item"
import './Items.scss'

const Items = ({ items, onDeleteMulti, categoriesWithFruits }) => {
    console.log("Items.jsx -> 5: items", items)
    const onSearch = (list) => {
        console.log("Items.jsx -> 12: list", list)
    }


    return (
        <div className="items">
            <div className="items__header">
                <p className="items__intro"><em className="items__intro__word">Shoppingify</em> allows you take your shopping list wherever you go</p>
                <InputSearch onSearch={onSearch} list={items} />
            </div>
            <div className="items__categories">
                {categoriesWithFruits.map(category => categoryView({ category }))}
            </div>
        </div>
    )
}

const categoryView = ({ category }) => {
    let { items } = category
    let itemsView = items.map(item => {
        return <ItemStore item={item} />
    })
    return (<div className="items__category">
        <p className="items__category__name">{category.name}</p>
        {items.length === 0 ? <p className="items_category_noItem">No item in this category</p>:null}
        <div className="items__category__items">
            {itemsView}
        </div>
    </div>)
}


export const ItemsStore = () => {
    const items = useSelector(itemsSortedSelector)
    console.log("%cItems.jsx -> 38 RED: items", 'background: #f44336; color:#FFFFFF', items)

    const categories = useSelector(categoriesSortedSelector)
    //const itemsSortedByCategories = useSelector(itemsSortedByCategorySelector)
    const dispatch = useDispatch()
    const onDeleteMulti = useCallback(
        (ids) => {
            return dispatch(deleteMultiItemAction(ids))
        },
        [dispatch]
    )

    let categoriesWithFruits = []
    let categoriesWithFruitsMap = {}
    categories.forEach(category => {
        categoriesWithFruitsMap[category.id] = { ...category, items: [] }
    })
    items.forEach((item) => {
        console.log("Items.jsx -> 54: item", item.category)
        categoriesWithFruitsMap[item.category.id].items.push(item)
    })
    Object.keys(categoriesWithFruitsMap).forEach(key => categoriesWithFruits.push(categoriesWithFruitsMap[key]))


    return (
        <Items items={items} categoriesWithFruits={categoriesWithFruits} onDeleteMulti={onDeleteMulti} />
    )
}

export default ItemsStore