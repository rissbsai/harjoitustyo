import { useState } from "react";

 const Create = () =>  {
    const [nimi, setNimi] = useState('');
    const [lkm, setLkm] = useState('');
    const [hyllyid, setHyllyid] = useState('');

    //VILLE: Tavaraa lisätessä, täytyy lukumäärä-alasvetovalikosta klikata ensin valinta --> 2
    //ja sitten taas --> 1, jotta tavaran saa tallennettu/hyllynumeron valinta aktivoituu.
    //Lisäksi, lisättyäsi tavaran, täytyy sivu päivittää tai "Etsiä tavarat" uudelleen
    //jotta saat lisäämäsi tavaran taulukkoon. Meillä loppui aika kesken, ei ehdittu koodata tänne
    //taulukon uudelleen lataamista lisäyksen jälkeen.
    const handleSubmit = (e) => { 
        e.preventDefault();
        const tavara = {nimi, hyllyid, lkm};

         fetch ('http://localhost:4000/tavarat', {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify(tavara)
    
        }).then(() =>{
            console.log('Uusi tavara lisätty');
        })
    }

    return (
        <div className="create">
            <h5>Lisää uusi tavara</h5>
            <form onSubmit={handleSubmit}>
                <label>Tavaran nimi</label><br></br>
                <input type="text" required value={nimi} onChange={(e) =>setNimi(e.target.value)}></input><br></br>
                <label>Lukumäärä</label><br></br>
                <input type="text" required value={lkm} onChange={(e) =>setLkm(e.target.value)}></input><br></br>
                <label>Hyllynumero</label><br></br>
                <select value={hyllyid} onChange={(e) =>setHyllyid(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select><br></br>
                <button>Lisää tavara</button>
            </form>

        </div>
    )
}

export default Create;