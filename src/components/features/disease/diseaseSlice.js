const initialState = {
    diseaseId: null,
    tabIndex: 0,
    mode: ''
};

export default function diseaseReducer(state=initialState, action) {
    switch(action.type) {
        case ("disease/store-edit-disease-id"):
            return  {
                ...state,
                diseaseId: action.payload.diseaseId,
                tabIndex: action.payload.tabIndex,
                mode: 'edit'
            }

        case ("disease/store-add-disease-id"):
            return  {
                ...state,
                diseaseId: null,
                tabIndex: 0,
                mode: 'add'
            }
        default:
            return state;
    }
};