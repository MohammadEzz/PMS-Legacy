import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../api.config";
import { useDispatch } from "react-redux";
import { Container } from "@mui/material";
import PurchaseReturnBillList from "./PurchaseReturnBillList";
import Loading from "../../common/Loading";
import AlertInfo from '../../common/AlertInfo';
import MainHeader from "../../common/MainHeader";

export default function PurchaseReturnBillListContainer() {

    const dispatch = useDispatch();

    const [openLoading, setOpenLoading] = useState(false);
    const [alertObj, setAlertObj] = useState({
        open: false,
        type: '',
        message: ''
    });
    const [range, setRange] = useState(20);
    const [page, setPage] = useState(1);
    const [purchaseReturnBills, setPurchaseReturnBills] = useState([]);

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

    function viewPurchaseReturnBill(value) {
        dispatch({
            type: 'sidenav/purchase-return-bill-view'
        });
        dispatch({
            type: 'purchaseReturnBill/store-view-purchase-return-bill-id',
            payload: {
                purchaseReturnBillId: value.id, 
                purchaseBillId: value.purchasebill_id,
                tabIndex: 0,
                mode: 'view',
            }
        });
    }

    function editPurchaseReturnBill(value) {
        dispatch({
            type: 'sidenav/purchase-return-bill-add-edit'
        });
        dispatch({
            type: 'purchaseReturnBill/store-edit-purchase-return-bill-id',
            payload: {
                purchaseReturnBillId: value.id, 
                purchaseBillId: value.purchasebill_id,
                tabIndex: 0,
                mode: 'edit',
            }
        });
    }

    function deletePurchaseReturnBill(id) {
        axios.delete(`api/v1/purchases/returns/${id}`)
        .then(()=>{
            fetchPurchaseReturnBills(page, range);
            setAlertObj({
                open: true,
                type: 'success',
                message: 'Successfully Delete Purchase Return Bill'
            });
        })
        .catch((error)=>{
            setAlertObj({
                open: true,
                type: 'error',
                message: 'Failed Delete Purchase Return Bill'
            });
        })
        .finally(()=>{
            setOpenLoading(false);
        });
    }

    function fetchPurchaseReturnBills(page, range) {
        axios.get(`api/v1/purchases/returns?page=${page}&range=${range}`)
        .then((response)=>{
            setPurchaseReturnBills(response.data.data);
        })
        .catch((error)=>{
            setAlertObj({
                open: true,
                type: 'error',
                message: 'Server Error'
            });
        })
        .finally(()=>{
            setOpenLoading(false);
        });
    }

    function handlePagination(page) {
        setOpenLoading(true);
        setPage(page);
    }

    function handlePaginationRangeChange(range){
        setOpenLoading(true);
        setRange(range);
        setPage(1);    
    }

    useEffect(()=>{ 
        fetchPurchaseReturnBills(page, range);
    }, [page, range]);

    return(
        <>
            <MainHeader title={"List All Purchase Return Bills"}></MainHeader>
            <Container>
               <PurchaseReturnBillList actions={{
                   editPurchaseReturnBill, 
                   deletePurchaseReturnBill, 
                   viewPurchaseReturnBill, 
                   handlePagination, 
                   handlePaginationRangeChange}} 
                   data={purchaseReturnBills} />   
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