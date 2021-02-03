
import React, { useCallback } from "react"
import './AsideList.scss';
import Button from "../../general/button/Button"
import bottle from './source.svg'
import { currentListSelector } from "../../../redux/selectors/lists.selector";
import { useDispatch, useSelector } from "react-redux";
import ItemListStore from "./itemList/ItemList";
import InputNameStore from "./inputName/InputName";
import { setAsideAction } from "../../../redux/actions/aside.action";
const AsideList = ({ className, list, setAside }) => {
    return (
        <div className={className + " asideList"}>
            <div className="asideList__header">
                <img className="asideList__img" src={bottle} alt="Bottle" />
                <div className="asideList__header__container" >
                    <p className="asideList__header__intro">Didn’t find what you need?</p>

                    <Button className="asideList__header__button" variant="white" onClick={() => { setAside("ADD_ITEM") }}>Add item</Button>
                </div>
            </div>
            <div className="asideList__body">
                <div className="asideList__body__name">
                    <InputNameStore name={list.name} />
                </div>
                <div className="asideList__body__list">
                    {list.categories.map(category => {
                        return (
                            <div key={category.id} className="asideList__body__list__category">
                                <p className="asideList__body__list__category__name">{category.name}</p>
                                <div className="asideList__body__list__category_items">
                                    {category.items.map(item => <ItemListStore key={item.id} item={item} />)}
                                </div>
                            </div>
                        )
                    })}

                </div>

            </div>
            <div className="asideList__footer">
            </div>
        </div >
    )
}


export const AsideListStore = ({ className }) => {
    const list = useSelector(currentListSelector)
    const dispatch = useDispatch()

    const setAside = useCallback(
        (aside) => {
            return dispatch(setAsideAction(aside))
        },
        [dispatch]
    )
    return (
        <AsideList className={className} list={list[0]} setAside={setAside} />
    )
}

export default AsideListStore