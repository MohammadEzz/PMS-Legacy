import { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { Tab } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import DrugForm from './DrugForm';
import TabPanel from '../../common/TabPanel';
import ActiveIngredientContainer from './ActiveIngredientContainer';
import { useSelector } from 'react-redux';
import axios from 'axios';
import '../../../api.config';
import ContraindicationContainer from './ContraindicationContainer';
import AlternativeContainer from './AlternativeContainer';
import Loading from '../../common/Loading';
import AlertInfo from '../../common/AlertInfo';
import MainHeader from '../../common/MainHeader';
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function DrugFormContainer() {

    const selector = (state) => state.drugs;
    const selectDrug = useSelector(selector);
    const mode = selectDrug.mode;
    const drugIdToEdit = selectDrug.drugId;

    const [openLoading, setOpenLoading] = useState(false);
    const [alertObj, setAlertObj] = useState({
        open: false,
        type: '',
        message: ''
    });
    const [tabIndex, setTabIndex] = useState(0);
    const [drugTypeOptions, setDrugTypeOptions] = useState(null);
    const [savedItem, setSavedItem] = useState(null);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setAlertObj({
            type:'',
            message: '',
            open: false});
    };

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };
    
    function handleAssignSavedItem(values) {
        setSavedItem(values);
    }

    function fetchDrugTypeOptions() {
        axios.get('api/v1/options?range=all&fields=id,name&filter=type:eq[dosage_forms]&sort=name.asc')
        .then((response) => {
            setDrugTypeOptions(response.data.data);
        })
        .catch((error) => {
            setAlertObj({
                open: true,
                type: 'error',
                message: 'Failed Fetch Drug'
            });
        });
    }

    function fetchDrugInfo(id) {
        axios.get(`api/v1/drugs/${id}`)
        .then((response) => {
            setSavedItem(response.data.data);
        })
        .catch((error) => {
            setAlertObj({
                open: true,
                type: 'error',
                message: 'Failed Fetch Drug'
            });
        })
        .finally(()=>{
            setOpenLoading(false);
        });
    }

    useEffect(()=>{
        if(drugTypeOptions && savedItem) {
            setOpenLoading(false);
        }
    }, [drugTypeOptions, savedItem]);

    useEffect(()=>{
        // if(drugTypeOptions == null) {
        //     fetchDrugTypeOptions();
        // }

        if(mode === 'edit' && savedItem == null) {
            setOpenLoading(true);
            fetchDrugInfo(drugIdToEdit); 
        }

        else if (mode === 'add') {
            setSavedItem(null);
            setTabIndex(0);
        }
    }, [mode]);
    
    useEffect(()=>{
        fetchDrugTypeOptions();
    }, []);

    return (
        <>
        
            <MainHeader title={
                (mode === 'edit')
                ? "Edit Drug"
                : "Add New Drug"
                }></MainHeader>
            <Box>
                <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Drug Froms">
                    <Tab size={"small"} label="General Info" {...a11yProps(0)} />
                    <Tab disabled={savedItem ? false : true} size={"small"} label="Active Ingredient" {...a11yProps(1)} />
                    <Tab disabled={savedItem ? false : true} size={"small"} label="Contraindications" {...a11yProps(2)} />
                    <Tab disabled={savedItem ? false : true} size={"small"} label="Alternatives" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <div>
                <TabPanel value={tabIndex} index={0}>
                    <DrugForm
                        mode={mode}
                        actions={{ 
                            handleTabChange, 
                            handleAssignSavedItem,
                            setOpenLoading,
                            setAlertObj
                        }}
                        drugTypeOptions={drugTypeOptions}
                        savedItem={savedItem} />
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    <ActiveIngredientContainer drugId={drugIdToEdit} />
                </TabPanel>
                <TabPanel value={tabIndex} index={2}>
                    <ContraindicationContainer drugId={drugIdToEdit} />
                </TabPanel>
                <TabPanel value={tabIndex} index={3}>
                    <AlternativeContainer drugId={drugIdToEdit} />
                </TabPanel>
            </div>

            <Loading
                open={openLoading}
            />

             <AlertInfo 
            alertObj={alertObj}
            actions={{handleCloseAlert}}/>
        </>
    );
}