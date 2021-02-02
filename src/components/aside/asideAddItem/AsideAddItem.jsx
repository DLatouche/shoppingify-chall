
import React from "react"
import './AsideAddItem.scss';
import Input from "../../general/input/Input"
import BigButton from "../../general/bigButton/BigButton"
import Select from "../../general/select/Select";
import { categoriesSortedSelector } from "../../../redux/selectors/categories.selector";
import { useSelector } from "react-redux";

const AsideAddItem = ({ className, listCategories }) => {
    return (
        <div className={className + " asideAddItem"}>
            <p className="asideAddItem__title">Add a new item</p>
            <Input className="asideAddItem__input" value="" placeholder="Enter a name" name="Name" onChange={() => { }} />
            <Input className="asideAddItem__input" value="" placeholder="Enter a note" name="Note (optional)" variant="multiline" onChange={() => { }} />
            <Input className="asideAddItem__input" value="" placeholder="Enter a url" name="Image (optional)" onChange={() => { }} />
            <Input className="asideAddItem__input" value="" placeholder="Enter a category" name="Category" onChange={() => { }} />
            <Select className="asideAddItem__select" onChange={() => { }} value={listCategories[0]} list={listCategories} />
            <div className="asideAddItem__actions">
                <BigButton className="asideAddItem__actions__button" variant="transparent" onClick={() => { }}>cancel</BigButton>
                <BigButton className="asideAddItem__actions__button" variant="primary" onClick={() => { }}>save</BigButton>

            </div>
        </div>
    )
}


export const AsideAddItemStore = ({ className }) => {
    const categories = useSelector(categoriesSortedSelector)
    let listCategories = []
    categories.forEach(category => {
        listCategories.push({ key: category.id, name: category.name })
    });
    return (
        <AsideAddItem className={className} listCategories={listCategories} />
    )
}

export default AsideAddItemStore