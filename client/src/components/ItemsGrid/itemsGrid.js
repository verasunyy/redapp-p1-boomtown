import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ItemCard from '../ItemCard'
import styles from './styles.js'
import { withStyles } from '@material-ui/core/styles';
const ItemsGrid = ({ items }) => (
    <div className="root">
        <Grid container spacing={3}>
            {items.map((item) => (
                <Grid item key={item.id} sm={12} md={6} lg={4}>
                    <ItemCard item={item} />
                </Grid>
            ))}
        </Grid>
    </div>
);

export default withStyles(styles)(ItemsGrid);