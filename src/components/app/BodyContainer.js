import DrugListContainer from "../features/drugs/DrugListContainer";
import DrugFormContainer from "../features/drugs/DrugFormContainer";
import { useSelector } from "react-redux";
import DiseaseFormContainer from "../features/disease/DiseaseFormContainer";
import DiseaseListContainer from "../features/disease/DiseaseListContainer";
import ActiveIngredientFormContainer from "../features/activeingredients/ActiveIngredientFormContainer";
import ActiveIngredientListContainer from "../features/activeingredients/ActiveIngredientListContainer";
import DrugInteractionFormContainer from "../features/interactions/DrugInteractionFormContainer";
import DrugIntractionListContainer from "../features/interactions/DrugInteractionListContainer";
import UserFormContainer from "../features/users/UserFormContainer";
import UserListContainer from "../features/users/UserListContainer";
import PurchaseBillFormContainer from "../features/purchasebills/PurchaseBillFormContainer";
import PurchaseBillListContainer from "../features/purchasebills/PurchaseBillListContainer";
import PurchaseBillViewContainer from "../features/purchasebills/PurchaseBillViewContainer";
import PurchaseReturnBillFormContainer from "../features/purchasereturnbills/PurchaseReturnBillFormContainer";
import PurchaseReturnBillListContainer from "../features/purchasereturnbills/PurchaseReturnBillListContainer";
import PurchaseReturnBillViewContainer from "../features/purchasereturnbills/PurchaseReturnBillViewContainer";
import InventoryListContainer from "../features/inventory/InventoryListContainer";
import PriceListContainer from "../features/prices/PriceListContainer";
import DebitListContainer from "../features/debits/DebitListContainer";

export default function BodyContainer() {  

    const selectSideNavState = state => state.sidenav.navState;
    const sideNavState = useSelector(selectSideNavState);
    
    return (
        <>
            {sideNavState === "drug-add-edit" && <DrugFormContainer />}
            {sideNavState === "drug-list" && <DrugListContainer />}
            {sideNavState === "drug-archive" && <h1>Coming soon</h1>}
            {sideNavState === "active-ingredient-add-edit" && <ActiveIngredientFormContainer />}
            {sideNavState === "active-ingredient-list" && <ActiveIngredientListContainer />}
            {sideNavState === "disease-add-edit" && <DiseaseFormContainer />}
            {sideNavState === "disease-list" && <DiseaseListContainer />}
            {sideNavState === "drug-interaction-add-edit" && <DrugInteractionFormContainer />}
            {sideNavState === "drug-interaction-list" && <DrugIntractionListContainer />}
            {sideNavState === "user-add-edit" && <UserFormContainer />}
            {sideNavState === "user-list" && <UserListContainer />}
            {sideNavState === "purchase-bill-view" && <PurchaseBillViewContainer />}
            {sideNavState === "purchase-bill-add-edit" && <PurchaseBillFormContainer />}
            {sideNavState === "purchase-bill-list" && <PurchaseBillListContainer />}
            {sideNavState === "purchase-return-bill-add-edit" && <PurchaseReturnBillFormContainer />}
            {sideNavState === "purchase-return-bill-view" && <PurchaseReturnBillViewContainer />}
            {sideNavState === "purchase-return-bill-list" && <PurchaseReturnBillListContainer />}
            {sideNavState === "inventory-list" && <InventoryListContainer />}
            {sideNavState === "price-list" && <PriceListContainer />}
            {sideNavState === "debit-list" && <DebitListContainer />}
        </>
    );
}