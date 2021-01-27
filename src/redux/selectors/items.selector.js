import {createSelector} from 'reselect'


export const itemsSelector = ({ items }) => items

export const itemsSortedSelector = createSelector(
    itemsSelector, 
    items => [...items.sort((a, b) => a.name.toUpperCase() - b.name.toUpperCase())]
)