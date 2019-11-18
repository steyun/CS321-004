import React from "react";
import { Text, TextInput, View } from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import writeFileP from 'write-file-p';
function Form() {
  return (
    <div className='about' style={{paddingLeft: "10px"}}>
      <h1>Sites</h1>
      <br></br>
      Amazon: 
      <br></br>
      BestBuy:
      <br></br>
      Walmart: 
      <br></br>
    </div>
  );
}
export default Form
