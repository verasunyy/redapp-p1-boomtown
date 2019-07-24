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
import { ViewerContext } from "../../context/ViewerProvider";

const ItemCard = ({ item }) => (
    <ViewerContext.Consumer>
        {({ viewer, loading }) => (
            <Card >
                <CardActionArea>
                    <CardMedia
                        // className={classes.media}
                        image={item.imageurl}
                        title="Item Image"

                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="span">
                            <Gravatar email="{item.itemowner.email}" />
                            <Typography variant="body2" color="textSecondary" component="span">
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {item.itemowner.fullname}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {moment(item.created).fromNow()}
                                </Typography>
                            </Typography>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <Typography variant="body2" color="textSecondary" component="p">
                                {item.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {/* {console.log(item.tags)} */}
                                {item.tags.reduce((acc, curr) => acc + curr.title + ", ", "").slice(0, -2)}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {item.description}
                            </Typography>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                {item.itemowner.id && !item.borrower && viewer.id != item.itemowner.id && (
                    <CardActions>
                        <Button size="small" color="primary">
                            BORROW
                        </Button>
                    </CardActions>
                )
                }
                {console.log(item)}
                {console.log(item.itemowner.id)}
                {console.log(viewer.id)}

            </Card>
        )
        }
    </ViewerContext.Consumer>
);
export default ItemCard;