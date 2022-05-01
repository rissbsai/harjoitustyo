import React, { useState, useEffect } from 'react';

function Tavaralista(props) {

    const [tavaraLista, setTavaraLista] = useState([]);
    const [name, setName] = useState("");
    const [shelfNo, setShelfNo] = useState("");
    const [Loaded, setLoaded] = useState(false);
    
    //tällä errorilla voi HALUTESSAAN testata fetchiä,
    //esim laittamalla hakuun väärän polun (esim. tavarat --> tyypit)
    const [error, setError] = useState(null);
    
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:4000/tavarat?nimi_like=" + name + "&hyllyid_like=" + shelfNo);
            const json = await response.json();
            console.log(json, response);
            //jos vastaus ok, asetetaan haettu data
            //muutoin tulostetaan "virhe"
            if (response.ok) {
              setTavaraLista(json);
            } else {
              setError("Tapahtui virhe");
            }
            setLoaded(true);
          } catch (error) {
            setLoaded(true);
            setError(error);
            console.log("virhe", error);
          }
    }

    const searchDb = (e) => {
        setLoaded(false);
        fetchData();
    }

    return (
        <table>
          <tbody>
            <tr>
              <th>
                <h1>Varaston tavarat</h1>
              </th>
            </tr>
            <tr>
              <th>
                <input
                  name="nimi"
                  type="text"
                  placeholder="Etsi tavaraa nimellä"
                  onChange={e => setName(e.target.value)}
                ></input><br />
                <input
                  name="hyllyid"
                  type="text"
                  placeholder="Etsi tavaraa hyllynumerolla"
                  onChange={e => setShelfNo(e.target.value)}
                ></input><br />
                <button onClick={searchDb}>Etsi tavara</button>
              </th>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th>Tavaran id</th>
              <th>Nimi</th>
              <th>Hyllynumero</th>
            </tr>
            {error ? (
              <tr>
                <td colSpan="10">{error}</td>
              </tr>
            ) : !Loaded ? (
              <tr>
                <td width="100%" colSpan="10">
                  Haetaan varastosaldoa...
                </td>
              </tr>
            ) : tavaraLista.length > 0 ? (
                tavaraLista.map((tavara) => 
                    <tr
                    key={tavara.id}
                    >
                    <td>{tavara.id}</td>
                    <td>{tavara.nimi}</td>
                    <td>{tavara.hyllyid}</td>
                  </tr>
                ))
              : (
                <tr>
                  <td width="100%" colSpan="10">
                    Annetuilla hakuehdoilla ei löytynyt tavaroita.
                  </td>
                </tr>
                )}
          </tbody>
        </table>
      );
    }
    
    export default Tavaralista;

