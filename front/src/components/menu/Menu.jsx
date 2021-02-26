import "./Menu.scss"
import { useHistory } from "react-router"
import { useMediaQuery } from "react-responsive"
import HistoryIcon from "@material-ui/icons/History"
import ListIcon from "@material-ui/icons/List"
import PollOutlinedIcon from "@material-ui/icons/PollOutlined"
import LocalGroceryStoreOutlinedIcon from "@material-ui/icons/LocalGroceryStoreOutlined"
import logo from "./logo.svg"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { listsCancelledOrCompleted, listsSelector } from "../../redux/selectors/lists.selector"
import { toggleDrawerAction } from "../../redux/actions/drawer.action"
const Menu = ({ lists, toggleDrawer }) => {
  const [selected, setSelected] = useState(1)
  const [number, setNumber] = useState(0)
  const history = useHistory()
  const useMenu = useMediaQuery({ query: "(max-width: 999px)" })

  useEffect(() => {
    setNumber(lists.length)
  }, [lists])

  const go = (path) => {
    if (path === "/app/") setSelected(1)
    else if (path === "/app/history") setSelected(2)
    else setSelected(3)
    history.push(path)
  }

  return (
    <div className="menu">
      <div className="menu__logo">
        <img
          src={logo}
          alt="logo"
          onClick={() => {
            go("/app/")
          }}
        />
      </div>
      <div className="menu__nav">
        <div
          className={selected === 1 ? "menu__nav__icons menu__nav--selected" : "menu__nav__icons"}
          onClick={() => {
            go("/app/")
          }}
        >
          <div className="menu__tooltip">
            <ListIcon className="menu__icon" />
            <span className="menu__tooltip__content">items</span>
          </div>
        </div>
        <div
          className={
            selected === 2
              ? "menu__nav__icons menu__nav__icons--notif menu__nav--selected"
              : "menu__nav__icons menu__nav__icons--notif"
          }
          onClick={() => {
            go("/app/history")
          }}
        >
          <span className={number === 0 ? "menu__action__notif--hidden" : "menu__action__notif"}>{number}</span>
          <div className="menu__tooltip">
            <HistoryIcon className="menu__icon" />
            <span className="menu__tooltip__content">history</span>
          </div>
        </div>
        <div
          className={selected === 3 ? "menu__nav__icons menu__nav--selected" : "menu__nav__icons"}
          onClick={() => {
            go("/app/statistics")
          }}
        >
          <div className="menu__tooltip">
            <PollOutlinedIcon className="menu__icon" />
            <span className="menu__tooltip__content">statistics</span>
          </div>
        </div>
      </div>
      <div className="menu__action">
        {useMenu ? (
          <div className="menu__action__icon">
            <LocalGroceryStoreOutlinedIcon
              className="menu__icon menu__icon--light"
              onClick={() => {
                toggleDrawer()
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

const MenuStore = () => {
  const lists = useSelector(listsCancelledOrCompleted)
  const dispatch = useDispatch()
  const toggleDrawer = useCallback(() => {
    return dispatch(toggleDrawerAction())
  }, [dispatch])

  return <Menu lists={lists} toggleDrawer={toggleDrawer} />
}

export default MenuStore
