import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ItemCard from '../ItemCard'
const ItemsGrid = ({ items, size }) => (
    <div>
        <Grid container spacing={2}>
            {items.map((item) => (
                <Grid item key={item.id} xs={size}>
                    {/* <p>{item.title}</p>
                    <p>{item.description}</p> */}
                    <ItemCard item={item} />
                </Grid>
            )
            )
            }
        </Grid>
    </div>
);

export default ItemsGrid;