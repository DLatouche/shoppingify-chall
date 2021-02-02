import './Menu.scss'
import { useHistory } from "react-router"
import HistoryIcon from '@material-ui/icons/History';
import ListIcon from '@material-ui/icons/List';
import PollOutlinedIcon from '@material-ui/icons/PollOutlined';
import LocalGroceryStoreOutlinedIcon from '@material-ui/icons/LocalGroceryStoreOutlined';
import logo from './logo.svg'
import { useState } from 'react';
const Menu = () => {
    const [selected, setSelected] = useState(1)
    const history = useHistory()
    let number = 3

    const go = (path) => {
        if (path === "/") setSelected(1)
        else if (path === "/history") setSelected(2)
        else setSelected(3)
        history.push(path)

    }
    return (
        <div className="menu">
            <div className="menu__logo">
                <img src={logo} alt="logo"
                    onClick={() => {
                        go("/")
                    }} />
            </div>
            <div className="menu__nav">
                <div className={selected === 1 ? "menu__nav__icons menu__nav--selected" : "menu__nav__icons"}
                    onClick={() => {
                        go("/")
                    }}>
                    <div className="menu__tooltip">
                        <ListIcon className="menu__icon" />
                        <span className="menu__tooltip__content">items</span>
                    </div>
                </div>
                <div className={selected === 2 ? "menu__nav__icons menu__nav--selected" : "menu__nav__icons"}
                    onClick={() => {
                        go("/history")
                    }}
                >
                    <div className="menu__tooltip">
                        <HistoryIcon className="menu__icon" />
                        <span className="menu__tooltip__content">history</span>
                    </div>
                </div>
                <div className={selected === 3 ? "menu__nav__icons menu__nav--selected" : "menu__nav__icons"}
                    onClick={() => {
                        go("/statistics")
                    }}
                >
                    <div className="menu__tooltip">
                        <PollOutlinedIcon className="menu__icon" />
                        <span className="menu__tooltip__content">statistics</span>
                    </div>
                </div>
            </div>
            <div className="menu__action">
                <div className="menu__action__icon">
                    <span className={number === 0 ? "menu__action__notif--hidden" : "menu__action__notif"}>{number}</span>
                    <LocalGroceryStoreOutlinedIcon className="menu__icon menu__icon--light"
                        onClick={() => {

                        }}
                    />
                </div>

            </div >
        </div >
    )
}

const MenuStore = () => {
    return <Menu />
}

export default MenuStore
