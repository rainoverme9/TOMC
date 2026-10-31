$(document).ready(() => {
    //Creo per ogni genere la lista dei filtri 
    getUrl(BASE_URL + "genre/movie/list?api_key=" + APY_KEY + "&language=en-US", function(response){
        console.log("generi: ", response);
        response.genres.forEach(genere => {                     
            const {id, name} = genere;
            document.getElementById("select_genere").innerHTML += `
                <option value="${id}">${name}</option>
            `
        });
    })
   
    document.getElementById("totaleSpesa").datavalue = 0.00
    //All'apertura del sito inserisce tutti i film da acquistare nel carrello
    if (Utente_Attivo.carrello.daAcquistare.length > 0) {
        for (let i = 0; i < Utente_Attivo.carrello.daAcquistare.length; i++) {
            const titolo = Utente_Attivo.carrello.daAcquistare[i].titolo
            const prezzo = Utente_Attivo.carrello.daAcquistare[i].prezzo
            aggiungiAcquisto(titolo, prezzo)
        }
    }
    //All'apertura del sito inserisce tutti i film da noleggiare nel carrello
    if (Utente_Attivo.carrello.daNoleggiare.length > 0) {
        for (let i = 0; i < Utente_Attivo.carrello.daNoleggiare.length; i++) {
          const titolo = Utente_Attivo.carrello.daNoleggiare[i].titolo
          const prezzo = Utente_Attivo.carrello.daNoleggiare[i].prezzo
            aggiungiNoleggio(titolo, prezzo)
        }  
    }
    quantiFilmNelCarrello()
})

