const initialState = {
    userId: null,
    tabIndex: 0,
    mode: ''
};

export default function userReducer(state=initialState, action) {
    switch(action.type) {
        case ("user/store-edit-user-id"):
            return  {
                userId: action.payload.userId,
                tabIndex: action.payload.tabIndex,
                mode: 'edit'
            }
        case ("user/store-add-user-id"):
            return  {
                userId: null,
                tabIndex: 0,
                mode: 'add'
            }
        default:
            return state;
    }
}