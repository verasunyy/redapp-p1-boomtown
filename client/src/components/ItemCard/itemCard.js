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
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles.js'

const ItemCard = ({ item, classes }) => (
    <ViewerContext.Consumer>
        {({ viewer, loading }) => (
            <div className={classes.root}>
                <Card className={classes.root}>
                    <Link component={RouterLink} to={`/profile/${item.itemowner.id}`}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={item.imageurl}
                                title="Item Image"
                            />
                            <CardContent className={classes.content}>
                                <Typography gutterBottom variant="h5" component="span" className={classes.userInfo}>
                                    <Gravatar email="{!item.itemowner.email?viewer.email:item.itemowner.email}" className={classes.avatar} />
                                    <Typography variant="body2" color="textSecondary" component="div" className={classes.meta}>
                                        <Typography variant="body2" color="textSecondary" component="p" className={classes.fullName}>
                                            {!item.itemowner.fullname ? viewer.fullname : item.itemowner.fullname}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {moment(item.created).fromNow()}
                                        </Typography>
                                    </Typography>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="div" className={classes.itemInfo}>
                                    <Typography variant="body2" color="textSecondary" component="p" className={classes.itemTitle}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" className={classes.itemTags}>
                                        {item.tags.reduce((acc, curr) => acc + curr.title + ", ", "").slice(0, -2)}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" className={classes.itemDescription}>
                                        {item.description}
                                    </Typography>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Link>
                    {((!item.itemowner.id && viewer.id) || (item.itemowner.id && !item.borrower && viewer.id !== item.itemowner.id)) && (
                        <CardActions>
                            <Button size="large" className={classes.borrowButton}>
                                BORROW
                        </Button>
                        </CardActions>
                    )
                    }
                </Card>
            </div>
        )
        }
    </ViewerContext.Consumer>
);
export default withStyles(styles)(ItemCard);