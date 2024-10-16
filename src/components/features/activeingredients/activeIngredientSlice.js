const initialState = {
    activeIngredientId: null,
    tabIndex: 0,
    mode: ''
};

export default function activeIngredientReducer(state=initialState, action) {
    switch(action.type) {
        case ("activeIngredient/store-edit-active-ingredient-id"):
            return  {
                ...state,
                activeIngredientId: action.payload.activeIngredientId,
                tabIndex: action.payload.tabIndex,
                mode: 'edit'
            }

        case ("activeIngredient/store-add-active-ingredient-id"):
            return  {
                ...state,
                activeIngredientId: null,
                tabIndex: 0,
                mode: 'add'
            }
        
        default:
            return state;
    }
};