
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import EventNoteIcon from '@material-ui/icons/EventNote';
import './DetailsList.scss'
const DetailsList = ({ list, onClickBack }) => {
    let date = list.date.toLocaleDateString("en-US", { weekday: 'short' })
    let strDate = date + " " + list.date.getDate() + "." + (list.date.getMonth() + 1) + "." + list.date.getFullYear()
    return (
        <div className="detailsList">
            <div className="detailsList__back" onClick={onClickBack}>
                <KeyboardBackspaceIcon className="detailsList__back__icon" />
                <p className="detailsList__back__text">back</p>
            </div>

            <p className="detailsList__name">{list.name}</p>
            <div className="detailsList__date__container">
                <EventNoteIcon className="detailsList__date__container__icon" />
                <p className="detailsList__date__container__date">{strDate}</p>
            </div>

            <div className="detailsList__categories">
                {list.categories.map(category => (
                    <div className="detailsList__category">
                        <p className="detailsList__category__name">{category.name}</p>
                        <div className="detailsList__category__items">
                            {category.items.map(item => (
                                <div key={item.id} className="detailsList__category__item">
                                    <p className="detailsList__category__item__name">{item.name}</p>
                                    <p className="detailsList__category__item__quantity">{item.quantity}<em className="detailsList__category__item__pcs">pcs</em></p>
                                </div>
                            ))}
                        </div>
                    </div>
                )
                )}
            </div>
        </div>
    )
}

export default DetailsList
