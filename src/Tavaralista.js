import { Component } from "react";
import React from "react";
import{useEffect, useState} from "react";


class Tavaralista extends Component {

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
}

export default Tavaralista;