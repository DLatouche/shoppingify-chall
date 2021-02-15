import React, { memo, useCallback } from "react"
import { Route } from "react-router-dom"
import { useMediaQuery } from 'react-responsive'
import HistoryStore from "../app/history/History"
import StatisticsStore from "../app/statistics/Statistics"
import AsideStore from "../aside/Aside"
import ItemsStore from "../app/items/Items"
import MenuStore from "../menu/Menu"
import "./ContainerApp.scss"
import {
    CSSTransition
} from "react-transition-group";
import { drawerSelector } from "../../redux/selectors/drawer.selector"
import { useDispatch, useSelector } from "react-redux"
import { toggleDrawerAction } from "../../redux/actions/drawer.action"

const routes = [
    { path: '/', name: 'Items', Component: ItemsStore },
    { path: '/history', name: 'History', Component: HistoryStore },
    { path: '/statistics', name: 'Statistics', Component: StatisticsStore },
]


const ContainerApp = ({ toggleDrawer, isOpened }) => {
    const useMenu = useMediaQuery({ query: '(max-width: 999px)' })

    const closeDrawer = () => {
        if (useMenu && isOpened) toggleDrawer()

    }
    return (
        <div className="containerApp">
            <MenuStore />
            <div className="body" onClick={closeDrawer}>
                {routes.map(({ path, Component }) => (
                    <Route key={path} exact path={path}>
                        {({ match }) => (
                            <CSSTransition
                                in={match != null}
                                timeout={300}
                                classNames="fade"
                                unmountOnExit
                            >
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

export const ContainerAppStore = () => {
    const drawer = useSelector(drawerSelector)
    const dispatch = useDispatch()

    const toggleDrawer = useCallback(
        () => {
            return dispatch(toggleDrawerAction())
        },
        [dispatch]
    )
    return <ContainerApp toggleDrawer={toggleDrawer} isOpened={drawer} />
}
export default memo(ContainerAppStore)
