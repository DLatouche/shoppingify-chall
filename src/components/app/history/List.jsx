import './List.scss'
import EventNoteIcon from '@material-ui/icons/EventNote';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
const List = ({ list, className, onClick }) => {
    let date = list.date.toLocaleDateString("en-US", { weekday: 'short' })
    let strDate = date + " " + list.date.getDate() + "." + (list.date.getMonth() + 1) + "." + list.date.getFullYear()
    return (
        <div className={"list " + className}>
            <p className="list__name">
                {list.name}
            </p>
            <div className="list__date__container">
                <EventNoteIcon className="list__date__container__icon" />
                <p className="list__date__container__date">{strDate}</p>
            </div>
            <p className={"list__date__state list__date__state--" + list.state.toLowerCase()}>{list.state.toLowerCase()}</p>
            <ChevronRightIcon className="list__icon" onClick={() => { onClick(list) }} />

        </div>
    )
}

const ListStore = ({ list, className, onClick }) => {
    return (
        <List list={list} className={className} onClick={onClick}/>
    )
}


export default ListStore