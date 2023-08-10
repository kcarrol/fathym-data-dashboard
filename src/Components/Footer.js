import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FooterInfo from './FooterInfo';
import FooterSocial from './FooterSocial';
import FooterCompany from './FooterCompany';
import FooterLegal from './FooterLegal';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';

import HandshakeIcon from '@mui/icons-material/Handshake';

import { useTheme } from '@mui/material/styles';

export default function Footer() { 
  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1 }} mb={2} ml={2} >
      <Grid container >
        <Grid xs={12} md={3} item={true}>
          <FooterCompany />
        </Grid>
        <Grid xs={12} md={3} item={true}>
          <FooterInfo />
        </Grid>
        <Grid xs={12} md={3} item={true}>
          <FooterLegal />
        </Grid>
        <Grid xs={12} md={3} item={true}>
          <FooterSocial />
        </Grid>
      </Grid>
    </Box>
  );
}

export function FooterList({listTitle}) {
  return (<>
    <Typography variant= 'subtitle1' ml={2} >
      {listTitle}
    </Typography>
  </>
  );
}

export function FooterListItem({listLink, listContent}) {
  return (<>
    <ListItem>
      <ListItemIcon>
        <HandshakeIcon fontSize="small" sx={{ color: 'text.secondary' }} />
      </ListItemIcon>
      <Link href={listLink} underline="none" variant="body2">
        {listContent}
      </Link>
    </ListItem>
  </>
  );
}