//CARRELLO
//Indica se un film è disponibile in almeno un negozio
function modalNegozi(filmId) {
    var listaNegoziVendita = document.getElementById("listaNegoziVendita")
    listaNegoziVendita.innerHTML = ""
    for (venditore of Negozianti_Registrati) {
        index = venditore.filmVetrina.findIndex(film => film.id === filmId);
        if (index != -1) {
            listaNegoziVendita.innerHTML += `
                <div> ${venditore.nomeNegozio} </div>
                <div name="${filmId}">
                    <button data-toggle="modal" data-target="#modalAggiuntaAlCarrello" data-dismiss="modal"  type="button" class="btn btn-primary ${filmId}" onclick=" modalAcquisto('${filmId}', '${venditore.email}', '${venditore.filmVetrina[index].prezzoDiAcquisto}'), rendiNonDisponibile() " >Acquista | ${venditore.filmVetrina[index].prezzoDiAcquisto} €</button>                            
                    <button data-toggle="modal" data-target="#modalAggiuntaAlCarrello" data-dismiss="modal"  type="button" class="btn btn-success ${filmId}" onclick=" modalNoleggio('${filmId}', '${venditore.email}', '${venditore.filmVetrina[index].prezzoDiNoleggio}'), rendiNonDisponibile()">Noleggia | ${venditore.filmVetrina[index].prezzoDiNoleggio} €</button>                            
                </div>
                <br>
            `
        }
    }
    var provo = 0;
    for (let i = 0; i < Negozianti_Registrati.length; i++) {
        const element = Negozianti_Registrati[i].filmVetrina;
        const result = element.filter(gg => gg.id == filmId);
        if (result.length > 0) {
            provo += 1
        }
    }
    if (provo == 0) {
        listaNegoziVendita.innerHTML = "Film non disponibile in nessun Negozio";

    } 
}
function modalAcquisto(filmId, emailNegozio, prezzo) {
    getUrl(BASE_URL + "/movie/"+ filmId + "?api_key=" + APY_KEY + "&append_to_response=credits", function(response){
        var titolo = response.title;
        document.getElementById("posterAcquisto").innerHTML = ""; 
        document.getElementById("posterAcquisto").appendChild(fotoFilm(response));
        document.getElementById("titoloAcquisto").innerHTML = titolo;
        document.getElementById("card-text").innerHTML = response.tagline;
    
        var elementoCarrello = {titolo: titolo, id: filmId, emailNegozio: emailNegozio, prezzo: prezzo}

        var arrayFilmCarrelloAcquisto = Utente_Attivo.carrello.daAcquistare;
        arrayFilmCarrelloAcquisto.push(elementoCarrello);
        Utente_Attivo.carrello.daAcquistare = arrayFilmCarrelloAcquisto;
        localStorage.setItem("Utente_Attivo",JSON.stringify(Utente_Attivo));

        aggiungiAcquisto(titolo, prezzo);

        for (let i = 0; i < Clienti_Registrati.length; i++) {
            const element = Clienti_Registrati[i].email;
            if (Utente_Attivo.email == element) {
                Clienti_Registrati[i].carrello.daAcquistare = Utente_Attivo.carrello.daAcquistare;
                localStorage.setItem("Clienti_Registrati",JSON.stringify(Clienti_Registrati));
                break
            }
        }
    });
}
function aggiungiAcquisto(titolo, prezzo) {
    document.getElementById("elementiDaAcquistareNelCarrello").innerHTML += `
        <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
                <h6 class="my-0">${titolo}</h6>
                <small>Acquisto</small>
            </div>
            <span> ${prezzo} € <br> <i onclick="eliminaAcquisto('${titolo}','${prezzo}')" class="fas fa-trash-alt" style="color: #fba304;"></i></span>
        </li>
    `
    spesa()
    quantiFilmNelCarrello()
}
function eliminaAcquisto(titolo) {
    var arrayFilmCarrelloAcquisto = Utente_Attivo.carrello.daAcquistare;
    arrayFilmCarrelloAcquisto.forEach((id, idx) => {
        if(id.titolo == titolo){
            arrayFilmCarrelloAcquisto.splice(idx, 1);
        }
    })
    Utente_Attivo.carrello.daAcquistare = arrayFilmCarrelloAcquisto;
    localStorage.setItem("Utente_Attivo",JSON.stringify(Utente_Attivo));
    
    document.getElementById("elementiDaAcquistareNelCarrello").innerHTML = ""
    for (let i = 0; i < arrayFilmCarrelloAcquisto.length; i++) {
        const element = arrayFilmCarrelloAcquisto[i];
        aggiungiAcquisto(element.titolo, element.prezzo);
    }

    for (let i = 0; i < Clienti_Registrati.length; i++) {
        const element = Clienti_Registrati[i].email;
        if (Utente_Attivo.email == element) {
            Clienti_Registrati[i].carrello.daAcquistare = Utente_Attivo.carrello.daAcquistare;
            localStorage.setItem("Clienti_Registrati",JSON.stringify(Clienti_Registrati));
            break
        }
    }
    quantiFilmNelCarrello();
    presenzaAcquisti();
    spesa()
}
function modalNoleggio(filmId, emailNegozio, prezzo) {
    getUrl(BASE_URL + "/movie/"+ filmId + "?api_key=" + APY_KEY + "&append_to_response=credits", function(response){
        var titolo = response.title;
        document.getElementById("posterAcquisto").innerHTML = ""; 
        document.getElementById("posterAcquisto").appendChild(fotoFilm(response));
        document.getElementById("titoloAcquisto").innerHTML = titolo;
        document.getElementById("card-text").innerHTML = response.tagline;

        var elementoCarrello = {titolo: titolo, id: filmId, emailNegozio: emailNegozio, prezzo: prezzo}

        var arrayFilmCarrelloNoleggio = Utente_Attivo.carrello.daNoleggiare;
        arrayFilmCarrelloNoleggio.push(elementoCarrello);
        Utente_Attivo.carrello.daNoleggiare = arrayFilmCarrelloNoleggio;
        localStorage.setItem("Utente_Attivo",JSON.stringify(Utente_Attivo));

        aggiungiNoleggio(titolo, prezzo);

        for (let i = 0; i < Clienti_Registrati.length; i++) {
            const element = Clienti_Registrati[i].email;
            if (Utente_Attivo.email == element) {
                Clienti_Registrati[i].carrello.daNoleggiare = Utente_Attivo.carrello.daNoleggiare;
                localStorage.setItem("Clienti_Registrati",JSON.stringify(Clienti_Registrati));
                break
            }
        }
    });
}
function aggiungiNoleggio(titolo, prezzo) {
    document.getElementById("elementiDaNoleggiareNelCarrello").innerHTML += `
        <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
                <h6 class="my-0">${titolo}</h6>
                <small>Noleggio</small>
            </div>
            <span>${prezzo} € <br> <i onclick="eliminaNoleggio('${titolo}', '${prezzo}')" class="fas fa-trash-alt" style="color: #fba304;"></i></span>
        </li>
    `
    spesa()
    quantiFilmNelCarrello()
}
function eliminaNoleggio(titolo, prezzo) {
    var arrayFilmCarrelloNoleggio = Utente_Attivo.carrello.daNoleggiare;
    arrayFilmCarrelloNoleggio.forEach((id, idx) => {
        if(id.titolo == titolo){
            arrayFilmCarrelloNoleggio.splice(idx, 1);
        }
    })
    Utente_Attivo.carrello.daNoleggiare = arrayFilmCarrelloNoleggio;
    localStorage.setItem("Utente_Attivo",JSON.stringify(Utente_Attivo));

    document.getElementById("elementiDaNoleggiareNelCarrello").innerHTML = ""
    for (let i = 0; i < arrayFilmCarrelloNoleggio.length; i++) {
        const element = arrayFilmCarrelloNoleggio[i];
        aggiungiNoleggio(element.titolo, element.prezzo);
    }

    for (let i = 0; i < Clienti_Registrati.length; i++) {
        const element = Clienti_Registrati[i].email;
        if (Utente_Attivo.email == element) {
            Clienti_Registrati[i].carrello.daNoleggiare = Utente_Attivo.carrello.daNoleggiare;
            localStorage.setItem("Clienti_Registrati",JSON.stringify(Clienti_Registrati));
            break
        }
    }
    quantiFilmNelCarrello();
    presenzaAcquisti();
    spesa()
}
function rendiNonDisponibile() {
    document.getElementById("compraFilm").disabled = "true"
    document.getElementById("compraFilm").innerHTML = `<i class="fas fa-shopping-cart"></i> Film nel carrello `
}
function quantiFilmNelCarrello() {
    document.getElementById("iconNewCarrello").innerHTML = Utente_Attivo.carrello.daAcquistare.length + Utente_Attivo.carrello.daNoleggiare.length
    document.getElementById("numeroFilmCarrello").innerHTML = Utente_Attivo.carrello.daAcquistare.length + Utente_Attivo.carrello.daNoleggiare.length
}
function aggiungiPrezzo(prezzo) {
    var costo = parseFloat(document.getElementById("totaleSpesa").datavalue);
    costo += parseFloat(prezzo)
    document.getElementById("totaleSpesa").datavalue = costo;
    document.getElementById("totaleSpesa").innerHTML = costo + "€";
}
function togliPrezzo(prezzo) {
    var costo = parseFloat(document.getElementById("totaleSpesa").datavalue);
    costo = costo - parseFloat(prezzo)
    document.getElementById("totaleSpesa").datavalue = costo;
    document.getElementById("totaleSpesa").innerHTML = costo + "€";
}
function eliminaTuttiIFilm() {
    Utente_Attivo.carrello.daAcquistare = [];
    Utente_Attivo.carrello.daNoleggiare = [];
    localStorage.setItem("Utente_Attivo",JSON.stringify(Utente_Attivo));
    for (let i = 0; i < Clienti_Registrati.length; i++) {
        const element = Clienti_Registrati[i].email;
        if (Utente_Attivo.email == element) {
            Clienti_Registrati[i].carrello.daAcquistare = Utente_Attivo.carrello.daAcquistare;
            localStorage.setItem("Clienti_Registrati",JSON.stringify(Clienti_Registrati));
            break
        }
    }
    for (let i = 0; i < Clienti_Registrati.length; i++) {
        const element = Clienti_Registrati[i].email;
        if (Utente_Attivo.email == element) {
            Clienti_Registrati[i].carrello.daNoleggiare = Utente_Attivo.carrello.daNoleggiare;
            localStorage.setItem("Clienti_Registrati",JSON.stringify(Clienti_Registrati));
            break
        }
    }
    document.getElementById("presenzaAcquisti").innerHTML = "Nessun film nel carrello"
    document.getElementById("elementiDaAcquistareNelCarrello").innerHTML = ""
    document.getElementById("elementiDaNoleggiareNelCarrello").innerHTML = ""
    quantiFilmNelCarrello()
    document.getElementById("totaleSpesa").innerHTML = 0.00 + "€"
}
function presenzaAcquisti() {
    if (Utente_Attivo.carrello.daAcquistare.length == 0 && Utente_Attivo.carrello.daNoleggiare.length == 0) {
        document.getElementById("presenzaAcquisti").innerHTML = "Nessun film nel carrello"
    } else {
        document.getElementById("presenzaAcquisti").innerHTML = ""
    }
}
function spesa() {
    var costo = 0.0;
    for (let i = 0; i < Utente_Attivo.carrello.daAcquistare.length; i++) {
        const prezzo = parseFloat(Utente_Attivo.carrello.daAcquistare[i].prezzo);
        costo += prezzo
    }
    for (let i = 0; i < Utente_Attivo.carrello.daNoleggiare.length; i++) {
        const prezzo = parseFloat(Utente_Attivo.carrello.daNoleggiare[i].prezzo);
        costo += prezzo
    }
    document.getElementById("totaleSpesa").innerHTML = costo.toFixed(2) + "€";
}


