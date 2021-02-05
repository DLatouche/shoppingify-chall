
import React, { useCallback, useEffect, useState } from "react"
import './AsideList.scss';
import Button from "../../general/button/Button"
import bottle from './source.svg'
import goToShop from './goToShop.svg'
import { currentListSelector } from "../../../redux/selectors/lists.selector";
import { useDispatch, useSelector } from "react-redux";
import ItemListStore from "./itemList/ItemList";
import EditIcon from '@material-ui/icons/Edit';

import { setAsideAction } from "../../../redux/actions/aside.action";
import { addListAction, updateListAction } from "../../../redux/actions/list.action";
import { getInclude } from "../../../utilities/helper";
import BigButton from "../../general/bigButton/BigButton";
const AsideList = ({ className, list, setAside, updateList }) => {
    const [name, setName] = useState(list ? list.name : "")
    useEffect(() => {
        setName(list.name)
    }, [list])

    if (!list) return (
        <div className={className + " asideList"}>
            <p className="asideList__waiting">List is creating...</p>
        </div>)

    let listState = list.state
    let noItem = list.categories.length === 0

    const removeFromList = async (item) => {
        let updatedList = { ...list }
        let indexCategogry = getInclude(updatedList.categories, category => category.id === item.category.id)
        let indexItem = getInclude(updatedList.categories[indexCategogry].items, itemCategory => itemCategory.id === item.id)
        if (updatedList.categories[indexCategogry].items.length <= 1) {
            updatedList.categories.splice(indexCategogry, 1)
        } else {
            updatedList.categories[indexCategogry].items.splice(indexItem, 1)
        }
        let result = await updateList(updatedList)
        console.log("AsideList.jsx -> 36: result", result)

    }

    const onSave = async () => {
        let listUpdated = { ...list }
        listUpdated.name = name
        listUpdated.state = "IN_PROGRESS"
        let result = await updateList(listUpdated)
        setName("")
    }

    const onCancel = () => {
        cancelList()
    }

    const cancelList = async () => {
        let listUpdated = { ...list }
        listUpdated.state = "CANCELLED"
        let result = await updateList(listUpdated)
    }

    const updateEditing = async () => {
        let listUpdated = { ...list }
        listUpdated.state = "EDITING"
        let result = await updateList(listUpdated)
    }


    const onComplete = async () => {
        let listUpdated = { ...list }
        listUpdated.state = "COMPLETE"
        let result = await updateList(listUpdated)
    }

    const onChange = (e) => {
        setName(e.target.value)
    }

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
                <div className={list.name ? "asideList__body__name" : "asideList__body__name asideList__body__name--hidden"}>
                    <p className={!noItem ? "asideList__body__name__text" : "asideList__body__name__text asideList__body__name__text--hidden"}>
                        {list.name}
                    </p>
                    <EditIcon onClick={updateEditing} className={listState === "IN_PROGRESS" ? "asideList__body__name__icon" : "asideList__body__name__icon asideList__body__name__icon--hidden"} />

                </div>
                <div className="asideList__body__list">

                    {!noItem ? list.categories.map(category => {
                        return (
                            <div key={category.id} className="asideList__body__list__category">
                                <p className="asideList__body__list__category__name">{category.name}</p>
                                <div className="asideList__body__list__category_items">
                                    {category.items.map(item => <ItemListStore key={item.id} item={item} removeFromList={removeFromList} editing={list.state === "EDITING"} />)}
                                </div>
                            </div>
                        )
                    }) : null}

                </div>
                {noItem ? <div className="asideList__body__noItem">
                    <p className="asideList__body__noItem__text">No items</p>
                </div> : null}

            </div>
            <div className={!noItem ? "asideList__footer" : "asideList__footer asideList__footer--noItem"}>
                <img className="asideList__footer__img" src={goToShop} alt="Go to add item picture" />
                {listState === "IN_PROGRESS" ?
                    <>
                        <BigButton className="asideList__footer__action__button" onClick={onCancel} variant="transparent" type="text">Cancel</BigButton>
                        <BigButton className="asideList__footer__action__button" onClick={onComplete} variant="blue" type="text">Complete</BigButton>
                    </>

                    :
                    <div className="asideList__footer__inputName">
                        <input className="asideList__footer__inputName__input" disabled={noItem} onChange={onChange} value={name} type="text" placeholder="Enter a name" />
                        <BigButton className="asideList__footer__inputName__button" disabled={noItem} onClick={onSave} type="text">Save</BigButton>
                    </div>
                }
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

    const createList = useCallback(
        (list) => {
            return dispatch(addListAction(list))
        },
        [dispatch]
    )

    const updateList = useCallback(
        (list) => {
            return dispatch(updateListAction(list))
        },
        [dispatch]
    )


    if (!list) {
        // create a new list
        let newList = { id: null, name: "", state: "EDITING", categories: [], date: new Date() }
        createList(newList)
    }
    return (
        <AsideList className={className} list={list} setAside={setAside} updateList={updateList} />
    )
}

export default AsideListStore