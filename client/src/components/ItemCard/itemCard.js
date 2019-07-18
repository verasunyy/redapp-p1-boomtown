import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

import Gravatar from 'react-gravatar';

const ItemCard = ({ item }) => (
    <Card >
        {console.log(item)}
        {/* className={classes.card} */}
        <CardActionArea>
            <CardMedia
                // className={classes.media}
                image="{item.imageurl}"
                title="Item Image"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="span">
                    <Gravatar email="{item.itemowner.email}" />
                    <Typography variant="body2" color="textSecondary" component="p">
                        {item.itemowner.fullname}
                        {moment(item.created).fromNow()}
                    </Typography>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    <Typography variant="body2" color="textSecondary" component="p">
                        {item.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {/* {console.log(item.tags)} */}
                        {item.tags.reduce((acc, curr) => acc + curr.title + ", ", "")}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {item.description}
                    </Typography>
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" color="primary">
                BORROW
        </Button>
        </CardActions>
    </Card>
);
export default ItemCard;