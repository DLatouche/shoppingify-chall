import React, { useCallback, useEffect, useState } from "react"
import "./AsideList.scss"
import Button from "../../general/button/Button"
import bottle from "./source.svg"
import goToShop from "./goToShop.svg"
import { currentListSelector } from "../../../redux/selectors/lists.selector"
import { useDispatch, useSelector } from "react-redux"
import ItemListStore from "./itemList/ItemList"
import EditIcon from "@material-ui/icons/Edit"

import { setAsideAction } from "../../../redux/actions/aside.action"
import { addListAction, createEmptyListAction, updateListAction } from "../../../redux/actions/list.action"
import { getInclude } from "../../../utilities/helper"
import BigButton from "../../general/bigButton/BigButton"
import Dialog from "../../general/dialog/Dialog"

const AsideList = ({ className, list, setAside, updateList, createEmptyList }) => {
  const [name, setName] = useState(list ? list.name : "")
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (list) setName(list.name)
  }, [list])

  if (!list)
    return (
      <div className={className + " asideList"}>
        <p className="asideList__waiting">List is creating...</p>
      </div>
    )

  let listState = list.state
  let noItem = list.categories.length === 0

  const removeFromList = async (item) => {
    let updatedList = { ...list }
    let indexCategogry = getInclude(updatedList.categories, (category) => category.id === item.category.id)
    let indexItem = getInclude(
      updatedList.categories[indexCategogry].items,
      (itemCategory) => itemCategory.id === item.id
    )
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
    setOpen(true)
    //cancelList()
  }

  const cancelList = async () => {
    setOpen(false)
    let listUpdated = { ...list }
    listUpdated.state = "CANCELLED"
    updateList(listUpdated)
    await createEmptyList()
  }

  const updateEditing = async () => {
    let listUpdated = { ...list }
    listUpdated.state = "EDITING"
    let result = await updateList(listUpdated)
  }

  const onComplete = async () => {
    let listUpdated = { ...list }
    listUpdated.state = "COMPLETED"
    updateList(listUpdated)
    await createEmptyList()
  }

  const onChange = (e) => {
    setName(e.target.value)
  }

  const updateItem = (item) => {
    let listUpdated = { ...list }
    console.log("AsideList.jsx -> 90: item", item)
    console.log("AsideList.jsx -> 91: list", list)
    let iCategory = getInclude(listUpdated.categories, (category) => category.id === item.category.id)
    let iItem = getInclude(listUpdated.categories[iCategory].items, (itm) => itm.id === item.id)
    listUpdated.categories[iCategory].items[iItem] = item
    updateList(listUpdated)
  }

  return (
    <div className={className + " asideList"}>
      <Dialog
        open={open}
        onCancel={() => {
          setOpen(false)
        }}
        onValid={cancelList}
        text="Are you sure that you want to cancel this list?"
      />
      <div className="asideList__header">
        <img className="asideList__img" src={bottle} alt="Bottle" />
        <div className="asideList__header__container">
          <p className="asideList__header__intro">Didn’t find what you need?</p>
          <Button
            className="asideList__header__button"
            variant="white"
            onClick={() => {
              setAside("ADD_ITEM")
            }}
          >
            Add item
          </Button>
        </div>
      </div>
      <div className="asideList__body">
        <div className={list.name ? "asideList__body__name" : "asideList__body__name asideList__body__name--hidden"}>
          <p
            className={
              !noItem
                ? "asideList__body__name__text"
                : "asideList__body__name__text asideList__body__name__text--hidden"
            }
          >
            {list.name}
          </p>
          <EditIcon
            onClick={updateEditing}
            className={
              listState === "IN_PROGRESS"
                ? "asideList__body__name__icon"
                : "asideList__body__name__icon asideList__body__name__icon--hidden"
            }
          />
        </div>
        <div className="asideList__body__list">
          {!noItem
            ? list.categories.map((category) => {
                return (
                  <div key={category.id} className="asideList__body__list__category">
                    <p className="asideList__body__list__category__name">{category.name}</p>
                    <div className="asideList__body__list__category_items">
                      {category.items.map((item) => (
                        <ItemListStore
                          key={item.id}
                          item={item}
                          removeFromList={removeFromList}
                          editing={list.state === "EDITING"}
                          update={updateItem}
                        />
                      ))}
                    </div>
                  </div>
                )
              })
            : null}
        </div>
        {noItem ? (
          <div className="asideList__body__noItem">
            <p className="asideList__body__noItem__text">No items</p>
          </div>
        ) : null}
      </div>
      <div className={!noItem ? "asideList__footer" : "asideList__footer asideList__footer--noItem"}>
        <img className="asideList__footer__img" src={goToShop} alt="Go to add item picture" />
        {listState === "IN_PROGRESS" ? (
          <>
            <BigButton className="asideList__footer__action__button" onClick={onCancel} variant="transparent">
              Cancel
            </BigButton>
            <BigButton className="asideList__footer__action__button" onClick={onComplete} variant="blue">
              Complete
            </BigButton>
          </>
        ) : (
          <div className="asideList__footer__inputName">
            <input
              className="asideList__footer__inputName__input"
              disabled={noItem}
              onChange={onChange}
              value={name}
              type="text"
              placeholder="Enter a name"
            />
            <BigButton className="asideList__footer__inputName__button" disabled={noItem} onClick={onSave}>
              Save
            </BigButton>
          </div>
        )}
      </div>
    </div>
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

  const createEmptyList = useCallback(() => {
    return dispatch(createEmptyListAction())
  }, [dispatch])

  return (
    <AsideList
      className={className}
      list={list}
      setAside={setAside}
      updateList={updateList}
      createEmptyList={createEmptyList}
    />
  )
}

export default AsideListStore
