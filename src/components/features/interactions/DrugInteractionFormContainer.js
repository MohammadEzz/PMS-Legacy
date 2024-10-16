import { useState, useEffect } from "react";
import { Box } from '@mui/system';
import { Tab } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import TabPanel from '../../common/TabPanel';
import axios from "axios";
import '../../../api.config';
import { useSelector } from 'react-redux';
import DrugInteractionForm from "./DrugInteractionForm";
import Loading from "../../common/Loading";
import AlertInfo from '../../common/AlertInfo';
import MainHeader from '../../common/MainHeader';

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default function DrugInteractionFormContainer() {    
    

    const selector = (state) => state.drugInteractions;
    const selectDrugInteraction = useSelector(selector);
    const drugInteractionId = selectDrugInteraction.drugInteractionId;
    const mode = selectDrugInteraction.mode;

    const [openLoading, setOpenLoading] = useState(false);
    const [alertObj, setAlertObj] = useState({
        open: false,
        type: '',
        message: ''
    });

    const [tabIndex, setTabIndex] = useState(0);
    const [savedItem, setSavedItem] = useState(null);
    const [activeIngredientOptions, setActiveIngredientOptions] = useState(null);
    const [drugInteractionLevelOptions, setDrugInteractionLevelOptions] = useState(null);

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
    
    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    function handleAssignSavedItem(values) {
        setSavedItem(values);
    }

    function fetchDrugInteraction(drugInteractionId) {
        axios.get(`api/v1/druginteractions/${drugInteractionId}`)
        .then((response)=>{
            setSavedItem(response.data.data);
            setTabIndex(selectDrugInteraction.tabIndex);
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

    function fetchActiveIngredientOptions() {
        axios.get('api/v1/activeingredients?range=all&sort=name.asc&fields=id,name')
        .then((response)=>{
            setActiveIngredientOptions(response.data.data);
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

    function fetchDrugInteractionLevelOptions() {
        axios.get('api/v1/options?range=all&fields=id,name&filter=type:eq[interaction_level]')
        .then((response)=>{
            setDrugInteractionLevelOptions(response.data.data);
        })
        .catch(()=>{

        });
    }

    useEffect(()=>{
        fetchActiveIngredientOptions();
        fetchDrugInteractionLevelOptions();
    }, []);

     useEffect(()=>{
        if(mode === 'edit') {
            setOpenLoading(true);
            fetchDrugInteraction(drugInteractionId);
        }
        if(mode === 'add') {
            setTabIndex(selectDrugInteraction.tabIndex);
            setSavedItem(null);
        }
    }, [mode]);

    useEffect(()=>{
        if(mode === 'edit' && activeIngredientOptions && drugInteractionLevelOptions && savedItem) {
            setOpenLoading(false);
        }
        else if(mode === 'add' && activeIngredientOptions && drugInteractionLevelOptions) {
            setOpenLoading(false);
        }
    }, [activeIngredientOptions, drugInteractionLevelOptions, savedItem, mode]);

    return (
        <>
            <MainHeader title={
                (mode === 'edit')
                ? "Edit Drug Interaction"
                : "Add New Drug Interaction"
            }>

            </MainHeader>
            <Box>
                <Tabs value={tabIndex} onChange={handleTabChange} aria-label="DrugInteraction Froms">
                    <Tab size={"small"} label="General Info" {...a11yProps(0)} />
                </Tabs>
            </Box>
            <TabPanel value={tabIndex} index={0}>
                <DrugInteractionForm 
                actions={{
                    handleTabChange, 
                    handleAssignSavedItem,
                    setOpenLoading,
                    setAlertObj
                }} 
                activeIngredientOptions={activeIngredientOptions}
                drugInteractionLevelOptions={drugInteractionLevelOptions}
                savedItem={savedItem}
                drugInteractionId={drugInteractionId}
                mode={mode}  />
            </TabPanel>

            <Loading
            open={openLoading}
            />

            <AlertInfo 
            alertObj={alertObj}
            actions={{handleCloseAlert}}/>

        </>
    );
}