import { useHistory } from "react-router"

const Menu = () => {
    const history = useHistory()
    return (
        <div>Menu
            <button onClick={() => {
                history.push("/")
            }}>Items</button>
            <button onClick={() => {
                history.push("/history")
            }}>History</button>
            <button onClick={() => {
                history.push("/statistics")
            }}>Statistics</button>
        </div>
    )
}

const MenuStore = () => {
    return <Menu />
}

export default MenuStore
