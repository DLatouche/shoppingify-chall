import { createSelector } from 'reselect'


export const itemsSelector = ({ items }) => items

export const itemsSortedSelector = createSelector(
    itemsSelector,
    items => [...items.sort((a, b) => {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
    })]
)

export const itemsSortedByCategorySelector = createSelector(
    itemsSelector,
    items => [...items.sort(compareCategory)]
)

const compareCategory = (a, b) => {
    if (a.category.name < b.category.name) {
        return -1;
    }
    if (a.category.name > b.category.name) {
        return 1;
    }
    return 0;
}
