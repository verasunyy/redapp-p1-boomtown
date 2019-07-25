import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Form, Field, FormSpy } from "react-final-form";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  updateItem,
  resetItem,
  resetItemImage
} from "../../redux/ShareItemPreview/reducer";
import { connect } from "react-redux";
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
// import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { Query } from 'react-apollo';
import { ADD_ITEM_MUTATION } from '../../apollo/queries';
// import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import { ViewerContext } from "../../context/ViewerProvider";
class ShareItemForm extends Component {
  constructor({ props }) {
    super(props);
    //
    this.state = {
      fileSelected: false,
      done: false,
      selectedTags: [],
    };
    this.fileInput = React.createRef();
  }
  // onSubmit(formState) {
  // }
  validate(formState) {
    console.log("validating");
  }

  generateTagsText(tags, selected) {
    return tags
      .map(t => (selected.indexOf(t.id) > -1 ? t.title : false))
      .filter(e => e)
      .join(", ");
  }
  handleSelectTag(event) {
    this.setState({ selectedTags: event.target.value })
  }

  handleSelectFile(event) {
    this.setState({
      fileSelected: this.fileInput.current.files[0]
    });
  }

  resetFileInput() {
    this.props.resetItemImage();
    this.fileInput.current.value = "";
    this.setState({ fileSelected: false });
  }

  //Convert the selected image into a base64 string
  getBase64Url() {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => {
        resolve(
          `data:${this.state.fileSelected.type};base64, ${btoa(
            e.target.result
          )}`
        );
      };
      reader.readAsBinaryString(this.state.fileSelected);
    });
  }

  //convert this tags into an array of objects.
  applyTags(tags) {
    return (
      tags &&
      tags
        .filter(t => this.state.selectedTags.indexOf(t.id) > -1)
        .map(t => ({ title: t.title, id: t.id }))
    );
  }

  //call updateItem prop so that the preview gets updated
  //copy from the tuesday slide 16 
  dispatchUpdate(values, tags, updateItem) {
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateItem({
          imageurl
        });
      });
    }
    updateItem({
      ...values,
      tags: this.applyTags(tags)
    });
  }

  saveItem = async (value, tags, addItem) => {
    try {

      const item = {
        ...value,
        tags: this.applyTags(tags)
      }
      await addItem({ variables: {item:item}})
    }
    catch (e) {
      throw new Error(e)
    }

  }

  render() {
    //updateItem
    const { tags, classes, updateItem } = this.props;
    return (
      <ViewerContext.Consumer>
        {({ viewer, loading }) => (
          <Mutation
          mutation={ADD_ITEM_MUTATION}
          refetchQueries={() => [
            { query: ALL_ITEMS_QUERY, variables: { id: viewer.id } },
          ]}
        >

            {(addItem, { data }) => (
              <div>
                {/* {console.log(formState)} */}
                <Card>
                  <CardContent>
                    <Form
                      validate={formState => this.validate(formState)}
                      onSubmit={value => this.saveItem(value, tags, addItem)}
                      render={({ handleSubmit, pristine, invalid }) => (
                        <form onSubmit={handleSubmit}>
                          {/*  */}
                          <FormSpy
                            subscription={{ values: true }}
                            component={({ values }) => {
                              if (values) {
                                this.dispatchUpdate(values, tags, updateItem);
                              }
                              return "";
                            }}
                          />
                          <h1>Share. Borrow. Prosper.</h1>
                          <FormControl fullWidth className={classes.formControl}>
                            <Field name="imageurl">
                              {({ input, meta }) => {
                                return (
                                  <React.Fragment>
                                    {!this.state.fileSelected ? (
                                      <Button
                                        size="medium"
                                        color="primary"
                                        variant="contained"
                                        onClick={() => {
                                          this.fileInput.current.click();
                                        }}
                                      >
                                        <Typography>Select an Image</Typography>
                                      </Button>
                                    ) : (
                                        <Button
                                          size="medium"
                                          color="primary"
                                          variant="outlined"
                                          onClick={() => {
                                            this.resetFileInput();
                                          }}
                                        >
                                          <Typography>Reset image</Typography>
                                        </Button>
                                      )}
                                    <input
                                      ref={this.fileInput}
                                      hidden
                                      type="file"
                                      accept="image/*"
                                      id="fileInput"
                                      onChange={e => this.handleSelectFile(e)}
                                    />
                                  </React.Fragment>
                                );
                              }}
                            </Field>
                          </FormControl>
                          <div>
                            <Field
                              name="title"
                              render={({ input, meta }) => (
                                <label>
                                  <TextField
                                    id="title"
                                    inputProps={{ ...input }}
                                    label="Name your Item"
                                    value={input.value}
                                    margin="normal"
                                    className={classes.inputfield}
                                  />
                                </label>
                              )}
                            />
                          </div>
                          <div>
                            <Field
                              name="description"
                              render={({ input, meta }) => (
                                <label>
                                  <TextField
                                    id="description"
                                    inputProps={{ ...input }}
                                    label="Describe your Item"
                                    value={input.value}
                                    margin="normal"
                                    className={classes.inputfield}
                                  />
                                </label>
                              )}
                            />
                          </div>
                          <div>
                            <FormControl fullWidth className={classes.formControl}>
                              <InputLabel htmlFor="age-simple">
                                Add some tags
                      </InputLabel>
                              <Field name="tags">
                                {({ input, meta }) => {
                                  return (
                                    <Select
                                      multiple
                                      value={this.state.selectedTags}
                                      onChange={e => this.handleSelectTag(e)}
                                      renderValue={selected => {
                                        return this.generateTagsText(tags, selected);
                                      }}
                                    >
                                      {tags &&
                                        tags.map(tag => (
                                          <MenuItem key={tag.id} value={tag.id}>
                                            <Checkbox
                                              checked={
                                                this.state.selectedTags.indexOf(
                                                  tag.id,
                                                ) > -1
                                              }
                                            />
                                            <ListItemText primary={tag.title} />
                                          </MenuItem>
                                        ))}
                                    </Select>
                                  );
                                }}
                              </Field>
                            </FormControl>
                          </div>
                          <Button variant="contained"
                            color="primary"
                            type="submit">Share</Button>
                        </form>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
            )}
          </Mutation>
        )}
      </ViewerContext.Consumer>

    );
  }
}
//converts dispatch functions into props
const mapDispatchToProps = dispatch => ({
  updateItem(item) {
    dispatch(updateItem(item));
  },
  resetItem() {
    dispatch(resetItem());
  },
  resetItemImage() {
    dispatch(resetItemImage());
  }
});
export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(ShareItemForm));
