import { styled } from '@mui/material/styles';

export const ResponsiveFormField = styled('div')(({theme}) => ({
    [theme.breakpoints.up('lg')]: {
        width: "650px", 
    },
    [theme.breakpoints.down('lg')]: {
        width: "100%",
    }
}));