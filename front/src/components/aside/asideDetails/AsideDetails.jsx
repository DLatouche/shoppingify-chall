
import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setAsideAction } from "../../../redux/actions/aside.action";
import { deleteItemAction } from "../../../redux/actions/item.action";
import { addItemToListAction } from "../../../redux/actions/list.action";
import { currentItemSelector } from "../../../redux/selectors/currentItem.selector";
import { currentListSelector } from "../../../redux/selectors/lists.selector";
import './AsideDetails.scss';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import BigButton from "../../general/bigButton/BigButton";
import Dialog from '../../general/dialog/Dialog'

const AsideDetails = ({ className, currentList, currentItem, setAside, deleteItem, addItemToList }) => {
    const [item, setItem] = useState(currentItem)
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setItem(currentItem)
    }, [currentItem])

    const onDelete = async () => {
        setOpen(true)
    }

    const deleteCurrentItem = async () => {
        setOpen(false)
        await deleteItem(currentItem)
        setAside("LIST")
    }

    const onAddToList = async () => {
        await addItemToList({ item: currentItem, list: currentList })
        setAside("LIST")
    }

    const goBack = () => {
        setAside("LIST")
    }

    if (!item || !item.name) {
        return (<div className={className + " asideDetails"}>
            <p>No item selected</p>
        </div>)
    } else {
        return (
            <div className={className + " asideDetails"}>
                <Dialog open={open} onCancel={() => { setOpen(false) }} onValid={deleteCurrentItem} text={"Are you sure that you want to delete this item (" + item.name + ")?"} />
                <div className="asideDetails__back" onClick={goBack}>
                    <KeyboardBackspaceIcon className="asideDetails__back__icon" />
                    <p className="asideDetails__back__text">back</p>
                </div>
                <div className="asideDetails__body">
                    <img src={item.image} alt={item.name + " item (no image)"} className="asideDetails__body__image" />

                    <div className="asideDetails__body__item">
                        <p className="asideDetails__body__item__name">name</p>
                        <p className="asideDetails__body__item__data">{item.name}</p>
                    </div>
                    <div className="asideDetails__body__item">
                        <p className="asideDetails__body__item__name">category</p>
                        <p className="asideDetails__body__item__data">{item.category.name}</p>
                    </div>
                    <div className="asideDetails__body__item">
                        <p className="asideDetails__body__item__name">note</p>
                        <p className="asideDetails__body__item__data">{item.note}</p>
                    </div>
                </div>
                <div className="asideDetails__footer">
                    <BigButton className="asideDetails__footer__button" variant="white" onClick={onDelete}>delete</BigButton>
                    <BigButton className="asideDetails__footer__button" onClick={onAddToList}>Add to list</BigButton>
                </div>
            </div>
        )
    }
}


export const AsideDetailsStore = ({ className }) => {
    const list = useSelector(currentListSelector)
    const currentItem = useSelector(currentItemSelector)

    const dispatch = useDispatch()
    const setAside = useCallback(
        (aside) => {
            return dispatch(setAsideAction(aside))
        },
        [dispatch]
    )
    const deleteItem = useCallback(
        (item) => {
            return dispatch(deleteItemAction(item))
        },
        [dispatch]
    )
    const addItemToList = useCallback(
        ({ item, list }) => {
            return dispatch(addItemToListAction({ item, list }))
        },
        [dispatch]
    )

    return (
        <AsideDetails className={className} currentList={list} setAside={setAside} deleteItem={deleteItem} addItemToList={addItemToList} currentItem={currentItem} />
    )
}

export default AsideDetailsStore