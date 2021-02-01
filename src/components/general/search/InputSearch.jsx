
import React from "react"
import './InputSearch.scss';
import SearchIcon from '@material-ui/icons/Search';

const InputSearch = ({list, onSearch}) => {
    const onChange = (e) => {
        let value = e.target.value
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