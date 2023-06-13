import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { IconDisplay } from '../Controls/IconManager';
import { IconContext } from 'react-icons';
import { useTheme } from '@mui/material/styles';

export default function FooterSocial() {
  const theme = useTheme();
  return (<>
    <Box sx={{ flexGrow: 1 }} mt={4} mb={4} >
      <Grid container spacing={3} alignItems="center" disableEqualOverflow>
        <Grid display="flex" alignItems="center" justifyContent="center">
          <Link href="https://twitter.com/FathymIt" underline="none" variant="body2">
            <IconContext.Provider value={{ color:`${theme.palette.primary}`, size:"2em" }}>
              <IconDisplay iconName="twitter" />
            </IconContext.Provider>
          </Link>
        </Grid>
        <Grid display="flex" alignItems="center" justifyContent="center">
          <Link href="https://www.facebook.com/FathymInc/" underline="none" variant="body2">
          <IconContext.Provider value={{ color:`${theme.palette.primary}`, size:"2em" }}>
              <IconDisplay iconName="facebook" />
            </IconContext.Provider>
          </Link>
        </Grid>
        <Grid display="flex" alignItems="center" justifyContent="center">
          <Link href="https://www.instagram.com/fathymit/" underline="none" variant="body2">
          <IconContext.Provider value={{ color:`${theme.palette.primary}`, size:"2em" }}>
              <IconDisplay iconName="instagram" />
            </IconContext.Provider>
          </Link>
        </Grid>
        <Grid display="flex" alignItems="center" justifyContent="center">
          <Link href="https://www.youtube.com/@fathyminc5477/" underline="none" variant="body2">
          <IconContext.Provider value={{ color:`${theme.palette.primary}`, size:"2em" }}>
              <IconDisplay iconName="youtube" />
            </IconContext.Provider>
          </Link>
        </Grid>
        <Grid display="flex" alignItems="center" justifyContent="center">
          <Link href="https://github.com/fathym" underline="none" variant="body2">
          <IconContext.Provider value={{ color:`${theme.palette.primary}`, size:"2em" }}>
              <IconDisplay iconName="github" />
            </IconContext.Provider>
          </Link>
        </Grid>
      </Grid>
    </Box>
      <Typography variant="body2" color="text.secondary" mb={2} ml={2} >
        &copy; {new Date().getFullYear()} Fathym
        All rights reserved
      </Typography>
    </>
  );
}