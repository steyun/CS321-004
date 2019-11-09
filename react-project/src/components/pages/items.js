import React from 'react';
import { Text, TextInput, View } from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
var texts = "";
var url = "";
var urlSplitLen = 0;
var Router = require('react-router');
// var data = {[]};
class newItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    url = window.location.href.split("/");
    urlSplitLen = url.length;
    if( (urlSplitLen > 5) && (urlSplitLen == 6 && url[5] != '')){
        Router.browserHistory.push('404');
    }
    url = url[4];
    try{
    var data = require('../../items/'+url+'.json');
    for(var i = 0; i < data.length; i++){
      var obj = data[i];
      var name = obj.name;
      var history;
      var price;
      var amazonPrice;
      var price2;
      var price3;
      if(name == url){
        console.log("this is good. very good");
        history = obj.history;
        price = obj.price;
        console.log(name);
        console.log(price);
        amazonPrice = price.amazon;
        price2 = price.ebay;
        price3 = price.bestbuy;
        if(amazonPrice == null){
          console.log("no amazon price");
        }else
          console.log(amazonPrice);
        if(price2 == null)
          console.log("no ebay price");
        else
          console.log(price2);
        if(price3 == null)
          console.log("no bestbuy price");
        else
          console.log(price3);
        
        console.log(history);
      }else{
        this.setRedirect();
        this.renderRedirect();
      }
    
    }
  }catch{
    console.warn("couldnt do something");
    this.setRedirect();
    this.renderRedirect();
  }
}
state = {
  redirect: false
}
setRedirect = () => {
  this.setState({
    redirect:true
  })
}
renderRedirect = () => {
  if (this.state.redirect) {
     return <Redirect to='/404' />
  }
}

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    alert('A link was submitted: ' + this.state.value + " | " + url);
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

export default newItem;

