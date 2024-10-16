const initialState = {
    purchaseBillId: null,
    tabIndex: 0,
    mode: null
};

export default function purchaseBillReducer(state=initialState, action) {
    switch(action.type) {
        case ("purchaseBill/store-edit-purchase-bill-id"):
            return  {
                ...state,
                purchaseBillId: action.payload.purchaseBillId,
                tabIndex: action.payload.tabIndex,
                mode: 'edit'
            }
        case ("purchaseBill/store-add-purchase-bill-id"):
            return  {
                ...state,
                purchaseBillId: null,
                tabIndex: 0,
                mode: 'add'
            }
        case ("purchaseBill/store-view-purchase-bill-id"):
            return  {
                ...state,
                purchaseBillId: action.payload.purchaseBillId,
                tabIndex: action.payload.tabIndex,
                mode: 'view'
            }
        default:
            return state;
    }
};