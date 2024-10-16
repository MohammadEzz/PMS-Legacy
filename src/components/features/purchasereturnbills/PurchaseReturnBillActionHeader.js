import { Box, Button, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
export default function PurchaseReturnBillActionHeader(props) {
    return (
        <div className="container-action">
            <Button 
            variant="contained" 
            color="success" 
            size="small"
            onClick={props.actions.approveReturnBill}
            >
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
        </div>
    );
}