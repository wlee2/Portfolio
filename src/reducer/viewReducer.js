import types from '../actions/actionTypes'

const initialState = {
    lists: [],
    projectLists: []
}

const viewReducer = (state = initialState, action) => {
    const { lists,projectLists } = state

    switch(action.type) {
        case types.INIT:
            return {
                lists: action.data,
                projectLists: [...projectLists]
            };
        case types.PROJECT_INIT:
            return {
                lists: [...lists],
                projectLists: action.data
            };
        case types.UPDATE:
            return {
                lists: [
                    ...lists.slice(0, action.index),
                    ...action.data.slice(0, action.data.length),
                    ...lists.slice(action.index, lists.length)
                ],
                projectLists: [...projectLists]
            };
        case types.REMOVE:
            return {
                lists: [
                    ...lists.slice(0, action.from),
                    ...lists.slice(action.to, lists.length)
                ],
                projectLists: [...projectLists]
            };
        default:
            return state;
    }
}

export default viewReducer