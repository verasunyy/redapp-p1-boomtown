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

const ShareItemPreview = ({ }) => (
    <Card >
        {/* className={classes.card} */}
        <CardActionArea>
            <CardMedia
                // className={classes.media}
                image=""
                title="Item Image"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="span">
                    <Gravatar email="verasun@Live.com" />
                    <Typography variant="body2" color="textSecondary" component="span">
                        <Typography variant="body2" color="textSecondary" component="p">
                            Vera
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {/* {moment(item.created).fromNow()} */}
                            2days ago
                        </Typography>
                    </Typography>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    <Typography variant="body2" color="textSecondary" component="p">
                        {/* {item.title} */}
                        Name your Item
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {/* {console.log(item.tags)} */}
                        {/* {item.tags.reduce((acc, curr) => acc + curr.title + ", ", "").slice(0, -2)} */}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {/* {item.description} */}
                        Describe your Item
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
export default ShareItemPreview;
