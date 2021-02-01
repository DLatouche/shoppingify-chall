
import React from "react"
import './AsideList.scss';
import Button from "../../general/button/Button"
import bottle from './source.svg'
const AsideList = ({ className }) => {
    return (
        <div className={className + " asideList"}>
            <div className="asideList__header">
                <img className="asideList__img" src={bottle} alt="Bottle" />
                <div className="asideList__header__container" >
                    <p className="asideList__header__intro">Didn’t find what you need?</p>
                    <Button className="asideList__header__button" variant="white" onClick={() => { }}>Add item</Button>
                </div>
            </div>
        </div>
    )
}


export const AsideListStore = ({ className }) => {
    return (
        <AsideList className={className} />
    )
}

export default AsideListStore