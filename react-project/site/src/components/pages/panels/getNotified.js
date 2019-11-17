import React from "react";
import { Text, TextInput, View } from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import writeFileP from 'write-file-p';
function Form() {
  const [state, setState] = React.useState({
    email: "",
    targetPrice: ""
  })
  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }
  function handleSubmit(event) {
    var item = window.location.href.split("/")[4];
    var toSubmit = item + "," + state.targetPrice + "," + state.email;
    event.preventDefault();
    const data = new FormData();
    data.append('info', toSubmit)
    data.append('location', "notify")
    data.append('filename', "newItemsToAdd")
    fetch('http://localhost:8080/notify', {
      method: 'POST',
      body: data
    })
  }
  return (
    <div className='about' style={{paddingLeft: "10px"}}>
      <h1>Want to get Notified?</h1>
      <p>Type in the your Email & the price you want to get notified at!</p>
      <br></br>
      <form onSubmit={handleSubmit}>
        <label>
          Email:  
          <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          />
        </label>
        <br></br>
        <label>
          Notification Price:
          <input
          type="price"
          name="targetPrice"
          value={state.targetPrice}
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
