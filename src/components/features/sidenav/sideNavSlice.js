const initialState = {
    navState: 'none',
};

export default function sideNavReducer(state=initialState, action) {
    switch(action.type) {
        case ("sidenav/drug-add-edit"):
            return {
                ...state,
                navState: "drug-add-edit"
            }  
        case ("sidenav/drug-list"):
            return {
                ...state,
                navState: "drug-list"
            } 
        case ("sidenav/active-ingredient-add-edit"):
            return {
                ...state,
                navState: "active-ingredient-add-edit"
            }
        case ("sidenav/active-ingredient-list"):
            return {
                ...state,
                navState: "active-ingredient-list"
            }
        case ("sidenav/drug-interaction-add-edit"):
            return {
                ...state,
                navState: "drug-interaction-add-edit"
            }
        case ("sidenav/drug-interaction-list"):
            return {
                ...state,
                navState: "drug-interaction-list"
            }
        case ("sidenav/disease-add-edit"):
            return {
                ...state,
                navState: "disease-add-edit"
            }       
        case ("sidenav/disease-list"):
            return {
                ...state,
                navState: "disease-list"
            }
        case ("sidenav/user-add-edit"):
            return {
                ...state,
                navState: "user-add-edit"
            }
        case ("sidenav/user-list"):
            return {
                ...state,
                navState: "user-list"
            }
        case ("sidenav/purchase-bill-view"):
            return {
                ...state,
                navState: "purchase-bill-view"
            }
        case ("sidenav/purchase-bill-add-edit"):
            return {
                ...state,
                navState: "purchase-bill-add-edit"
            }
        case ("sidenav/purchase-bill-list"):
            return {
                ...state,
                navState: "purchase-bill-list"
            }
        case ("sidenav/purchase-return-bill-add-edit"):
            return {
                ...state,
                navState: "purchase-return-bill-add-edit"
            }
            case ("sidenav/purchase-return-bill-view"):
            return {
                ...state,
                navState: "purchase-return-bill-view"
            }
        case ("sidenav/purchase-return-bill-list"):
            return {
                ...state,
                navState: "purchase-return-bill-list"
            }

        case ("sidenav/inventory-list"):
            return {
                ...state,
                navState: "inventory-list"
            }
        case ("sidenav/price-list"):
            return {
                ...state,
                navState: "price-list"
            }
        case ("sidenav/debit-list"):
            return {
                ...state,
                navState: "debit-list"
            }
        default:
            return state;
    }
};