import './Menu.scss'
import { useHistory } from "react-router"
import HistoryIcon from '@material-ui/icons/History';
import ListIcon from '@material-ui/icons/List';
import PollOutlinedIcon from '@material-ui/icons/PollOutlined';
import LocalGroceryStoreOutlinedIcon from '@material-ui/icons/LocalGroceryStoreOutlined';
import logo from './logo.svg'
import createPalette from '@material-ui/core/styles/createPalette';
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
        <div className="Menu">
            <div className="logo">
                <img src={logo} alt="logo"
                    onClick={() => {
                        go("/")
                    }} />
            </div>
            <div className="nav">
                <div className={selected === 1 ? "icon selected" : "icon"}
                    onClick={() => {
                        go("/")
                    }}>
                    <div className="tooltip">
                        <ListIcon />
                        <span className="tooltipContent">items</span>
                    </div>
                </div>
                <div className={selected === 2 ? "icon selected" : "icon"}
                    onClick={() => {
                        go("/history")
                    }}
                >
                    <div className="tooltip">
                        <HistoryIcon />
                        <span className="tooltipContent">history</span>
                    </div>
                </div>
                <div className={selected === 3 ? "icon selected" : "icon"}
                    onClick={() => {
                        go("/statistics")
                    }}
                >
                    <div className="tooltip">
                        <PollOutlinedIcon />
                        <span className="tooltipContent">statistics</span>
                    </div>
                </div>
            </div>
            <div className="actionBottom">
                <div className="icon">
                    <span className={number === 0 ? "notifHidden" : "notif"}>{number}</span>
                    <LocalGroceryStoreOutlinedIcon
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
