import Constants from '../constants';
const initialState = {
    roleList: null,
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case Constants.FETCH_ROLE_LIST:
            state.roleList = payload;
            return { ...state };
        default:
            return state;
    }
};

export default reducer;