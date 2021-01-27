import React, { memo, useCallback, useState } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import HistoryStore from "../app/history/History"
import StatisticsStore from "../app/statistics/Statistics"
import AsideStore from "../aside/Aside"
import ItemsStore from "../items/Items"
import MenuStore from "../menu/Menu"
import "./ContainerApp.scss"


const ContainerApp = () => {

    return (
        <div className="containerApp">
            <MenuStore />
            <div className="body">
                <Route path="/" exact>
                    <ItemsStore />
                </Route>
                <Route path="/history" exact>
                    <HistoryStore />
                </Route>
                <Route path="/statistics" exact>
                    <StatisticsStore />
                </Route>
            </div>
            <AsideStore/>
        </div>
    )
}

export const ContainerAppStore = ({ showToast }) => {
    return <ContainerApp />
}
export default memo(ContainerAppStore)
