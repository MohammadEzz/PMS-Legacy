import { styled } from '@mui/material/styles';

export const ResponsiveFormLabel = styled('div')(({theme}) => ({
    display: "flex",
    boxSizing: "border-box",
    flexShrink: 0,
    [theme.breakpoints.up('md')]: {
        width: "200px",
        justifyContent:"flex-end",
        padding: "10px"
    
    },
    [theme.breakpoints.down('md')]: {
        width: "100%",
        flexGrow: 1,
        justifyContent:"flex-start",
    }
}));