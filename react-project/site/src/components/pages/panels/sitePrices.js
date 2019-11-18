import React, { Component } from "react";
var url = window.location.href.split("/");
const urlSplitLen = url.length;
if( (urlSplitLen > 5) && (urlSplitLen === 6 && url[5] !== '')){
  window.location.href = "http://localhost:3000/404"
}
url = url[4];

// if (url.includes("%20")){
//   var temp = url.split("%20");
  
// }
class App extends Component{
  constructor(){
    super()
    this.state = {
      data: [],
      price: -1,
      site: "",
      url: ""
    }
  }

  async componentDidMount(){
    const resp = await fetch('http://localhost:8080/items');
    var data2 = await resp.json();
    console.log(data2.length)
    var num = 0;
    if(url.includes("%20")){
      var splut = url.split("%20");
      console.warn(splut)
      url = splut[0] + " " + splut[1]
    }
    while(num < data2.length){
      console.log(data2[num])
      if((data2[num].name).toLowerCase().includes(url.toLowerCase())){
        var sites = data2[num].site
        if(sites.toLowerCase().includes("amazon.com")){
          sites = "Amazon"
        }else if(sites.toLowerCase().includes("walmart.com")){
          sites = "Walmart"
        }else{
          sites = "Best Buy"
        }
        this.setState({data:data2[num], price:data2[num].price, site:sites, url:data2[num].site})
        break;
      }
      num += 1
    }

  }
  render(){
    return(
      <div className='about' style={{paddingLeft: "10px"}}>
      <h1>Sites</h1>
      <br></br>
      {this.state.site}
      :
      {" " + this.state.price}
      <br></br>
      <br></br>
      <a href = {this.state.url}>
        {this.state.url}
      </a>
    </div>
    )}
}


export default App
