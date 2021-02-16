import {createSelector} from 'reselect'

export const categoriesSelector = ({ categories }) => categories
export const categoriesSortedSelector = createSelector(
    categoriesSelector, 
    categories => [...categories.sort((a, b) => a.name.toUpperCase() - b.name.toUpperCase())]
)