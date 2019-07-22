import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const FullScreenLoader = () => (
    <div>
        <CircularProgress size={80} />
        {/* className={classes.progress} */}
        <p>"For it is in gaving that we recieve."</p>
    </div>
);

export default FullScreenLoader;