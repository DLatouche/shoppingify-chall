import { useMediaQuery } from 'react-responsive'
import React from "react"
import { useSelector } from "react-redux";
import { asideSelector } from "../../redux/selectors/aside.selector";
import { drawerSelector } from "../../redux/selectors/drawer.selector";
import './Aside.scss';
import AsideAddItemStore from "./asideAddItem/AsideAddItem";
import AsideDetailsStore from "./asideDetails/AsideDetails";
import AsideListStore from "./asideList/AsideList";

const Aside = ({ aside, isOpened }) => {
    const drawer = useMediaQuery({ query: '(max-width: 999px)' })
    let className = "aside"
    if(drawer){
        className = isOpened ? "aside aside--shown" : "aside aside--hidden"
    }
    return (
        <div className={className}>
            <div className="aside__container">
                <div className={aside !== "LIST" ? "aside__menu aside__menu--hidden" : "aside__menu aside__menu--shown"}>
                    <AsideListStore />
                </div>
                <div className={aside !== "ADD_ITEM" ? "aside__menu aside__menu--hidden" : "aside__menu aside__menu--shown"}>
                    <AsideAddItemStore />
                </div>
                <div className={aside !== "DETAILS" ? "aside__menu aside__menu--hidden" : "aside__menu aside__menu--shown"}>
                    <AsideDetailsStore />
                </div>
            </div>
        </div>
    )
}


export const AsideStore = () => {
    const aside = useSelector(asideSelector)
    const drawer = useSelector(drawerSelector)

    return (
        <Aside aside={aside} isOpened={drawer} />
    )
}

export default AsideStore