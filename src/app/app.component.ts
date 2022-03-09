import { Citta } from './citta';
import { Component } from '@angular/core';
import { MeteoService } from './meteo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cittade: string = ""; // nome città inserito nella form
  elencoChiamate: {citta: string, giorni: Citta[]}[] = []; // array di città interrogate dall'API
  
  constructor(private meteoservizio: MeteoService) {}

  ricercaCittade() { // funzione al click del bottone
    let rawobj: any; // qui memorizzo l'oggetto della prima chiamata all'API

    this.meteoservizio.grabCity(this.cittade).subscribe({ // prima chiamata API, prende l'id della città
      next: (risultato: any) => { rawobj = risultato[0] },
      error: () => { alert("!!!ERRORE DI CONNESSIONE!!!") },
      complete: () => { // chiama l'altra funzione che contiene la II chiamata API
        if (rawobj !== undefined) this.acchiappaGiorno(rawobj.woeid);
        else alert("City not found..");
      } 
    });

  }

  acchiappaGiorno(id: any) { // funzione chiamata al completamento della prima chiamata API
    let nomeGood = this.cittade[0].toUpperCase() + this.cittade.substring(1).toLowerCase();
    let oggi = new Date();
    let settimana: Citta[] = []; // qui ci salvo ogni giorno della settimana a chiamata
    // console.log(`${oggi.getFullYear()} ${oggi.getMonth()} ${oggi.getDate()}`); // il conto dei mesi parte da 0!

    for (let i=0; i<7; i++) { // chiama l'api per ogni giorno della settimana e lo inserisce in un array
      this.meteoservizio.grabDay(id, oggi.getFullYear(), oggi.getMonth()+1, oggi.getDate() + i)
      .subscribe({ // seconda chiamata API, prende le condizioni meterologiche
        next: (obj: any) => { 
          let data = obj[0].applicable_date.split("-"); // array con "anno - mese - giorno"
          settimana.push(new Citta(data[0], data[1], data[2], obj[0].weather_state_name, obj[0].weather_state_abbr)) 
        },
        error: () => { alert("!!!ERRORE DI CONNESSIONE!!!") },
        complete : () => {
          settimana.sort((privius, necst) => { // ad ogni fine chiamata riordina l'array per il giorno crescente 
            return privius.giorno - necst.giorno
          })}
      });
    }
    // console.log(this.settimana);
    this.elencoChiamate.push({citta: nomeGood, giorni: settimana});
    // console.log(this.elencoChiamate);
  }

  cancellaTab(ogg: any) {
    this.elencoChiamate.splice(this.elencoChiamate.indexOf(ogg), 1);
    // console.log(this.elencoChiamate);
  }
}
