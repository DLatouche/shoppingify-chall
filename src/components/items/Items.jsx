
import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setItems } from "../../redux/actions/item.action"
import { addItemToListAction } from "../../redux/actions/list.action"
import { categoriesSortedSelector } from "../../redux/selectors/categories.selector"
import { itemsSortedByCategorySelector, itemsSortedSelector } from "../../redux/selectors/items.selector"
import { currentListSelector } from "../../redux/selectors/lists.selector"
import { include } from "../../utilities/helper"
import InputSearch from "../general/search/InputSearch"
import ItemStore from "./Item"
import './Items.scss'

const Items = ({ items, categoriesWithFruits, addToList, currentList }) => {

    const [itemsToShow, setItemsToShow] = useState(items)
    useEffect(() => {
        setItemsToShow(items)
    }, [items])
    const onSearch = (value) => {
        let list = items.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
        setItemsToShow(list)
    }
    let disabled = currentList ? currentList.state !== "EDITING" : true
    const addToCurrentList = async (item) => {
        let newItem = {...item, check: false}
        let result = await addToList(newItem, currentList)
        if (result.status === "FAILED") console.log("%cItems.jsx -> 24 ERROR: result.message", 'background: #FF0000; color:#FFFFFF', result.message)
    }

    return (
        <div className="items">
            <div className="items__header">
                <p className="items__intro"><em className="items__intro__word">Shoppingify</em> allows you take your shopping list wherever you go</p>
                <InputSearch onSearch={onSearch} list={items} />
            </div>
            <div className="items__categories">
                {categoriesWithFruits.map(category => <CategoryView disabled={disabled} key={category.id + "c"} category={category} itemsToShow={itemsToShow} addToCurrentList={addToCurrentList} />)}
            </div>
        </div>
    )
}

const CategoryView = ({ category, itemsToShow, addToCurrentList, disabled }) => {
    let { items } = category
    let itemsView = items.map(item => {
        if (include(itemsToShow, (itemList) => {
            return item.id === itemList.id
        })) {
            return <ItemStore disabled={disabled} key={item.id + "i"} item={item} add={addToCurrentList} />
        }
    })
    return (<div className="items__category">
        <p className="items__category__name">{category.name + " (" + items.length + ")"}</p>
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
    const addToList = useCallback(
        (item, list) => {
            return dispatch(addItemToListAction({ item, list }))
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
        <Items items={items} categoriesWithFruits={categoriesWithFruits} addToList={addToList} currentList={currentList} />
    )
}

export default ItemsStore