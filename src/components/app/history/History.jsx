import { useSelector } from "react-redux"
import { listByMonthSelector } from "../../../redux/selectors/lists.selector"
import './History.scss'
import ListStore from "./List"
const History = ({ listByMonth }) => {
    console.log("History.jsx -> 6: listByMonth", listByMonth)
    return (
        <div className="history">
            <p className="history__title">
                Shopping history
            </p>
            {listByMonth.map(month => {
                let date = month.date.toLocaleDateString("en-US", { year: 'numeric', month: 'long' })
                return (
                    <div key={date} className="history__month__container">
                        <p className="history__month__container__date">{date}</p>
                        {month.lists.map(list => (
                            <ListStore className="history__month__container__list" key={list.id} list={list} />
                        ))}
                    </div>
                )
            })}
        </div>
    )
}

const HistoryStore = () => {
    const listByMonth = useSelector(listByMonthSelector)
    return (
        <History listByMonth={listByMonth} />
    )
}

export default HistoryStore
