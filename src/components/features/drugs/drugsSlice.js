const initialState = {
    drugId: null,
    tabIndex: 0,
    mode: ''
};

export default function drugReducer(state=initialState, action) {
    switch(action.type) {
        case ("drug/store-edit-drug-id"):
            return  {
                ...state,
                drugId: action.payload.drugId,
                tabIndex: action.payload.tabIndex,
                mode: 'edit'
            }
        case ("drug/store-add-drug-id"):
            return  {
                ...state,
                drugId: null,
                tabIndex: 0,
                mode: 'add'
            }
        default:
            return state;
    }
}