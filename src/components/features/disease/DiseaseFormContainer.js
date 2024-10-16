import { useState, useEffect } from "react";
import { Box } from '@mui/system';
import { Tab } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import DiseaseForm from './DiseaseForm';
import TabPanel from '../../common/TabPanel';
import { useSelector } from "react-redux";
import axios from "axios";
import '../../../api.config';
import ActiveIngredientContainer from "./ActiveIngredientContainer";
import Loading from "../../common/Loading";
import AlertInfo from '../../common/AlertInfo';
import MainHeader from "../../common/MainHeader";

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default function DiseaseFormContainer() {

    const selector = (state) => state.diseases;
    const selectDisease = useSelector(selector);
    const diseaseId = selectDisease.diseaseId;
    const mode = selectDisease.mode;

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const [openLoading, setOpenLoading] = useState(true);
    const [alertObj, setAlertObj] = useState({
        open: false,
        type: '',
        message: ''
    });

    const [tabIndex, setTabIndex] = useState(0);
    const [savedItem, setSavedItem] = useState(null);
    const[diseaseCategoryOptions, setDiseaseCategoryOptions] = useState(null);
    
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertObj({
            type: '',
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
   
    function fetchDisease(diseaseId) {
        axios.get(`api/v1/diseases/${diseaseId}`)
        .then((response)=>{
            setSavedItem(response.data.data);
        })
        .catch((error)=>{
            setAlertObj({
                open: true,
                type: 'error',
                message: 'Failed Read Disease'
            });
            setOpenLoading(false);
        });
    }

    function fetchDiseaseCategoyOptions() {
        axios.get('api/v1/options?range=all&fields=id,name&filter=type:eq[disease_category]&sort=name.asc')
        .then((response)=>{
            setDiseaseCategoryOptions(response.data.data);
        })
        .catch(()=>{
            setAlertObj({
                open: true,
                type: 'error',
                message: 'Failed Read Disease'
            });
            setOpenLoading(false);
        })
    }

    useEffect(()=>{
        if(diseaseCategoryOptions === null) {
            fetchDiseaseCategoyOptions();
        }

        if(mode === 'edit' && savedItem === null) {
            fetchDisease(diseaseId);
        }
        else if(mode === 'add') {
            setSavedItem(null);
            setTabIndex(0);
        }
        
    }, [mode]);

    useEffect(()=>{
        if(mode === 'edit' && diseaseCategoryOptions && savedItem){
            setOpenLoading(false);
        }
        else if(mode === 'add' && diseaseCategoryOptions) {
            setOpenLoading(false);
        }
    }, [diseaseCategoryOptions, savedItem, mode]);

    useEffect(()=>{
        return ()=>{
            source.cancel('Active Ingredient Operation Canceled');
        }
    }, []);

    return (
        <>
            <MainHeader title={
                (mode === 'edit')
                ? "Edit Disease"
                : "Add New Disease"}></MainHeader>
            <Box>
                <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Disease Froms">
                    <Tab size={"small"} label="General Info" {...a11yProps(0)} />
                    <Tab disabled={!savedItem ? true : false} size={"small"} label="Active Ingredient" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={tabIndex} index={0}>
                <DiseaseForm 
                actions={{
                    handleTabChange, 
                    handleAssignSavedItem,
                    setOpenLoading,
                    setAlertObj
                }} 
                diseaseCategoryOptions={diseaseCategoryOptions}
                savedItem={savedItem}
                mode={mode}/>
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                <ActiveIngredientContainer 
                mode={mode}
                diseaseId={diseaseId}/>
            </TabPanel>

            <Loading
            open={openLoading}
            />

            <AlertInfo
            alertObj={alertObj}
            actions={{ handleCloseAlert }} 
            />
        </>
    );
}