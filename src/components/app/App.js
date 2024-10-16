import { Drawer } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BodyContainer from './BodyContainer';
import '../../api.config';
import Menu from '../features/menu/Menu';

function App() {

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Drawer
          sx={{
            width: 220,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 220,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Menu />
        </Drawer>

        <Box sx={{
          flexGrow: 1,
        }}>
          <Box>
            <BodyContainer />
          </Box>
        </Box>
      </Box>   
    </>
  );
}

export default App;