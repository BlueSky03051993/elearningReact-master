import Constants from '../constants'
const initialState = {
    openNavbar: true,
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case Constants.OPEN_NAVBAR:
            state.openNavbar = payload;
            return { ...state };
        default:
            return state;
    }
};

export default reducer;