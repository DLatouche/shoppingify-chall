
import React from "react"
import './InputSearch.scss';
import SearchIcon from '@material-ui/icons/Search';

const InputSearch = ({list, onSearch}) => {
    console.log("InputSearch.jsx -> 6: onSearch", onSearch  )
    const onChange = (e) => {
        let value = e.target.value
        console.log("InputSearch.jsx -> 9: onSearch", onSearch  )
        onSearch(list)
    }

    return (
        <div className="InputSearch">
            <SearchIcon />
            <input type="text" onChange={onChange} placeholder="search item" />
        </div>
    )
}

export default InputSearch