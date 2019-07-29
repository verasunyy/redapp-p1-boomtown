import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

const FullScreenLoader = () => (
    <Grid container justify={'center'} alignItems={'center'} alignContent={'center'}>
        <Grid item>
            <CircularProgress size={80} />
            <p>"For it is in gaving that we recieve."</p>
        </Grid>
    </Grid>
);

export default FullScreenLoader;