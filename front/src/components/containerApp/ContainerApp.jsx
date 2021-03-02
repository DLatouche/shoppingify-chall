import React, { memo, useCallback, useEffect } from "react"
import { Route, useHistory } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import HistoryStore from "../app/history/History"
import StatisticsStore from "../app/statistics/Statistics"
import AsideStore from "../aside/Aside"
import ItemsStore from "../app/items/Items"
import MenuStore from "../menu/Menu"
import "./ContainerApp.scss"
import { CSSTransition } from "react-transition-group"
import { drawerSelector } from "../../redux/selectors/drawer.selector"
import { useDispatch, useSelector } from "react-redux"
import { toggleDrawerAction } from "../../redux/actions/drawer.action"
import API from "../../utilities/API"
import { setCategoriesAction } from "../../redux/actions/category.action"
import { setListsAction } from "../../redux/actions/list.action"
import { setItemsAction } from "../../redux/actions/item.action"
import { colors } from "@material-ui/core"

const routes = [
  { path: "/app/", name: "Items", Component: ItemsStore, exact: true },
  { path: "/app/history", name: "History", Component: HistoryStore, exact: true },
  { path: "/app/statistics", name: "Statistics", Component: StatisticsStore, exact: true },
]

const ContainerApp = ({ toggleDrawer, isOpened, setCategories, setItems, setLists, showToast }) => {
  const useMenu = useMediaQuery({ query: "(max-width: 999px)" })
  const history = useHistory()

  const closeDrawer = () => {
    if (useMenu && isOpened) toggleDrawer()
  }

  const fetch = async () => {
    try {
      let promises = []
      promises.push(API.authRequest({ url: "categories", type: "GET" }))
      promises.push(API.authRequest({ url: "items", type: "GET" }))
      promises.push(API.authRequest({ url: "lists", type: "GET" }))
      let results = await Promise.all(promises)
      let categories = results[0].data.categories
      let items = results[1].data.items
      let lists = results[2].data.lists
      setCategories({ categories })
      setItems({ items })
      setLists({ lists })
    } catch (e) {
      showToast({
        text: `Impossible to load data`,
        severity: "error",
      })
      console.log("%cApp.jsx -> 11 ERROR: e", "background: #FF0000; color:#FFFFFF", e)
    }
  }

  useEffect(() => {
    let token = API.getToken()
    if (token) {
      fetch()
    } else {
      history.push("/")
      console.log("App.jsx -> 25: noKey")
    }
  }, [])
  return (
    <div className="containerApp">
      <MenuStore />
      <div className="body" onClick={closeDrawer}>
        {routes.map(({ path, Component, exact }) => (
          <Route key={path} path={path} exact={exact}>
            {({ match }) => (
              <CSSTransition in={match != null} timeout={300} classNames="fade" unmountOnExit>
                <Component />
              </CSSTransition>
            )}
          </Route>
        ))}
      </div>
      <AsideStore />
    </div>
  )
}

export const ContainerAppStore = ({ showToast }) => {
  const drawer = useSelector(drawerSelector)
  const dispatch = useDispatch()

  const toggleDrawer = useCallback(() => {
    return dispatch(toggleDrawerAction())
  }, [dispatch])
  const setCategories = useCallback(
    ({ categories }) => {
      return dispatch(setCategoriesAction({ categories }))
    },
    [dispatch]
  )
  const setLists = useCallback(
    ({ lists }) => {
      return dispatch(setListsAction({ lists }))
    },
    [dispatch]
  )
  const setItems = useCallback(
    ({ items }) => {
      return dispatch(setItemsAction({ items }))
    },
    [dispatch]
  )
  return (
    <ContainerApp
      toggleDrawer={toggleDrawer}
      isOpened={drawer}
      setItems={setItems}
      setCategories={setCategories}
      setLists={setLists}
      showToast={showToast}
    />
  )
}
export default memo(ContainerAppStore)
