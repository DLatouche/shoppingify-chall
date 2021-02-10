import React, { memo, useCallback, useState } from "react"
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom"
import HistoryStore from "../app/history/History"
import StatisticsStore from "../app/statistics/Statistics"
import AsideStore from "../aside/Aside"
import ItemsStore from "../app/items/Items"
import MenuStore from "../menu/Menu"
import "./ContainerApp.scss"
import {
    TransitionGroup,
    CSSTransition
} from "react-transition-group";


const ContainerApp = () => {
    let location = useLocation();
    return (
        <div className="containerApp">
            <MenuStore />
            <div className="body">
                <TransitionGroup>
                    <CSSTransition
                        key={location.key}
                        classNames="fade"
                        timeout={300}
                    >
                        <Switch location={location}>
                            <Route path="/" exact>
                                <ItemsStore />
                            </Route>
                            <Route path="/history" exact>
                                <HistoryStore />
                            </Route>
                            <Route path="/statistics" exact>
                                <StatisticsStore />
                            </Route>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </div>
            <AsideStore />
        </div>
    )
}

export const ContainerAppStore = ({ showToast }) => {
    return <ContainerApp />
}
export default memo(ContainerAppStore)
