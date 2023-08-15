import * as React from 'react';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { IconFormat } from '../Controls/IconManager';
import { useTheme } from '@mui/material/styles';

export default function FooterLegal() {
  const theme = useTheme();
  return (<>
    <Typography variant= 'subtitle1' ml={2} >
      Company
    </Typography>
      <List>
          <ListItem>
            <ListItemIcon>
              <IconFormat iconNames={["handshake"]} iconColors={[`${theme.palette.primary}`]} values={[0]} iconSize="1.5em" currentValue={0} />
            </ListItemIcon>
            <Link href="https://www.fathym.com/enterprise-agreement/" underline="none" variant="body2">
              {'Enterprise Agreement'}
            </Link>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <IconFormat iconNames={["gavel"]} iconColors={[`${theme.palette.primary}`]} values={[0]} iconSize="1.5em" currentValue={0} />
            </ListItemIcon>
            <Link href="https://www.fathym.com/terms-of-services/" underline="none" variant="body2">
              {'Terms of Service'}
            </Link>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <IconFormat iconNames={["policy"]} iconColors={[`${theme.palette.primary}`]} values={[0]} iconSize="1.5em" currentValue={0} />
            </ListItemIcon>
            <Link href="https://www.fathym.com/privacy-policy/" underline="none" variant="body2">
              {'Privacy Policy'}
            </Link>
          </ListItem>
      </List>
    </>
  );
}