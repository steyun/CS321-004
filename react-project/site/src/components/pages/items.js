import React, {Component} from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import Grid from "../grid/grid"

import Prices from "./panels/sitePrices.js"
import GetNotified from "./panels/getNotified.js"
import Timeline from "./panels/timeline.js"
// import Grid from '@material-ui/core/Grid';
// import Router from ""
import { Text, TextInput, View } from 'react';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
class App extends Component{
  constructor(props){
    super(props);
    var url = window.location.href.split("/");
    console.log("log: " + window.location.href)
    const urlSplitLen = url.length;
    if( (urlSplitLen > 5) && (urlSplitLen == 6 && url[5] != '')){
      window.location.href = "http://localhost:3000/404"
    }
    url = url[4];
    console.log(url)
  }
  render(){
    const panels = [
      { id: "1", name: "Prices" , content: <Prices/>},
      { id: "2", name: "Get Notified", content:<GetNotified/>},
      // { id: "3", name: "Price Timeline", content: <Timeline/>},
    ];
    const layout = [
      { i: "1", x: 0, y: 0, w: 20, h: 10 },
      { i: "2", x: 20, y: 0, w: 10, h: 10 },
      // { i: "3", x: 0, y: 17, w: 30, h: 15 },
    ];
    return <Grid items={panels} layout={layout} />;
  }
}
export default App