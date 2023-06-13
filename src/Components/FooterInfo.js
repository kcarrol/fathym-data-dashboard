import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { IconDisplay } from '../Controls/IconManager';
import { IconContext } from 'react-icons';
import { useTheme } from '@mui/material/styles';

export default function FooterInfo() { 
  const theme = useTheme();
  return (<>
    <Typography variant='subtitle1' ml={2} >
      Resources
    </Typography>
      <List>
          <ListItem>
            <ListItemIcon>
              <IconContext.Provider value={{ color:`${theme.palette.primary}`, size:"1.2em" }}>
                <IconDisplay iconName="code" />
              </IconContext.Provider>
            </ListItemIcon>
            <Link href="https://www.fathym.com/docs/" underline="none" variant="body2">
              {'Docs'}
            </Link>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <IconContext.Provider value={{ color:`${theme.palette.primary}`, size:"1.2em" }}>
                <IconDisplay iconName="news" />
              </IconContext.Provider>
            </ListItemIcon>
            <Link href="https://www.fathym.com/blog/" underline="none" variant="body2">
              {'Blog'}
            </Link>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <IconContext.Provider value={{ color:`${theme.palette.primary}`, size:"1.2em" }}>
                <IconDisplay iconName="livehelp" />
              </IconContext.Provider>
            </ListItemIcon>
            <Link href="mailto:support@fathym.com" underline="none" variant="body2">
              {'Support'}
            </Link>
          </ListItem>
      </List>
    </>
  );
}