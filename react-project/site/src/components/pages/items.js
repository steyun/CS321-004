import React, {Component} from "react";
import Grid from "../grid/grid"

import Prices from "./panels/sitePrices.js"
import GetNotified from "./panels/getNotified.js"
var url = window.location.href.split("/");
console.log("log: " + window.location.href)
const urlSplitLen = url.length;
if( (urlSplitLen > 5) && (urlSplitLen === 6 && url[5] !== '')){
  window.location.href = "http://localhost:3000/404"
}
url = url[4];
console.log(url)
class App extends Component{
  constructor(props){
    super(props);
    
    if(url.includes("%20")){
      var splut = url.split("%20");
      console.warn(splut)
      url = splut[0] + " " + splut[1]
    }
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
    return (
    <div>
      <h1>{url.toUpperCase()}</h1>
      <Grid items={panels} layout={layout} />
    </div>
    );
  }
}
export default App