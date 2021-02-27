import Constants from '../constants'
const initialState = {
    token: null,
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case Constants.SET_TOKEN:
            state.token = payload;
            return { ...state };
        default:
            return state;
    }
};

export default reducer;