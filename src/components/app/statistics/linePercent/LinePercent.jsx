import "./LinePercent.scss"

const LinePercent = ({ name, percent, variant }) => {
    return (
        <div className="linePercent">
            <div className="linePercent__top">
                <p className="linePercent__top__name">{name}</p>
                <p className="linePercent__top__percent">{percent}%</p>
            </div>
            <div className={"linePercent__bottom linePercent__bottom--"+variant + " linePercent__bottom--"+percent+"percent"}>
            </div>
        </div>
    )
}

export default LinePercent
