const initialState = {
    purchaseReturnBillId: null,
    purchaseBillId: null,
    tabIndex: 0,
    mode: null
};

export default function purchaseReturnBillReducer(state=initialState, action) {
    switch(action.type) {
        case ("purchaseReturnBill/store-add-purchase-return-bill-id"):
            return  {
                ...state,
                purchaseReturnBillId: action.payload.purchaseReturnBillId,
                purchaseBillId: action.payload.purchaseBillId,
                tabIndex: 0,
                mode: 'add'
            }
        case ("purchaseReturnBill/store-view-purchase-return-bill-id"):
            return  {
                ...state,
                purchaseReturnBillId: action.payload.purchaseReturnBillId,
                purchaseBillId: action.payload.purchaseBillId,
                tabIndex: 0,
                mode: 'view'
            }
        case ("purchaseReturnBill/store-edit-purchase-return-bill-id"):
            return  {
                ...state,
                purchaseReturnBillId: action.payload.purchaseReturnBillId,
                purchaseBillId: action.payload.purchaseBillId,
                tabIndex: 0,
                mode: 'edit'
            }
        default:
            return state;
    }
};