import React from "react";
import { Text, TextInput, View } from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import writeFileP from 'write-file-p';
function Form() {
  const [state, setState] = React.useState({
    item: "",
    url: ""
  })
  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }
  function handleSubmit(event) {

    var toSubmit = state.item + "," + state.url
    const data = new FormData();
    data.append('info', toSubmit)
    data.append('location', "addNew")
    data.append('filename', "newItemsToAdd")

    fetch('http://localhost:8080/newitem', {
      method: 'POST',
      body: data
    })
  }
  function upload(toUpload){
    fetch('http://localhost:4000/upload', {
      method: 'POST',
      body: toUpload
    }).then(response => {
      response.json().then(body => {
        this.setState({ imageURL: 'http://localhost:4000/asdf'});
      });
    });
  }
  return (
    <div className='about'>
      <h1>Add new item</h1>
      <p>Type in the link to the item you want to add</p>
      <br></br>
      <form onSubmit={handleSubmit}>
        <label>
          Item Name: 
          <input
          type="text"
          name="item"
          value={state.item}
          onChange={handleChange}
          />
        </label>
        <br></br>
        <label>
          Item Link: 
          <input
          type="text"
          name="url"
          value={state.url}
          onChange={handleChange}
          />
        </label>
        <br></br>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
}
export default Form
