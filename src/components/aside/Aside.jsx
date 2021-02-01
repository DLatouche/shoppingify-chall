
import React from "react"
import { useSelector } from "react-redux";
import { asideSelector } from "../../redux/selectors/aside.selector";
import './Aside.scss';
import AsideAddItemStore from "./asideAddItem/AsideAddItem";
import AsideDetailsStore from "./asideDetails/AsideDetails";
import AsideListStore from "./asideList/AsideList";

const Aside = ({aside}) => {
    return (
        <div className="aside">

            <AsideListStore className={aside !== "LIST"?"aside__container":"aside__container aside__container--shown"} />
            <AsideAddItemStore className={aside !== "ADD_ITEM"?"aside__container":"aside__container aside__container--shown"} />
            <AsideDetailsStore className={aside !== "DETAILS"?"aside__container":"aside__container aside__container--shown"} />
        </div>
    )
}


export const AsideStore = () => {
    const aside = useSelector(asideSelector)

    return (
        <Aside aside={aside} />
    )
}

export default AsideStore