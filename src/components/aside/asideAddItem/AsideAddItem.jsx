
import React, { useCallback } from "react"
import './AsideAddItem.scss';
import Input from "../../general/input/Input"
import BigButton from "../../general/bigButton/BigButton"
import Select from "../../general/select/Select";
import { categoriesSortedSelector } from "../../../redux/selectors/categories.selector";
import { useDispatch, useSelector } from "react-redux";
import { setAsideAction } from "../../../redux/actions/aside.action";

const AsideAddItem = ({ className, listCategories, setAside }) => {

    const addItem = () => {
        setAside("LIST")
    }
    return (
        <div className={className + " asideAddItem"}>
            <p className="asideAddItem__title">Add a new item</p>
            <Input className="asideAddItem__input" value="" placeholder="Enter a name" name="Name" onChange={() => { }} />
            <Input className="asideAddItem__input" value="" placeholder="Enter a note" name="Note (optional)" variant="multiline" onChange={() => { }} />
            <Input className="asideAddItem__input" value="" placeholder="Enter a url" name="Image (optional)" onChange={() => { }} />
            <Input className="asideAddItem__input" value="" placeholder="Enter a category" name="Category" onChange={() => { }} />
            <Select className="asideAddItem__select" onChange={() => { }} value={listCategories[0]} list={listCategories} />
            <div className="asideAddItem__actions">
                <BigButton className="asideAddItem__actions__button" variant="transparent" onClick={() => { setAside("LIST") }}>cancel</BigButton>
                <BigButton className="asideAddItem__actions__button" variant="primary" onClick={addItem}>save</BigButton>

            </div>
        </div>
    )
}


export const AsideAddItemStore = ({ className }) => {
    const categories = useSelector(categoriesSortedSelector)
    const dispatch = useDispatch()
    
    let listCategories = []
    categories.forEach(category => {
        listCategories.push({ key: category.id, name: category.name })
    });

    const setAside = useCallback(
        (aside) => {
            return dispatch(setAsideAction(aside))
        },
        [dispatch]
    )
    return (
        <AsideAddItem className={className} listCategories={listCategories} setAside={setAside}/>
    )
}

export default AsideAddItemStore