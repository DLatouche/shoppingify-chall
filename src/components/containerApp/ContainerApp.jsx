import React, { memo } from "react"
import { Route } from "react-router-dom"
import HistoryStore from "../app/history/History"
import StatisticsStore from "../app/statistics/Statistics"
import AsideStore from "../aside/Aside"
import ItemsStore from "../app/items/Items"
import MenuStore from "../menu/Menu"
import "./ContainerApp.scss"
import {
    CSSTransition
} from "react-transition-group";

const routes = [
    { path: '/', name: 'Items', Component: ItemsStore },
    { path: '/history', name: 'History', Component: HistoryStore },
    { path: '/statistics', name: 'Statistics', Component: StatisticsStore },
]

const ContainerApp = () => {
    return (
        <div className="containerApp">
            <MenuStore />
            <div className="body">
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
    return <ContainerApp />
}
export default memo(ContainerAppStore)
