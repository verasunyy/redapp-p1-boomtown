import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Grid from '@material-ui/core/Grid';
// import ItemCard from '../ItemCard';
/* 
  TODO: Create ShareItemFrom and ShareItemPreview in the components dir
  and call them from this file.

  ShareItemForm is the form that our User will use to add a new item 

  When the user is filling ShareItemForm, we will show a preview of 
  this item using the ShareItemPreview. 
  Hint: It should look like any other Item card.

*/
import ShareItemForm from '../../components/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview';

//TODO Pass the whole Tags
//DO not need to maping through the title
const Share = ({ classes, tags }) => {
  // const tagsTitle = tags.map((tag) => tag.title);
  // console.log("share.js" + tagsTitle);
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ShareItemPreview />
        </Grid>
        <Grid item xs={6}>
          {/* <ShareItemForm tags={tagsTitle} /> */}
          <ShareItemForm tags={tags} />
        </Grid>
      </Grid>
    </div>
  );
};



export default withStyles(styles)(Share);
