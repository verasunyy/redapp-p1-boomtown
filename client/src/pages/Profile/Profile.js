import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ItemsGrid from '../../components/ItemsGrid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Gravatar from 'react-gravatar';

const UserHeader = ({ user }) => {
  return (
    <div>
      <Paper >
        {/* className={classes.root} */}
        <Typography variant="h5" component="h3">
          <Gravatar email="{user.email}" />
          {user.fullname}
        </Typography>
        <Typography component="p">
          {user.items.length} Items shared {user.borrowed.length} Items Borrowed
        </Typography>
        <Typography component="p">
          {user.bio}
        </Typography>
      </Paper>
    </div>
  );
}
const Profile = ({ classes, user }) => {
  return (
    <div>
      <p>
        This is the profile page located at <code>/profile/:userId</code>.
      </p>
      <div>
        <UserHeader user={user} />
      </div>
      <p>
        Shared Items
      </p>
      <div>
        <ItemsGrid items={user.items} size={6} />
      </div>
    </div>
  );
};

export default withStyles(styles)(Profile);
