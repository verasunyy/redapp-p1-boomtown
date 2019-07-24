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
import ItemCard from '../ItemCard'
import { connect } from 'react-redux';

const ShareItemPreview = ({ shareItemPreview }) => {
    return (
        <div>
            <ItemCard item={shareItemPreview} />
        </div>
    );
};

const mapSateToProps = ({ shareItemPreview }) => {
    return { shareItemPreview };
}
export default connect(mapSateToProps)(ShareItemPreview);

