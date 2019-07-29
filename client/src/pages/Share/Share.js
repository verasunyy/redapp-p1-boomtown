import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Grid from '@material-ui/core/Grid';
import ShareItemForm from '../../components/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview';

const Share = ({ classes, tags }) => {

  return (
    <div className={classes.profile}>
      <Grid container spacing={10} justify={'space-between'}>
        <Grid item sm={6} md={6} lg={6}  >
          <ShareItemPreview />
        </Grid>
        <Grid item sm={6} md={6} lg={6}  >
          <ShareItemForm tags={tags} />
        </Grid>
      </Grid>
    </div>
  );
};



export default withStyles(styles)(Share);
