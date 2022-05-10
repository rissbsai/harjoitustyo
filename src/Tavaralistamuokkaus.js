import { Component } from "react";
import React from "react";
import { useEffect, useState } from "react";

class Tavaralistamuokkaus extends Component {

  constructor(props) {
    super(props);
    this.state = { nimi: '', hyllyid: '', lkm: '' };

    this.buttonClicked = this.buttonClicked.bind(this);
    this.buttonLisaaClicked = this.buttonLisaaClicked.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleShelfChange = this.handleShelfChange.bind(this);
    this.delete = this.delete.bind(this);

  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    let url = "http://localhost:4000/tavarat/";
    let params = "";
    if (this.state.nimi && this.state.hyllyid) {
      params = "?nimi_like=" + this.state.nimi + "&hyllyid_like=" + this.state.hyllyid;
    } else if (this.state.nimi) {
      params = "?nimi_like=" + this.state.nimi;
    } else if (this.state.hyllyid) {
      params = "?hyllyid_like=" + this.state.hyllyid;
    }
    let response = await fetch(url + params);
    let data = await response.json();
    console.log(data);
    this.setState({ fetchedData: data });
  }

  buttonClicked() {
    this.setState({ fetchedData: null });
    this.fetchData();
  }

  buttonLisaaClicked() {
    this.setState({ fetchedData: null });
    this.fetchData();
  }

  handleNameChange(event) {
    this.setState({ nimi: event.target.value })
  }

  handleShelfChange(event) {
    this.setState({ hyllyid: event.target.value })
  }

  async delete(event) {
    await fetch("http://localhost:4000/tavarat/" + event.target.id, { method: "DELETE" });
    this.fetchData();
  }

  /*   async lisaa(event){
      await fetch("http://localhost:4000/tavarat/"+ event.target.id ,{method:"PUT"});
      this.lkm = this.lkm +1;
      this.fetchData();
  }
  
  async poista(event){
    await fetch("http://localhost:4000/tavarat/"+ event.target.id ,{method:"PUT"});
    this.lkm = this.lkm -1;
    this.fetchData();
  }
   */


  render(props) {
    var content;
    var rivit;
    if (this.state.fetchedData) {
      if (this.state.fetchedData.length > 0) {
        rivit = this.state.fetchedData.map((row) =>
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.nimi}</td>
            <td>{row.hyllyid}</td>
            <td>{row.lkm}</td>
            <td><button onClick={this.lisaa} id={row.id}>+</button></td>
            <td><button onClick={this.vahenna} id={row.id}>-</button></td>
            <td><button onClick={this.delete} id={row.id}>Poista</button></td>
          </tr>)

        content = <div>
          <table className="center">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nimi</th>
                <th>Hyllynumero</th>
                <th>Lukumäärä</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rivit}
            </tbody>
          </table>
        </div>
      }
      else {
        content = "Annetuilla hakuehdoilla ei löytynyt dataa"
      }

    } else {
      content = "Loading..."
    }


    return (
      <div style={{ marginBottom: 2 + 'em' }}>
        <div style={{ marginBottom: 2 + 'em' }}>
          <form style={{ marginBottom: 1 + 'em' }}>
          <br></br>
            <input type="text" name="name" id="name" placeholder="Etsi tavaraa nimellä" onChange={this.handleNameChange}></input>
            <br></br>
            <input type="text" name="shelf" id="shelf" placeholder="Etsi tavaraa hyllynumerolla" onChange={this.handleShelfChange}></input>
          </form>
          <button onClick={this.buttonClicked}>Etsi tavara</button>
          <button onClick={this.buttonLisaaClicked} >Lisää tavara</button>
        </div>
        {content}


      </div>
    )
  }

}



/* class Tavaralista extends Component {

  constructor(props) {
    super();

    this.demoAsyncCall = this.demoAsyncCall.bind(this);
    this.muutaHylly=this.muutaHylly.bind(this);
    this.muutaNimi=this.muutaNimi.bind(this);
    this.componentDidMount=this.componentDidMount(this);
    this.searchDb=this.searchDb(this);

    this.state = {
      data: null,
      id: "",
      nimi: "",
      hyllyid: true,
      lkm: "",
      loading: true,
      wrongInfo: false
    }
  }

  async fetchData() {
    console.log("fetching data...");
    var nimi = this.state.nimi;
    var hyllyid = this.state.hyllyid;
    let response = await fetch("http://localhost:4000/tavarat?nimi_like=" + nimi + "&hyllyid_like=" + hyllyid);
    let data = await response.json();
    this.setState({ data: data });
    if (data === 0) {
      this.setState({ wrongInfo: true });
    } else {
      this.setState({ wrongInfo: false });
    }
  }

  demoAsyncCall() {
    return new Promise((resolve) => setTimeout(() => resolve(), 2000));
}

  componentDidMount() {
    this.demoAsyncCall().then(() => this.setState({ loading: false }));
    this.fetchData();
  }

  muutaNimi(event) {
    this.setState({ nimi: event.target.value })
  }

  muutaHylly(event) {
    this.setState({ osoite: event.target.value })
  }

  searchDb() {
    this.fetchData();
  }

  render() {
    console.log("Tavaralista");
    const { loading } = this.state;
    const { wrongInfo } = this.state;
    var dataObjektit = this.state.data;
    if (loading)
      return (
        <div>
          <h2>Haetaan varastosaldoja...</h2>
        </div>
      )
    else if (wrongInfo === true) {
      return (
        <div>
          <h1>Varaston hallintajärjestelmä</h1>
          <br></br>
          <input name="nimi" type="text" placeholder="Etsi tavaraa nimellä" onChange={this.muutaNimi}></input>
          <br></br>
          <input name="hyllyid" type="text" placeholder="Etsi tavaraa hyllynumerolla" onChange={this.muutaHylly}></input>
          <br></br>
          <button onClick={this.searchDb}>Etsi tavara</button>
          <br></br>
          <br></br>
          <h2><b>Annetuilla hakuehdoilla ei löytynyt tavaroita...</b></h2>
        </div>
      )
    }
    else {
      console.log("Tuletko tänne?");
      dataObjektit = this.state.data.map((tavara) =>
      (<tr key={tavara.id}>
        <td>{tavara.id}</td>
        <td>{tavara.nimi}</td>
        <td>{tavara.hyllyid}</td>
        <td>{tavara.lkm}</td>
      </tr>
      ))

      return (
        <div>
          <h1>Varaston hallintajärjestelmä</h1>
          <br></br>
          <input name="nimi" type="text" placeholder="Etsi tavaraa nimellä" onChange={this.muutaNimi}></input>
          <br></br>
          <input name="hyllyid" type="text" placeholder="Etsi tavaraa hyllynumerolla" onChange={this.muutaHylly}></input>
          <br></br>
          <button onClick={this.searchDb}>Etsi tavara</button>
          <table>
            <thead>
              <tr>
                <th>Id:</th>
                <th>Nimi:</th>
                <th>Hyllyid:</th>
                <th>Lukumäärä:</th>
              </tr>
            </thead>
            <tbody>
              {dataObjektit}
            </tbody>
          </table >
        </div>
      );
    }
  }
} */

export default Tavaralistamuokkaus;