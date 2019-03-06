import types from './actionTypes'

const init = (data) => ({
    type: types.INIT,
    data
});
const project_init = (data) => ({
    type: types.PROJECT_INIT,
    data
});

const update = ({data, index}) => ({
    type: types.UPDATE,
    data,
    index
});

const remove = ({from, to}) => ({
    type: types.REMOVE,
    from,
    to
});


export default {
    update,
    init,
    remove,
    project_init
}