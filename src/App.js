import React, { Component } from 'react';

import './App.css';

class App extends Component {
  
  constructor() {
    super();

    this.state = {
      listAnimal: [
        {
          petName: "Dog", 
          petOwner: "Woman",
          dateP: "10.11.2016",
          timeP: "20:17",
          aptNotes: "As owner as pet are very crazy!"
        }
      ],
      search: "",
      order: ""
    }

    this.getInfo = this.getInfo.bind(this);
    this.addAnimal = this.addAnimal.bind(this);
    this.searchByName = this.searchByName.bind(this);
    this.setSort = this.setSort.bind(this);
  }

  getInfo(e) {   
    let name = e.target.name; 
    let value = e.target.value;

    this.setState({ [name]: value });
  }

  addAnimal(e) {
    e.preventDefault();

    let animal = {
      petName: this.state.petName,
      petOwner: this.state.petOwner,
      dateP: this.state.dateP,
      timeP: this.state.timeP,
      aptNotes: this.state.aptNotes
    };

    let new_listAnimal = [...this.state.listAnimal, animal];
    
    this.setState({ listAnimal: new_listAnimal });
  }
  
  deleteAnimal(index) {

    let copyData = [...this.state.listAnimal];
    copyData.splice(index, 1);

    this.setState({ listAnimal: copyData });
  }
  
  searchByName(e) {
    var value = e.target.value;

    this.setState({ search: value });
  }
  
  setSort(e) {
    var value = e.target.value;

    this.setState({ order: value })
  }

  render() {
    let copyArray = [...this.state.listAnimal];

    if (this.state.order) {
      let check = this.state.order == "az" ? 1 : -1;
      copyArray.sort( (a,b) => {
        console.log(a.petName);
        if (a.petName > b.petName) {
          return check;
        } else {
          return -check;
        }
      } );
    }

    if (this.state.search) {
      copyArray = copyArray.filter( (animal) => {
        return animal.petName.toLowerCase().includes(this.state.search.toLowerCase());
      } );
    }

    return (
      <div>
        <form className="mainCont" onSubmit={this.addAnimal} >
          Pet Name : <input type="text" placeholder="Pet Name" name="petName" onChange={this.getInfo} />
          Pet Owner : <input type="text" placeholder="Owner's name" name="petOwner" onChange={this.getInfo} />
          Date : <input type="text" placeholder="mm/dd/yyyy" name="dateP" onChange={this.getInfo} />
          Time : <input type="text" placeholder="--:--" name="timeP" onChange={this.getInfo} />
          Apt. Notes : <textarea type="text" rows = "3" cols = "15" placeholder="Appointment Notes" name="aptNotes" onChange={this.getInfo} />
          <button className="addList" type="submit">Add Appointment</button>
        </form>
        <div className="searchCNT">
          <input placeholder="Поиск" onChange={this.searchByName} />
          <select onChange={this.setSort}>
            <option value="az">Sort bt: A-Z</option>
            <option value="za">Sort bt: Z-A</option>
          </select>
        </div>
        <ul>
          {copyArray.map((animal, index) => {
            return (
              <li key={index} className="newLiContainer">
                <button className="delete" onClick={this.deleteAnimal.bind(this, index)}></button>
                <h3 className="newName"> {animal.petName} </h3>
                <p className="newOwner"> <b> Owner: </b> {animal.petOwner} </p>
                <p className="newDate"> <i> {animal.dateP} </i> </p>
                <p className="newTime"> <i> {animal.timeP} </i> </p>
                <p className="newNotes"> {animal.aptNotes} </p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;

