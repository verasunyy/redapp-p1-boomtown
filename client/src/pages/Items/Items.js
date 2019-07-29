import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ItemsGrid from '../../components/ItemsGrid';

const Items = ({ classes, items }) => {
  return (
    <div className={classes.items}>
      {items && <ItemsGrid items={items} size={4} />}
    </div>
  );
};

export default withStyles(styles)(Items);

