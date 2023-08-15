import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { IconFormat } from '../Controls/IconManager';
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
              <IconFormat iconNames={["fathym"]} iconColors={[`${theme.palette.primary}`]} values={[0]} iconSize="1.5em" currentValue={0} />
            </ListItemIcon>
            <Link href="https://www.fathym.com/" underline="none" variant="body2">
              {'Fathym Platform'}
            </Link>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <IconFormat iconNames={["memory"]} iconColors={[`${theme.palette.primary}`]} values={[0]} iconSize="1.5em" currentValue={0} />
            </ListItemIcon>
            <Link href="https://www.fathym.com/iot/" underline="none" variant="body2">
              {'IoT Ensemble'}
            </Link>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <IconFormat iconNames={["storm"]} iconColors={[`${theme.palette.primary}`]} values={[0]} iconSize="1.5em" currentValue={0} />
            </ListItemIcon>
            <Link href="https://www.fathym.com/forecast/" underline="none" variant="body2">
              {'Habistack'}
            </Link>
          </ListItem>
      </List>
    </>
  );
}