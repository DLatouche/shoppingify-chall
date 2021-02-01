
import React from "react"
import './AsideAddItem.scss';

const AsideAddItem = ({className}) => {
    return (
        <div className={className + " asideAddItem"}>AsideAddItem</div>
    )
}


export const AsideAddItemStore = ({className}) => {
    return (
        <AsideAddItem className={className}/>
    )
}

export default AsideAddItemStore