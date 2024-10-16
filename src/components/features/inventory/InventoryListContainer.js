import { useState, useEffect } from "react";
import { Box } from '@mui/system';
import { Container, Tab } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import TabPanel from '../../common/TabPanel';
import axios from "axios";
import '../../../api.config';
import InventoryList from "./InventoryList";
import Loading from "../../common/Loading";
import AlertInfo from '../../common/AlertInfo';
import MainHeader from '../../common/MainHeader';

export default function InventoryListContainer () {

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    
    const [openLoading, setOpenLoading] = useState(false);
    const [alertObj, setAlertObj] = useState({
        open: false,
        type: '',
        message: ''
    });

    const [range, setRange] = useState(20);
    const [page, setPage] = useState(1);
    const [inventory, setInventory] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);

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

    function fetchInventory(page, range) {
        axios.get(`api/v1/inventory/quantity?page=${page}&range=${range}`)
        .then((response)=>{
            setInventory(response.data.data);
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

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };
    
    function handlePagination(page) {
        setOpenLoading(true);
        setPage(page);
    }

    function handlePaginationRangeChange(range){
        setOpenLoading(true);
        setPage(1);
        setRange(range);
    }

    useEffect(()=>{ 
        fetchInventory(page, range);
    }, [page, range]);

    return (
        <>
        <MainHeader title={"List All Inventory Items"}></MainHeader>
    
        <Container>
            <InventoryList actions={{handlePagination, handlePaginationRangeChange}} data={inventory}/>
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