//Aggiungo i film nello storico del profilo
function storico() {
    //ACQUISTO
    for (let i = 0; i < Utente_Attivo.carrello.daAcquistare.length; i++) {
        var filmId = Utente_Attivo.carrello.daAcquistare[i].id;

        //Se il film è già presente incremento la quantità
        const elementA = {titolo: Utente_Attivo.carrello.daAcquistare[i].titolo, id: Utente_Attivo.carrello.daAcquistare[i].id, emailNegozio: Utente_Attivo.carrello.daAcquistare[i].emailNegozio, prezzo: Utente_Attivo.carrello.daAcquistare[i].prezzo}
        var arrayFilmCarrelloStoricoAcquisto = Utente_Attivo.storico.filmAcquistati;
        arrayFilmCarrelloStoricoAcquisto.push(elementA);
        Utente_Attivo.storico.filmAcquistati = arrayFilmCarrelloStoricoAcquisto;
        localStorage.setItem("Utente_Attivo",JSON.stringify(Utente_Attivo));

       
        //Se il film è già presente incremento la quantità
        for (let j = 0; j < Negozianti_Registrati.length; j++) {
            const email =  Negozianti_Registrati[j].email;
            if (email == Utente_Attivo.carrello.daAcquistare[i].emailNegozio) {
                var arrayFilmStoricoAcquisti = Negozianti_Registrati[j].storico.Acquisti;
                var filmStorico = {id: Utente_Attivo.carrello.daAcquistare[i].id, titolo: Utente_Attivo.carrello.daAcquistare[i].titolo, quantità:1, prezzo: Utente_Attivo.carrello.daAcquistare[i].prezzo}
                if (arrayFilmStoricoAcquisti.length > 0) {
                    const result = arrayFilmStoricoAcquisti.filter(element => element.id == filmId);
                    if (result.length == 0) {
                        arrayFilmStoricoAcquisti.push(filmStorico);
                    } else {
                        for (let k = 0; k < arrayFilmStoricoAcquisti.length; k++) {
                            const id = arrayFilmStoricoAcquisti[k].id;
                            if (id == filmId) {
                                Negozianti_Registrati[j].storico.Acquisti[k].quantità += 1;
                                break
                            } 
                        } 
                    }
                } else {
                    arrayFilmStoricoAcquisti.push(filmStorico);
                }
                Negozianti_Registrati[j].storico.Acquisti = arrayFilmStoricoAcquisti;
                localStorage.setItem("Negozianti_Registrati",JSON.stringify(Negozianti_Registrati));
            }
        } 
    }

    //NOLEGGIO
    for (let i = 0; i < Utente_Attivo.carrello.daNoleggiare.length; i++) {
        var filmId = Utente_Attivo.carrello.daNoleggiare[i].id;

        //Se il film è già presente incremento la quantità
        const elementN = {titolo: Utente_Attivo.carrello.daNoleggiare[i].titolo, id: Utente_Attivo.carrello.daNoleggiare[i].id, emailNegozio: Utente_Attivo.carrello.daNoleggiare[i].emailNegozio, scadenza: new Date(), prezzo: Utente_Attivo.carrello.daNoleggiare[i].prezzo, quantità: 1}
        var arrayFilmCarrelloStoricoNoleggio = Utente_Attivo.storico.filmNoleggiiati;
        if (arrayFilmCarrelloStoricoNoleggio.length > 0) {
            const result = arrayFilmCarrelloStoricoNoleggio.filter(element => element.id == filmId);
            if (result.length == 0) {
                arrayFilmCarrelloStoricoNoleggio.push(elementN);
            } else {
                for (let j = 0; j < arrayFilmCarrelloStoricoNoleggio.length; j++) {
                    const id = arrayFilmCarrelloStoricoNoleggio[j].id;
                    if (id == filmId) {
                        Utente_Attivo.storico.filmNoleggiiati[j].quantità += 1;
                        Utente_Attivo.storico.filmNoleggiiati[j].scadenza = new Date();
                        break
                    } 
                } 
            }
        } else {
            arrayFilmCarrelloStoricoNoleggio.push(elementN);
        }
        Utente_Attivo.storico.filmNoleggiiati = arrayFilmCarrelloStoricoNoleggio;
        localStorage.setItem("Utente_Attivo",JSON.stringify(Utente_Attivo));

       
        for (let j = 0; j < Negozianti_Registrati.length; j++) {
            const email =  Negozianti_Registrati[j].email;
            if (email == Utente_Attivo.carrello.daNoleggiare[i].emailNegozio) {
                var arrayFilmStoricoNoleggi = Negozianti_Registrati[j].storico.Noleggii;
                var filmStorico = {id: Utente_Attivo.carrello.daNoleggiare[i].id, titolo: Utente_Attivo.carrello.daNoleggiare[i].titolo, emailCliente: Utente_Attivo.email, quantità: 1, scadenza: new Date(), verificato: false, prezzo: Utente_Attivo.carrello.daNoleggiare[i].prezzo}
                arrayFilmStoricoNoleggi.push(filmStorico);
                Negozianti_Registrati[j].storico.Noleggii = arrayFilmStoricoNoleggi;
                localStorage.setItem("Negozianti_Registrati",JSON.stringify(Negozianti_Registrati));
            }
        } 
    }

    //CLIENTI
    for (let i = 0; i < Clienti_Registrati.length; i++) {
        const element = Clienti_Registrati[i].email;
        if (Utente_Attivo.email == element) {
            Clienti_Registrati[i].storico.filmAcquistati = Utente_Attivo.storico.filmAcquistati;
            Clienti_Registrati[i].storico.filmNoleggiiati = Utente_Attivo.storico.filmNoleggiiati;
            localStorage.setItem("Clienti_Registrati",JSON.stringify(Clienti_Registrati));
        }
    }
    eliminaTuttiIFilm()
}



