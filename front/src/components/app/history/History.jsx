import { useState } from "react"
import { useSelector } from "react-redux"
import { listByMonthSelector } from "../../../redux/selectors/lists.selector"
import DetailsList from "./detailsList/DetailsList"
import "./History.scss"
import ListStore from "./List"
const History = ({ listByMonth }) => {
  const [listDetails, setListDetails] = useState({})

  const setList = (list) => {
    setListDetails(list)
  }

  const onClickBack = () => setListDetails({})
  if (listDetails.id) {
    return <DetailsList list={listDetails} onClickBack={onClickBack} />
  } else {
    return (
      <div className="history">
        <p className="history__title">Shopping history</p>
        {listByMonth.map((month) => {
          let date = month.date.toLocaleDateString("en-US", { year: "numeric", month: "long" })
          return (
            <div key={date} className="history__month__container">
              <p className="history__month__container__date">{date}</p>
              {month.lists.map((list) => (
                <ListStore className="history__month__container__list" key={list.id} list={list} onClick={setList} />
              ))}
            </div>
          )
        })}
      </div>
    )
  }
}

const HistoryStore = () => {
  const listByMonth = useSelector(listByMonthSelector)
  return <History listByMonth={listByMonth.reverse()} />
}

export default HistoryStore
