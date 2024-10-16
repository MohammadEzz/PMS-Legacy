import { combineReducers } from 'redux';
import activeIngreientReducer from './components/features/activeingredients/activeIngredientSlice';
import diseaseReducer from './components/features/disease/diseaseSlice';
import drugReducer from "./components/features/drugs/drugsSlice";
import drugInteractionReducer from './components/features/interactions/interactionSlice';
import userReduder from './components/features/users/userSlice';
import sideNavReducer from './components/features/sidenav/sideNavSlice';
import purchaseBillReducer from './components/features/purchasebills/purchaseBillSlice';
import purchaseReturnBillReducer from './components/features/purchasereturnbills/purchaseReturnBillReducer';
import loadingReducer from './components/app/loadingSlice';
import alertReducer from './components/app/alertSlice';

const rootReducer = combineReducers({
    sidenav: sideNavReducer,
    drugs: drugReducer,
    activeingredients: activeIngreientReducer,
    drugInteractions: drugInteractionReducer,
    diseases: diseaseReducer,
    users: userReduder,
    purchaseBills: purchaseBillReducer,
    purchaseReturnBills: purchaseReturnBillReducer,
    loading: loadingReducer,
    alert: alertReducer,
});

export default rootReducer;