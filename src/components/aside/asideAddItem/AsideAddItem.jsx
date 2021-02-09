
import React, { useCallback, useState } from "react"
import './AsideAddItem.scss';
import Input from "../../general/input/Input"
import BigButton from "../../general/bigButton/BigButton"
import Select from "../../general/select/Select";
import { categoriesSortedSelector } from "../../../redux/selectors/categories.selector";
import { useDispatch, useSelector } from "react-redux";
import { setAsideAction } from "../../../redux/actions/aside.action";
import { addItemToListAction } from "../../../redux/actions/list.action";
import { currentListSelector } from "../../../redux/selectors/lists.selector";
import { addItemAction } from "../../../redux/actions/item.action";
import { addCategoryAction } from "../../../redux/actions/category.action";
import { Checkbox } from "@material-ui/core";

const AsideAddItem = ({ className, listCategories, setAside, currentList, addToCurrentList, addItem, addCategory }) => {

    const [item, setItem] = useState({
        id: null, name: "",
        category: { id: null, name: "" },
        note: "",
        image: "",
        check: false
    })

    const saveItem = async () => {
        let newItem = item
        let category = {}
        if (!newItem.category.id) {
            category = await addCategory(newItem.category)
            newItem.category = category
        }
        newItem = await addItem(newItem)
        let result = await addToCurrentList({ list: currentList, item: newItem })
        if (result.status === "FAILED") console.log("%cAsodeAddItems.jsx -> 24 ERROR: result.message", 'background: #FF0000; color:#FFFFFF', result.message)
        if (result.status === "OK") {
            setItem({
                id: null,
                name: "",
                category: { id: null, name: "" },
                note: "",
                image: ""
            })
            setAside("LIST")
        }
    }

    const onInputChange = (e, value) => {
        let name = e.target.name
        if (name === "category") {
            setItem({ ...item, category: { id: null, name: value } })

        } else {
            setItem({ ...item, [name]: value })
        }
    }

    const onSelectChange = (e, categorySelected) => {
        setItem({ ...item, category: { id: categorySelected.key, name: categorySelected.name } })
    }

    const onCancel = () => {
        setItem({
            id: null,
            name: "",
            category: { id: null, name: "" },
            note: "",
            image: ""
        })
        setAside("LIST")
    }
    return (
        <div className={className + " asideAddItem"}>
            <p className="asideAddItem__title">Add a new item</p>
            <Input className="asideAddItem__input" value={item.name} placeholder="Enter a name" name="name" label="Name" onChange={onInputChange} />
            <Input className="asideAddItem__input" value={item.note} placeholder="Enter a note" name="note" label="Note (optional)" variant="multiline" onChange={onInputChange} />
            <Input className="asideAddItem__input" value={item.image} placeholder="Enter a url" name="image" label="Image (optional)" onChange={onInputChange} />
            <Input className="asideAddItem__input" value={item.category.name} placeholder="Enter a category" name="category" label="Category" onChange={onInputChange} />
            <Select className="asideAddItem__select" onChange={onSelectChange} value={item.category.id} list={listCategories} />
            <div className="asideAddItem__actions">
                <BigButton className="asideAddItem__actions__button" variant="transparent" onClick={onCancel}>cancel</BigButton>
                <BigButton className="asideAddItem__actions__button" variant="primary" onClick={saveItem}>save</BigButton>
            </div>
        </div>
    )
}


export const AsideAddItemStore = ({ className }) => {
    const categories = useSelector(categoriesSortedSelector)
    const currentList = useSelector(currentListSelector)


    const dispatch = useDispatch()
    let listCategories = []


    const addToCurrentList = useCallback(
        ({ item, list }) => {
            return dispatch(addItemToListAction({ item, list }))
        },
        [dispatch]
    )

    const addItem = useCallback(
        (item) => {
            return dispatch(addItemAction({ item }))
        },
        [dispatch]
    )
    const addCategory = useCallback(
        (category) => {
            return dispatch(addCategoryAction({ category }))
        },
        [dispatch]
    )
    const setAside = useCallback(
        (aside) => {
            return dispatch(setAsideAction(aside))
        },
        [dispatch]
    )

    categories.forEach(category => {
        listCategories.push({ key: category.id, name: category.name })
    });

    return (
        <AsideAddItem className={className} listCategories={listCategories} setAside={setAside} currentList={currentList} addToCurrentList={addToCurrentList} addItem={addItem} addCategory={addCategory} />
    )
}

export default AsideAddItemStore