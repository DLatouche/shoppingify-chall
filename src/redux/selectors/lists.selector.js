import { createSelector } from 'reselect'

export const listsSelector = ({ lists }) => lists

export const currentListSelector = createSelector(
    listsSelector,
    lists => {
        return [lists.filter(list => list.state === "editing")[0]]
    }
)
