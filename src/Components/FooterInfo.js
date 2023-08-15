import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { IconFormat } from '../Controls/IconManager';
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
              <IconFormat iconNames={["code"]} iconColors={[`${theme.palette.primary}`]} values={[0]} iconSize="1.5em" currentValue={0} />
            </ListItemIcon>
            <Link href="https://www.fathym.com/docs/" underline="none" variant="body2">
              {'Docs'}
            </Link>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <IconFormat iconNames={["news"]} iconColors={[`${theme.palette.primary}`]} values={[0]} iconSize="1.5em" currentValue={0} />
            </ListItemIcon>
            <Link href="https://www.fathym.com/blog/" underline="none" variant="body2">
              {'Blog'}
            </Link>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <IconFormat iconNames={["livehelp"]} iconColors={[`${theme.palette.primary}`]} values={[0]} iconSize="1.5em" currentValue={0} />
            </ListItemIcon>
            <Link href="mailto:support@fathym.com" underline="none" variant="body2">
              {'Support'}
            </Link>
          </ListItem>
      </List>
    </>
  );
}