import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "../../../api.config";
import { Container, Fade } from "@mui/material";
import { createAction } from "@reduxjs/toolkit";
import PurchaseReturnBillItemsView from "./PurchaseReturnBillItemsView";
import PurchaseBillInfoView from "./PurchaseBillInfoView";
import PurchaseReturnBillActionHeader from "./PurchaseReturnBillActionHeader";
import TitleSectionWithStatus from "./TitleSectionWithStatus";
import Loading from "../../common/Loading";
import AlertInfo from '../../common/AlertInfo';
import MainHeader from '../../common/MainHeader';

export default function PurchaseReturnBillViewContainer (props) {

    let dispatch = useDispatch();

    const selector = (state) => state.purchaseReturnBills;
    const selectPurchaseReturnBill = useSelector(selector);
    let purchaseReturnBillId = selectPurchaseReturnBill.purchaseReturnBillId;
    let purchaseBillId = selectPurchaseReturnBill.purchaseBillId;
    let mode = selectPurchaseReturnBill.mode;

    const [openLoading, setOpenLoading] = useState(false);
    const [alertObj, setAlertObj] = useState({
        open: false,
        type: '',
        message: ''
    });
    const [rows, setRows] = useState([]);
    const [savedItem, setSavedItem] = useState(null);
    const [returnBillTotal, setReturnBillTotal] = useState(null);
    const [approvedStatus, setApprovedStatus] = useState(false);
    const [invalidQuantity, setInvalidQuantity] = useState([]);
    const [readyToShow, setReadyToShow] = useState(false);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setAlertObj({
            type:'',
            message: '',
            open: false
        });
    };

    function formatListOfPurchaseReturnBillItems(items) {
        const newRows = [];
        for(let item in items) {
            newRows[item]= {
                id : items[item].id,
                purchaseitemid: items[item].purchaseitem_id,
                drugid : items[item].drug_id,
                barcode: items[item].drugbarcode,
                name : items[item].drugname,
                quantity : items[item].quantity,
                price : items[item].price,
                inventoryqty : items[item].inventoryqty,
                exdate : items[item].expiredate,
                pprice : Math.round(items[item].purchaseprice*100)/100,
                discount : items[item].discount,
                tax : items[item].tax,
                pprice : items[item].purchaseprice,
            }
        }
        setRows(newRows);
    }

    function fetchPurchaseBill(purchaseBillId) {
        axios.get(`api/v1/purchases/${purchaseBillId}`)
        .then((response)=>{
            setSavedItem(response.data.data);
        })
        .catch(()=>{
            setAlertObj({
                open: true,
                type: 'error',
                message: 'Server Error'
            });
            setOpenLoading(false);
        });
    }

    function fetchPurchaseReturnBill(purchaseReturnBillId) {
        axios.get(`api/v1/purchases/returns/${purchaseReturnBillId}`)
        .then((response)=>{
            setReturnBillTotal(response.data.data.total);
            setApprovedStatus(response.data.data.billstatus === 'approved')
        })
        .catch((error)=>{
            setAlertObj({
                open: true,
                type: 'error',
                message: 'Server Error'
            });
            setOpenLoading(false);
        });
    }

    function fetchPurchaseReturnItems() {
        axios.get(`api/v1/purchases/returns/items?range=all&filter=purchasereturnbill_id:eq[${purchaseReturnBillId}]`)
        .then((response)=>{
            setRows([]);
            formatListOfPurchaseReturnBillItems(response.data.data);
        })
        .catch((error)=>{
            setAlertObj({
                open: true,
                type: 'error',
                message: 'Server Error'
            });
            setOpenLoading(false);
        });
    }

    function editPurchaseBill(){
        dispatch({
            type: 'sidenav/purchase-return-bill-add-edit'
        });
        dispatch({
            type: 'purchaseReturnBill/store-edit-purchase-return-bill-id',
            payload: {
                purchaseReturnBillId: purchaseReturnBillId, 
                purchaseBillId: purchaseBillId,
                tabIndex: 0,
                mode: 'edit',
            }
        });
    }
    
    function handeFetchReturnBillTotal() {
        return returnBillTotal;
    }

    function checkInvalidQuantity(rows) {
        let invalid = [];
        for(let index in rows) {
            if(rows[index].inventoryqty < rows[index].quantity) {
                invalid.push(rows[index].id);
            }
        }
        return invalid;
    }

    function approveReturnBill() {

        setOpenLoading(true);

        const invalidQty = checkInvalidQuantity(rows);
        setInvalidQuantity(invalidQty); 

        if(invalidQty.length !== 0) {
            setAlertObj({
                open: true,
                type: 'warning',
                message: 'Inventory Quantaty Changed'
            });
            setOpenLoading(false);
            return;
        }

        axios.post(`api/v1/purchases/returns/${purchaseReturnBillId}/approve`)
        .then(()=>{
            setApprovedStatus(true);
            setAlertObj({
                open: true,
                type: 'success',
                message: 'Successfully Approve Purchase Return Bill'
            });
        })
        .catch((error)=>{
            setAlertObj({
                open: true,
                type: 'error',
                message: 'Failed Approve Purchase Return Bill'
            });
        })
        .finally(()=>{
            setOpenLoading(false);
        });

    }

    useEffect(()=>{
        // if(mode === 'view') {
            fetchPurchaseBill(purchaseBillId);
            fetchPurchaseReturnBill(purchaseReturnBillId);
            fetchPurchaseReturnItems(purchaseReturnBillId);
    }, [purchaseReturnBillId]);

    useEffect(()=>{
        if(savedItem && rows && returnBillTotal) {
            setReadyToShow(true);
        }
    }, [savedItem, rows, returnBillTotal]);

    return (
        <>
            <MainHeader title={"View Purchase Return Bill Information"}></MainHeader>
            <Container>
                {
                    (savedItem && readyToShow)
                    &&
                    <Fade
                    in={true}
                    easing='linear'
                    timeout={200}> 
                        <div>
                        <h2>General Info</h2>
                        <PurchaseBillInfoView savedItem={savedItem} />
                        
                        <div className="info-block">
                            {
                                !approvedStatus
                                &&
                                <PurchaseReturnBillActionHeader actions={{approveReturnBill, editPurchaseBill}} />
                            }

                            <TitleSectionWithStatus id={purchaseReturnBillId} status={approvedStatus}/>
                            <PurchaseReturnBillItemsView actions={{handeFetchReturnBillTotal}} rows={rows} invalidQuantity={invalidQuantity}/>
                        </div>
                    </div>
                </Fade>
                }
            </Container>

            <Loading
            open={openLoading}
            />

            <AlertInfo 
            alertObj={alertObj}
            actions={{handleCloseAlert}}/> 
        </>
    );
}
