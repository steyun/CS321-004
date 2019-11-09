import React from 'react';
import { Text, TextInput, View } from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

var texts = "";

class addNew extends React.Component{
  constructor(props){
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    alert('A link was submitted: ' + this.state.value);
    event.preventDefault();
  }
  render(){
    return (
      <div className='about'>
        <h1>Add new item</h1>
        <p>Type in the link to the item you want to add</p>
        <br></br>
        <form onSubmit={this.handleSubmit}>
          <label>
            Link:
            <input type="text" value={this.state.value} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}
const addNewPage = () => (
  <div className='about'>
    <h1>Add new item</h1>
    <p>
      Type in the link to the item you want to add
    </p>
    
      {
      <form>
        <label>
          Link: 
          <input type="text" name="name" />
        </label>
        <p> </p>
        <input type="submit" value="Submit" />
      </form>
  }
    
  </div>
);

function textEdited(text) {
  texts = text;
}

export default addNew;

