import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ItemsGrid from '../../components/ItemsGrid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Gravatar from 'react-gravatar';


const Profile = ({ classes, user }) => {
  return (
    <div className={classes.profile}>
      <div className={classes.header}>
        <div className={classes.headerContainer}>
          {/* className={classes.root} */}
          <div className={classes.profileMeta}>
            <Gravatar email="{user.email}" className={classes.avatar} />
            <p className={classes.fullName}>{user.fullname}</p>
          </div>
          <Typography component="p">
            <b>{user.items.length}</b> Items shared <b>{user.borrowed.length}</b> Items Borrowed
        </Typography>
          <Typography component="p">
            {user.bio}
          </Typography>
        </div>
      </div>
      <p>
        Shared Items
      </p>
      <div>
        {user.items && <ItemsGrid items={user.items} size={6} />}
      </div>
    </div>
  );
};

export default withStyles(styles)(Profile);
