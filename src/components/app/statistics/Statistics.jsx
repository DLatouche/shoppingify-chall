import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { listByMonthSelector, listsSelector } from "../../../redux/selectors/lists.selector"
import LinePercent from "./linePercent/LinePercent"
import "./Statistics.scss"


const Statistics = ({ topCategories, topItems }) => {
    const [topCat, setTopCat] = useState(topCategories)
    useEffect(() => {
        setTopCat(topCategories)
    }, [topCategories])
    const [topIte, setTopIte] = useState(topItems)
    useEffect(() => {
        setTopIte(topItems)
    }, [topItems])
    const nbTop = 3
    
    return (
        <div className="statistics">
            <div className="statistics__container statistics__top statistics__top--items">
                <p className="statistics__title">Top items</p>
                <div className="statistics__top__container">
                    {
                        topIte.slice(0, nbTop).map(item =>
                            <LinePercent key={item.data.id} name={item.data.name} variant="orange" percent={parseInt(item.quantity * 100 / item.total)} />
                        )
                    }
                </div>
            </div>
            <div className="statistics__container statistics__top statistics__top--categories">
                <p className="statistics__title">Top Categories</p>
                <div className="statistics__top__container">
                    {
                        topCat.slice(0, nbTop).map(category =>
                            <LinePercent key={category.data.id} name={category.data.name} variant="blue" percent={parseInt(category.quantity * 100 / category.total)} />
                        )
                    }
                </div>
            </div>
            <div className="statistics__container statistics__summary">
                <p className="statistics__title">Monthly Summary</p>

            </div>
        </div>
    )
}

const StatisticsStore = () => {
    const lists = useSelector(listsSelector)
    const listByMonth = useSelector(listByMonthSelector)
    //calcul top item and categories
    let items = {}
    let categories = {}
    let totalItems = 0
    let totalCategories = 0
    let topItems = []
    let topCategories = []
    lists.forEach(list => {
        list.categories.forEach(category => {
            if (categories[category.id]) {
                categories[category.id].quantity += 1
            } else {
                categories[category.id] = { category: category, quantity: 1 }
            }
            totalCategories += 1
            category.items.forEach(item => {
                if (items[item.id]) {
                    items[item.id].quantity += item.quantity
                } else {
                    items[item.id] = { item: item, quantity: item.quantity }
                }
                totalItems += item.quantity
            })
        })
    });
    Object.keys(items).forEach(key => {
        topItems.push({
            quantity: items[key].quantity,
            data: items[key].item,
            total: totalItems,
            average: items[key].quantity / totalItems,
        })
    })
    Object.keys(categories).forEach(key => {
        topCategories.push({
            quantity: categories[key].quantity,
            data: categories[key].category,
            total: totalCategories,
            average: categories[key].quantity / totalCategories,
        })
    })
    topItems.sort((a, b) => b.quantity - a.quantity)
    topCategories.sort((a, b) => b.quantity - a.quantity)
    return <Statistics topItems={topItems} topCategories={topCategories} />
}

export default StatisticsStore
