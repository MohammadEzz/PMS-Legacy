const initialState = {
    drugInteractionId: null,
    tabIndex: 0,
    mode: ''
};

export default function drugInteractionReducer(state=initialState, action) {
    switch(action.type) {
        case ("drugInteraction/store-edit-drug-interaction-id"):
            return  {
                ...state,
                drugInteractionId: action.payload.drugInteractionId,
                tabIndex: action.payload.tabIndex,
                mode: 'edit'
            }
        case ("drugInteraction/store-add-drug-interaction-id"):
            return  {
                ...state,
                drugInteractionId: null,
                tabIndex: 0,
                mode: 'add'
            }
        default:
            return state;
    }
};