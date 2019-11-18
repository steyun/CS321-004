import React from "react";
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
