import { Box, Button, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
export default function PurchaseBillActionHeader(props) {
    return (
        <Box sx={{my:"10px"}}>
            <Button 
            variant="contained" 
            color="success" 
            size="small"
            onClick={props.actions.approvePurchaseBill}>
                Click to Approve Bill
            </Button>
            <IconButton 
            sx={{float:'right'}}
            color="primary" 
            variant="outlined" 
            size="small" 
            onClick={props.actions.editPurchaseBill}
            children={
                <EditIcon />
            } />
        </Box>
    );
}