const initialState = {
    open: false,
    type: 'info',
    message: ''
};

export default function alertReducer(state=initialState, action) {
    switch(action.type) {
        case ("alert/open"):
            return  {
                open: true,
                type: action.payload.type,
                message: action.payload.message
            }
        case ("alert/close"):
            return  {
                open: false,
                type: action.payload.type,
                message: action.payload.message
            }
        default:
            return state;
    }
}