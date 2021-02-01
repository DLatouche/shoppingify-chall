
import React from "react"
import './AsideDetails.scss';

const AsideDetails = ({className}) => {
    return (
        <div className={className+ " asideDetails"}>AsideDetails
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat itaque suscipit necessitatibus cumque, earum vitae dignissimos explicabo, temporibus excepturi deserunt voluptates dolor porro sunt quisquam iste veniam esse, iure beatae.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat itaque suscipit necessitatibus cumque, earum vitae dignissimos explicabo, temporibus excepturi deserunt voluptates dolor porro sunt quisquam iste veniam esse, iure beatae.</p>
        </div>
    )
}


export const AsideDetailsStore = ({className}) => {
    return (
        <AsideDetails className={className}/>
    )
}

export default AsideDetailsStore