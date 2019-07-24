import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import { updateItem, resetItem, resetItemImage } from '../../redux/ShareItemPreview/reducer';
import { connect } from 'react-redux';



// function Input({ label, value, placeholder, onChange, meta }) {
//   return (
//     <div className="line">
//       <div>
//         <TextField
//           variant="outlined"
//           fullWidth={true}
//           label={label}
//           placeholder={placeholder}
//           value={value}
//           error={!!meta.touched && !!meta.error}
//           helperText={!!meta.touched && meta.error || ""}
//           onChange={onChange}
//         />
//       </div>
//     </div>
//   );
// }
// export const FormConfig = {
//   label: {
//     itemName: 'Name your Item',
//     itemDescription: 'Describe your Item',
//     tags: 'Add Some Tags',
//   },
//   placeholder: {
//     itemName: 'Name your Item',
//     itemDescription: 'Describe your Item',
//     tags: 'Add Some Tags',
//   },
// }

//tagsTitle
export function FormView({ handleSubmit, tags, state, handleChange, }) {

  return (
    <form onSubmit={handleSubmit}>
      <FormSpy
        subscription={{ values: true }}
        component={({ values }) => {
          if (values) {
            this.dispatchUpdate(values, tags, updateItem);
          }
          return '';
        }}
      />
      <Field name="name"
        render={({ input, meta }) => (
          <TextField
            id="standard-name"
            label="Name your Item"
            fullWidth="true"
            onChange={input.onChange}
            meta={meta}
            value={input.value} />
        )} />

      <Field name="itemDescription"
        render={({ input, meta }) => (
          <TextField
            label="Describe your Items"
            id="standard-multiline-static"
            onChange={input.onChange}
            multiline
            rows="4"
            margin="normal"
            meta={meta}
            {...input} />
        )} />

      <Field name="tags"
        render={({ input, meta }) => (
          <div>
            <FormControl>
              <InputLabel htmlFor="select-multiple-checkbox">Tag</InputLabel>
              <Select
                multiple
                value={state.tagsSelected}

                onChange={handleChange}
                input={<Input id="select-multiple-checkbox" />}
                renderValue={selected => selected.join(', ')}
              // MenuProps={MenuProps}
              >

                {tagsTitle.map(tag => (
                  <MenuItem key={tag} value={tag}>
                    <Checkbox checked={state.tagsSelected.indexOf(tag) > -1} />
                    <ListItemText primary={tag} />
                  </MenuItem>
                ))}
                {console.log(state)}

                {/* {console.log(React.useState)} */}
              </Select>
            </FormControl>
          </div>

        )}
      />


      <Button variant="contained"
        color="primary"
        type="submit">Share</Button>
    </form>
  );
}
class ShareItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: "",
      itemDescription: "",
      tagsSelected: [],
    };
  }
  onSubmit(finalState) {
    alert(`Form is Valid!\n${JSON.stringify(finalState)}`);
  }
  handleChange(event) {
    console.log(event.target.value)
    // console.log(this.state.tagsSelected)
    // this.setState((state, props) => {
    //     return state.tagsSelected.push(event.target.value)
    // });
    this.setState({ tagsSelected: this.state.tagsSelected.push(event.target.value) }
    );
  }

  render() {
    return (
      <div>
        <p>Share. Borrow. Prosper.</p>
        <Form
          onSubmit={this.onSubmit.bind(this)}
          render={props => (<FormView {...props} state={this.state} handleChange={this.handleChange} tagsTitle={this.props.tags} />)}
        />
      </div>
    );
  }
}

//convention change the name of dispatch to updateItem
//which calls the action
const mapDispatchToProps = (dispatch) => ({
  updateItem(item) {
    dispatch(updateItem(item))
  },
  resetItem() {
    dispatch(resetItem());
  },
  resetItemImage() {
    dispatch(resetItemImage());
  }
})


export default connect(null, mapDispatchToProps)(ShareItemForm)

// whithStyles(sytle)(ShareItemForm)