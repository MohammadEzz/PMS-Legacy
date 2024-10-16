import { styled } from '@mui/material/styles';

 export const ResponsiveFormLabelFieldContainer = styled('div')(({theme}) => ({
    display: "flex",
    marginBottom: 20,
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
    }
    }));