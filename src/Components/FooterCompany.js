import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { IconDisplay } from '../Controls/IconManager';
import { IconContext } from 'react-icons';
import { useTheme } from '@mui/material/styles';

export default function FooterCompany() { 
  const theme = useTheme();
  return (<>
    <Typography variant='subtitle1' ml={2} >
      Products
    </Typography>
      <List>
          <ListItem>
            <ListItemIcon>
              <IconContext.Provider>
                <Typography fontSize="large" sx={{ color:"blue", width: 1/2 }}>
                  <IconDisplay iconName="fathym" />
                </Typography>
              </IconContext.Provider>
            </ListItemIcon>
            <Link href="https://www.fathym.com/" underline="none" variant="body2">
              {'Fathym Platform'}
            </Link>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <IconContext.Provider value={{ color:`${theme.palette.primary}`, size:"1.2em" }}>
                <IconDisplay iconName="memory" />
              </IconContext.Provider>
            </ListItemIcon>
            <Link href="https://www.fathym.com/iot/" underline="none" variant="body2">
              {'IoT Ensemble'}
            </Link>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <IconContext.Provider value={{ color:`${theme.palette.primary}`, size:"1.2em" }}>
                <IconDisplay iconName="storm" />
              </IconContext.Provider>
            </ListItemIcon>
            <Link href="https://www.fathym.com/forecast/" underline="none" variant="body2">
              {'Habistack'}
            </Link>
          </ListItem>
      </List>
    </>
  );
}