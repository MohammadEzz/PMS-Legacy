const initialState = {
    open: false
};

export default function loadingReducer(state=initialState, action) {
    switch(action.type) {
        case ("loading/open"):
            return  {
                open: true
            }
        case ("loading/close"):
            return  {
                open: false
            }
        default:
            return state;
    }
}