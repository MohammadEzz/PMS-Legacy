import { useDispatch } from 'react-redux';
import drugIcon from '../../../images/svg/drug.svg'
import ingredientIcon from '../../../images/svg/ingredient.svg'
import diseaseIcon from '../../../images/svg/disease.svg'
import interactionIcon from '../../../images/svg/interaction.svg'
import purchaseIcon from '../../../images/svg/purchase.svg'
import inventoryIcon from '../../../images/svg/inventory.svg'
import priceIcon from '../../../images/svg/price.svg'
import debitIcon from '../../../images/svg/debit.svg'
import userIcon from '../../../images/svg/user.svg'
import MainMenuContainer from './MainMenuContainer';
import MainMenuItem from './MainMenuItem';
import SubMenuItem from './SubMenuItem';
import SubMenuContainer from './SubMenuContainer';
import { useState } from 'react';

export default function Menu() {
    const dispatch = useDispatch();

    const[activeIndex, setActiveIndex] = useState('');
    const[mainMenuActive, setMainMenuActive] = useState('');
    
    function handleMainMenuItemClick(item) {
      setActiveIndex('');
      (item === mainMenuActive) 
      ? setMainMenuActive('')
      : setMainMenuActive(item);
    }
    return (
      <>
        <MainMenuContainer>
          <MainMenuItem 
          active={(mainMenuActive === 'drug')} 
          onClick={(e)=>{handleMainMenuItemClick('drug')}} 
          title="Drug" icon={drugIcon} />
          {
            (mainMenuActive === 'drug')
            &&
            <SubMenuContainer>
              <SubMenuItem 
              value="0"
              onClick={(e)=>{
                  setActiveIndex(e.target.getAttribute('value'));
                  dispatch({type: "sidenav/drug-add-edit"});
                  dispatch({type: "drug/store-add-drug-id"});
              }} 
              active={activeIndex === "0"}
              title="Add New" />

              <SubMenuItem 
              value="1"
              onClick={(e)=>{
                setActiveIndex(e.target.getAttribute('value'));
                dispatch({type: "sidenav/drug-list"});
              }}
              active={activeIndex === "1"}
              title="List All" />
            </SubMenuContainer>
          }
        </MainMenuContainer>

        <MainMenuContainer>
          <MainMenuItem 
          active={(mainMenuActive === 'ingredient')} 
          onClick={()=>handleMainMenuItemClick('ingredient')} title="Active Ingredient" icon={ingredientIcon} />
          {
            (mainMenuActive === 'ingredient')
            &&
            <SubMenuContainer>
                <SubMenuItem 
                value="0"
                onClick={(e)=>{
                setActiveIndex(e.target.getAttribute('value'));
                dispatch({type: "sidenav/active-ingredient-add-edit"});
                dispatch({type: "activeIngredient/store-add-active-ingredient-id"});
              }} 
                active={activeIndex === "0"}
                title="Add New" />

                <SubMenuItem 
                value="1"
                onClick={(e)=>{ 
                  setActiveIndex(e.target.getAttribute('value'));
                  dispatch({type: "sidenav/active-ingredient-list"})}
                }
                active={activeIndex === "1"}
                title="List All" />
            </SubMenuContainer>
          }
        </MainMenuContainer>

        <MainMenuContainer>
          <MainMenuItem 
          active={(mainMenuActive === 'disease')}
          onClick={()=>handleMainMenuItemClick('disease')} title="Disease" icon={diseaseIcon} />
          {
            (mainMenuActive === 'disease')
            &&
            <SubMenuContainer>
                <SubMenuItem 
                value="0"
                onClick={(e)=>{
                setActiveIndex(e.target.getAttribute('value'));
                dispatch({type: "sidenav/disease-add-edit"});
                dispatch({type: "disease/store-add-disease-id"});
                }}
                active={activeIndex === "0"}
                title="Add New" />

                <SubMenuItem 
                value="1"
                onClick={(e)=>{
                  setActiveIndex(e.target.getAttribute('value'));
                  dispatch({type: "sidenav/disease-list"});
                }}
                active={activeIndex === "1"}
                title="List All" />
            </SubMenuContainer>
            }
        </MainMenuContainer>

        <MainMenuContainer>
          <MainMenuItem 
          active={(mainMenuActive === 'interaction')} 
          onClick={()=>handleMainMenuItemClick('interaction')} title="Interaction" icon={interactionIcon} />
          {
            (mainMenuActive === 'interaction')
            &&
            <SubMenuContainer>
                <SubMenuItem 
                value="0"
                onClick={(e)=>{
                setActiveIndex(e.target.getAttribute('value'));
                dispatch({type: "sidenav/drug-interaction-add-edit"})
                dispatch({type: "drugInteraction/store-add-drug-interaction-id"});
                }}
                active={activeIndex === "0"}
                title="Add New" />

                <SubMenuItem 
                value="1"
                onClick={(e)=>{
                  setActiveIndex(e.target.getAttribute('value'));
                  dispatch({type: "sidenav/drug-interaction-list"});
                }}
                active={activeIndex === "1"}
                title="List All" />
            </SubMenuContainer>
          }
        </MainMenuContainer>

        <MainMenuContainer>
          <MainMenuItem 
          active={(mainMenuActive === 'purchase')} 
          onClick={()=>handleMainMenuItemClick('purchase')} 
          title="Purchases" 
          icon={purchaseIcon} />
          {
            (mainMenuActive === 'purchase')
            &&
            <SubMenuContainer>
                <SubMenuItem 
                value="0"
                onClick={(e)=>{
                setActiveIndex(e.target.getAttribute('value'));
                dispatch({type: "sidenav/purchase-bill-add-edit"})
                dispatch({type: "purchaseBill/store-add-purchase-bill-id", payload: {purchaseBillId: null, mode:'add', tabIndex:0}})
                }}
                active={activeIndex === "0"}
                title="Add New" />

                <SubMenuItem 
                value="1"
                onClick={(e)=>{
                  setActiveIndex(e.target.getAttribute('value'));
                  dispatch({type: "sidenav/purchase-bill-list"});
                }}
                active={activeIndex === "1"}
                title="List All" />

                <SubMenuItem 
                value="2"
                onClick={(e)=>{
                  setActiveIndex(e.target.getAttribute('value'));
                  dispatch({type: "sidenav/purchase-return-bill-list"});
                }}
                active={activeIndex === "2"}
                title="List All Return" />
            </SubMenuContainer>
          }
        </MainMenuContainer>

        <MainMenuContainer>
          <MainMenuItem 
          active={(mainMenuActive === 'inventory')} 
          onClick={()=>handleMainMenuItemClick('inventory')} title="Inventory" icon={inventoryIcon} />
          {
            (mainMenuActive === 'inventory')
            &&
            <SubMenuContainer>
                <SubMenuItem 
                value="0"
                onClick={(e)=>{
                  setActiveIndex(e.target.getAttribute('value'));
                  dispatch({type: "sidenav/inventory-list"});
                }}
                active={activeIndex === "0"}
                title="List All" />
            </SubMenuContainer>
          }
        </MainMenuContainer>

        <MainMenuContainer>
          <MainMenuItem 
          active={(mainMenuActive === 'price')} 
          onClick={()=>handleMainMenuItemClick('price')} title="Price" icon={priceIcon} />
          {
            (mainMenuActive === 'price')
            &&
            <SubMenuContainer>
                <SubMenuItem 
                value="0"
                onClick={(e)=>{
                  setActiveIndex(e.target.getAttribute('value'));
                  dispatch({type: "sidenav/price-list"});
                }}
                active={activeIndex === "0"}
                title="List All" />
            </SubMenuContainer>
          }
        </MainMenuContainer>

        <MainMenuContainer>
          <MainMenuItem 
          active={(mainMenuActive === 'debit')} 
          onClick={()=>handleMainMenuItemClick('debit')} title="Debit" icon={debitIcon} />
          {
            (mainMenuActive === 'debit')
            &&
            <SubMenuContainer>
                <SubMenuItem 
                 value="0"
                 onClick={(e)=>{
                  setActiveIndex(e.target.getAttribute('value'));
                  dispatch({type: "sidenav/debit-list"});
                 }}
                 active={activeIndex === "0"}
                 title="List All" />
            </SubMenuContainer>
          }
        </MainMenuContainer>

        <MainMenuContainer>
          <MainMenuItem 
          active={(mainMenuActive === 'user')} 
          onClick={()=>handleMainMenuItemClick('user')} title="User" icon={userIcon} />
          {
            (mainMenuActive === 'user')
            &&
            <SubMenuContainer>
              <SubMenuItem 
              value="0"
              onClick={(e)=>{
              setActiveIndex(e.target.getAttribute('value'));
              dispatch({type: "sidenav/user-add-edit"})
              dispatch({type: "user/store-add-user-id"})
              }}
              active={activeIndex === "0"}
              title="Add New" />

              <SubMenuItem 
              value="1"
              onClick={(e)=>{
              setActiveIndex(e.target.getAttribute('value'));
              dispatch({type: "sidenav/user-list"})
              }}
              active={activeIndex === "1"}
              title="List All" />
            </SubMenuContainer>
          }
        </MainMenuContainer>
      </>
    );
}