//Inserisco i nomi nel carrello in modo tale da facilitare l'utente
const formPagamento = document.querySelectorAll('.needs-validation2');
const nome = document.getElementById("nome");
nome.setAttribute("value", Utente_Attivo.nome);
const cognome = document.getElementById("cognome");
cognome.setAttribute("value", Utente_Attivo.cognome);
const email = document.getElementById("email");
email.setAttribute("value", Utente_Attivo.email);
const regione = document.getElementById("regione");
regione.value = Utente_Attivo.regione;
const città = document.getElementById("città");
città.value = Utente_Attivo.città;
const indirizzo = document.getElementById("indirizzo");
indirizzo.setAttribute("value", Utente_Attivo.indirizzo);

if (Utente_Attivo.metodoPagamento == "pagmentoConVisa") {
    document.getElementById("labelPagamento").innerHTML = ` <img src="https://img.icons8.com/color/50/000000/visa.png"/>  ` 
} else {
    document.getElementById("labelPagamento").innerHTML = `<img src="https://img.icons8.com/color/48/000000/mastercard.png"/> ` 
}

//Prima di pagare controllo se ha inserito il numero della carta
(function () {
    'use strict'
Array.prototype.slice.call(formPagamento)
    .forEach(function (form) {
        form.addEventListener('submit', event => {
        event.preventDefault();

    	const numeroCarta = document.getElementById("numeroCarta").value.trim();
    	const cartaValida = /^[0-9]{16}$/.test(numeroCarta);

	form.classList.add('was-validated');

    	if (!form.checkValidity() || !cartaValida) {
	    return;
    	}

    	storico();
    	alert("Pagamento completato con successo!");
    });
    })
})()
