import { Component } from "react";
import React from "react";
import { useEffect, useState } from "react";
import Create from "./Create";

class Tavaralistamuokkaus extends Component {

  constructor(props) {
    super(props);
    this.state = { nimi: '', hyllyid: '', lkm: '' };

    this.buttonClicked = this.buttonClicked.bind(this);
    this.buttonLisaaClicked = this.buttonLisaaClicked.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleShelfChange = this.handleShelfChange.bind(this);
    this.delete = this.delete.bind(this);
    //this.handleChangeinStock = this.handleChangeinStock.bind(this);
    //VILLE: yläpuolella olevaa handleChangeinStockia yritettiin koodata
    //siinä onnistumatta, tarkempaa tietoa alempana

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

  /*VILLE: Tässä on yritetty taulukossa näkyvillä + ja -  napeilla
    muuttaa tavaran lukumäärää PUT -metodilla. Yritimme "päivittää" koko tavaran kaikkine tietoineen,
    ilman että se poistuu hyllyltä, mutta aika loppui kesken, emme saaneet tätä muokkausta toimimaan.
    handleChangeinStock(event) {
    var id = event.target.id;
    var lkm = event.target.value;
    var nimi = event.target.nimi;
    var hyllyid = event.target.hyllyid;
    this.setState({ id: event.target.id });
    this.setState({ lkm: event.target.value });
    this.setState({ nimi: event.target.nimi });
    this.setState({ hyllyid: event.target.hyllyid });
    
    fetch('http://localhost:4000/tavarat/'+id, {
      method: 'PUT',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({id, lkm, nimi, hyllyid})

    }).then(() => {
      console.log('Varastosaldoa muutettu...');
    })
    this.fetchData();
  }*/

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
            <td><button onClick={this.handleChangeinStock} id={row.id} nimi={row.nimi} hyllyid={row.hyllyid} value={row.lkm + 1}>+</button></td>
            <td><button onClick={this.handleChangeinStock} id={row.id} value={row.lkm - 1}>-</button></td>
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
        content = "Annetuilla hakuehdoilla ei löytynyt tavaroita"
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

          <Create />

        </div>
        {content}


      </div>
    )
  }

}

export default Tavaralistamuokkaus;