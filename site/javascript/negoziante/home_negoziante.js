$(document).ready(() => {
    spostoScadenze();
    //Prendo i generi dei film e li inserisco nella ricerca
    getUrl(BASE_URL + "genre/movie/list?api_key=" + APY_KEY + "&language=en-US", function(response){
        console.log("generi: ", response);
        response.genres.forEach(genere => {                     
        const {id, name} = genere;
        document.getElementById("select_genere").innerHTML += `
            <option value="${id}">${name}</option>
        `
        });

    })

    //Informazioni del negozio
    document.getElementById("salutoUtente").innerHTML += Utente_Attivo.nomeNegozio + "!"
    document.getElementById("infoNegoziante").innerHTML = `
        <p><strong>Negozio :</strong> <span class="m-l-15">${Utente_Attivo.nomeNegozio}</span></p>
        <p><strong>Email :</strong> <span class="m-l-15">${Utente_Attivo.email}</span></p>
        <p><strong>Telefono :</strong> <span class="m-l-15"> ${Utente_Attivo.telefono}</span></p>
        <p><strong>Regione :</strong> <span class="m-l-15"> ${Utente_Attivo.regione}</span></p>
        <p><strong>Citta :</strong> <span class="m-l-15"> ${Utente_Attivo.città}</span></p>
        <p><strong>Indirizzo :</strong> <span class="m-l-15"> ${Utente_Attivo.indirizzo} </span></p>
        <p><strong>Film in vetrina :</strong> <span class="m-l-15" id="nFilmVetrina"> ${Utente_Attivo.filmVetrina.length} </span></p>         
    `

    //Stampo la vetrina
    stampoFilmVetrina()

    var arr = [];
    //Stampo i vari Film acquistati dal negozio
    document.getElementById("caroselloAcquistati").innerHTML = "";
    if (Utente_Attivo.storico.Acquisti.length > 0) {
        for (let i = 0; i < Utente_Attivo.storico.Acquisti.length; i++) {
            const filmId = Utente_Attivo.storico.Acquisti[i].id;
            getUrl(BASE_URL+"movie/" + filmId + "?api_key=" + APY_KEY + "&language=en-US", function(response){
                var title = response.title
                var poster_path = response.poster_path
                var vote_average = response.vote_average
                var id = response.id
                var film = {title, poster_path, vote_average, id}      //per ogni film prendo la sua immagine
                if (Utente_Attivo.storico.Acquisti[i].quantità > 1) {
                    document.getElementById("caroselloAcquistati").appendChild((cardFilmQuantita(film, Utente_Attivo.storico.Acquisti[i].quantità)))
                }  else {
                    document.getElementById("caroselloAcquistati").appendChild((cardFilm(film)))
                }
            })
           arr.push(Utente_Attivo.storico.Acquisti[i].quantità) 
        }
    } else {
        document.getElementById("caroselloAcquistati").innerHTML = `<p style="margin-left: 1rem;"> Nessun film acquistato </p>`
    } 
    quantiFilmVenduti()
    scadenza()
    stampoStoricoNoleggi()
    guadagno()
    mostroRecensioni()
})

//VETRINA DEL NEGOZIO
function stampoFilmVetrina() {
    var arrayFilmVetrina = Utente_Attivo.filmVetrina;
    if (arrayFilmVetrina.length == 0) {
        document.getElementById("divLaMiaVetrina").innerHTML = `<p style="margin-left: 1rem;"> Nessun film in vendita</p>`
    } else {
        document.getElementById("divLaMiaVetrina").innerHTML = ""
        for (let i = 0; i < arrayFilmVetrina.length; i++) {
            const filmId = arrayFilmVetrina[i].id;
            const prezzo_acquisto = arrayFilmVetrina[i].prezzoDiAcquisto;
            const prezzo_noleggio = arrayFilmVetrina[i].prezzoDiNoleggio;
            getUrl(BASE_URL+"movie/" + filmId + "?api_key=" + APY_KEY + "&language=en-US", function(response) {
                var title = response.title
                var poster_path = response.poster_path
                var vote_average = response.vote_average
                var id = response.id
                var film = {title, poster_path, vote_average, id}      
                document.getElementById("divLaMiaVetrina").appendChild((cardFilmAcquisto(film, prezzo_acquisto, prezzo_noleggio)))
            });
        }
    }
    document.getElementById("nFilmVetrina").innerHTML = Utente_Attivo.filmVetrina.length;
}
function eliminaDaVetrina(filmId) {
    var eliminavetrina = document.getElementById("eliminavetrina");
    eliminavetrina.addEventListener('click', () => {
        var arrayFilmVetrina = Utente_Attivo.filmVetrina;

        arrayFilmVetrina.forEach((id, idx) => {
            id = Utente_Attivo.filmVetrina[idx].id
            if(id == filmId){
            arrayFilmVetrina.splice(idx, 1);
                Utente_Attivo.filmVetrina = arrayFilmVetrina;
                localStorage.setItem("Utente_Attivo",JSON.stringify(Utente_Attivo));
            }
        })
        stampoFilmVetrina()
    
        for (let i = 0; i < Negozianti_Registrati.length; i++) {
            const email = Negozianti_Registrati[i].email;
            if (email == Utente_Attivo.email) {
                Negozianti_Registrati[i].filmVetrina = Utente_Attivo.filmVetrina;
                localStorage.setItem("Negozianti_Registrati",JSON.stringify(Negozianti_Registrati));
                break  
            }
        }
    })
}

//MODIFICA PREZZO 
function modificaPrezzo(filmId) {
    tolgoErrore(document.getElementById("inputDecinePrezzoAcquisto"));
    tolgoErrore(document.getElementById("inputDecimaliPrezzoAcquisto"));
    tolgoErrore(document.getElementById("inputDecinePrezzoNoleggio"));
    tolgoErrore(document.getElementById("inputDecimaliPrezzoNoleggio"));

    getUrl(BASE_URL + "/movie/"+ filmId + "?api_key=" + APY_KEY + "&append_to_response=credits", function(response){
        var titolo = response.title;
        document.getElementById("exampleModalLabel").innerHTML = "Modifica i Prezzi"
        document.getElementById("posterAcquisto").innerHTML = ""; 
        document.getElementById("posterAcquisto").appendChild(fotoFilm(response));
        document.getElementById("titoloAcquisto").innerHTML = titolo;
    });
  
    document.getElementById("bottoneVendita").innerHTML = ` 
        <button type="button" class="btn btn-primary" id="btnModificaPrezzo" >Modifica i prezzi</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Annulla</button>
    `
    
    document.getElementById("btnModificaPrezzo").addEventListener("click", () => {
        aggiornamentoPrezzi(filmId)
    }) 
}
function aggiornamentoPrezzi(filmId) {
    const decineAcquisto = document.getElementById("inputDecinePrezzoAcquisto").value
    const decimaliAcquisto = document.getElementById("inputDecimaliPrezzoAcquisto").value
    const decineNoleggio = document.getElementById("inputDecinePrezzoNoleggio").value
    const decimaliNoleggio = document.getElementById("inputDecimaliPrezzoNoleggio").value

    var p = parseFloat(decineAcquisto + "." + decimaliAcquisto);
    var l = parseFloat(decineNoleggio  + "." + decimaliNoleggio);
    
    console.log(p, l)

    if (decineAcquisto == "" || decimaliAcquisto == "" || decineNoleggio == "" || decimaliNoleggio == "") {
        messaggioErrorePrezzi(decineAcquisto, decimaliAcquisto, decineNoleggio, decimaliNoleggio);
        //alert("Inserisci un prezzo adeguato")
    } else {
        document.getElementById("btnModificaPrezzo").setAttribute("data-dismiss", "modal");
        for (let i = 0; i < Utente_Attivo.filmVetrina.length; i++) {
            const element = Utente_Attivo.filmVetrina[i];
            console.log(element, "element")
            if (element.id == filmId) {
                element.prezzoDiAcquisto = p.toFixed(2);
                element.prezzoDiNoleggio = l.toFixed(2); 
                localStorage.setItem("Utente_Attivo",JSON.stringify(Utente_Attivo));
            }            
        }
        
        stampoFilmVetrina()
    
        for (let i = 0; i < Negozianti_Registrati.length; i++) {
            const email = Negozianti_Registrati[i].email;
            if (email == Utente_Attivo.email) {
                Negozianti_Registrati[i].filmVetrina = Utente_Attivo.filmVetrina;
                localStorage.setItem("Negozianti_Registrati",JSON.stringify(Negozianti_Registrati));
                break  
            }
        }
    }
}
function inserisciVecchiPrezzi(filmId) {  
    Utente_Attivo.filmVetrina.forEach((element) => {
        if(element.id == filmId){
            var dividoA = (element.prezzoDiAcquisto.toString()).split('.');
            var dividoN = (element.prezzoDiNoleggio.toString()).split('.');
            document.getElementById("inputDecinePrezzoAcquisto").value = dividoA[0];
            document.getElementById("inputDecimaliPrezzoAcquisto").value = dividoA[1];
            document.getElementById("inputDecinePrezzoNoleggio").value = dividoN[0];
            document.getElementById("inputDecimaliPrezzoNoleggio").value = dividoN[1];
        }
    })
}


//GESTIONE DEI NOLEGGI ATTIVI E SCADUTI
function scadenza() {
    document.getElementById("caroselloNoleggiati").innerHTML = "";
    document.getElementById("scadenzeFilmNoleggiati").innerHTML = "";

    for (let i = 0; i < Utente_Attivo.storico.Noleggii.length; i++) {
        const data =  Utente_Attivo.storico.Noleggii[i].scadenza;
        const titolo =  Utente_Attivo.storico.Noleggii[i].titolo;
        const emailCliente = Utente_Attivo.storico.Noleggii[i].emailCliente;

        var scadenza = new Date(data)
        scadenza.setDate(scadenza.getDate() + 3); //Scadenza 3 giorni dopo

        if ((((Date.now()-new Date(data).getTime()) / 1000 ) / 3600) < 72) {  
            var inserisco = "Il " + scadenza.toLocaleDateString() + "  alle " + scadenza.toLocaleTimeString();
            document.getElementById("scadenzeFilmNoleggiati").innerHTML += `
            <div class="inbox-item">
            <h6 class="inbox-item-author" style="margin-left: 0;"> ${titolo}</h6>
            <div style="display: flex; justify-content: space-between;"> <p> ${inserisco} </p> <p>${emailCliente} </p> </div>
            </div>
            `
        }
    }    
}
function spostoScadenze() {
    var arrayNoleggiScaduti = Utente_Attivo.storico.noleggiScaduti;
    
    //Itero sui film noleggiati, se hanno un Id già presente incremento la quantità se sono già stati verificati allora non faccio nulla
    var prova =  Utente_Attivo.storico.Noleggii;
    for (let i = 0; i < prova.length; i++) {
        const filmId = prova[i].id;
        const titolo = prova[i].titolo;
        var filmDaAggiungere = {id: filmId, titolo: titolo, quantità: 1, prezzo: prova[i].prezzo}  
        if (arrayNoleggiScaduti.length > 0) {
            const filmDiversi = arrayNoleggiScaduti.filter(element => element.id == filmId);
            if (filmDiversi.length == 0) {
                arrayNoleggiScaduti.push(filmDaAggiungere);
                prova[i].verificato = true;
            } else if  (filmDiversi.length > 0 && prova[i].verificato == false) {
                for (let j = 0; j < arrayNoleggiScaduti.length; j++) {
                    const id = arrayNoleggiScaduti[j].id;
                    if (id == filmId) {
                        arrayNoleggiScaduti[j].quantità += 1;
                        prova[i].verificato = true;
                        break
                    } 
                }
            }
        } else {
            arrayNoleggiScaduti.push(filmDaAggiungere);
            prova[i].verificato = true;
        }
        Utente_Attivo.noleggiScaduti = arrayNoleggiScaduti;
        localStorage.setItem("Utente_Attivo",JSON.stringify(Utente_Attivo));
    }

    //Rimuovo i noleggi scaduti dai noleggi attivi
    const noleggiAttivi = Utente_Attivo.storico.Noleggii.filter(element => (((Date.now()-new Date(element.scadenza).getTime()) / 1000 ) / 3600) < 72);
    Utente_Attivo.storico.Noleggii = noleggiAttivi;
    localStorage.setItem("Utente_Attivo",JSON.stringify(Utente_Attivo))


    //Se il film è già presente incremento la quantità    
    for (let i = 0; i < Negozianti_Registrati.length; i++) { 
        const email =  Negozianti_Registrati[i].email;          
        if (email == Utente_Attivo.email) {               
            Negozianti_Registrati[i].storico.noleggiScaduti = Utente_Attivo.storico.noleggiScaduti;  
            Negozianti_Registrati[i].storico.Noleggii = Utente_Attivo.storico.Noleggii;            
            localStorage.setItem("Negozianti_Registrati",JSON.stringify(Negozianti_Registrati));           
        }      
    }    
    
}
function stampoStoricoNoleggi(){
    document.getElementById("caroselloNoleggiati").innerHTML = "";
    if (Utente_Attivo.storico.noleggiScaduti.length > 0) {
        for (let i = 0; i < Utente_Attivo.storico.noleggiScaduti.length; i++) {
            const filmId = Utente_Attivo.storico.noleggiScaduti[i].id;
            getUrl(BASE_URL+"movie/" + filmId + "?api_key=" + APY_KEY + "&language=en-US", function(response){
                var title = response.title
                var poster_path = response.poster_path
                var vote_average = response.vote_average
                var id = response.id
                var film = {title, poster_path, vote_average, id}      //per ogni film prendo la sua immagine
                if (Utente_Attivo.storico.noleggiScaduti[i].quantità > 1) {
                    document.getElementById("caroselloNoleggiati").appendChild((cardFilmQuantita(film, Utente_Attivo.storico.noleggiScaduti[i].quantità)))
                }  else {
                    document.getElementById("caroselloNoleggiati").appendChild((cardFilm(film)))
                }
            })
        }   
    } else {
        document.getElementById("caroselloNoleggiati").innerHTML = `<p style="margin-left: 1rem;"> Nessun film noleggiato </p>`
    } 
}
function quantiFilmVenduti() {
    var totA = 0
    for (let i = 0; i < Utente_Attivo.storico.Acquisti.length; i++) {
        const element = Utente_Attivo.storico.Acquisti[i].quantità;
        totA += element
    }
    var totN = 0
    for (let i = 0; i < Utente_Attivo.storico.noleggiScaduti.length; i++) {
        const element = Utente_Attivo.storico.noleggiScaduti[i].quantità;
        totN += element
    }
    document.getElementById("ottenuti").innerHTML = totA + totN;
    document.getElementById("acquistati").innerHTML = totA;
    document.getElementById("noleggiati").innerHTML = totN;
}
function guadagno() {
    var tot = 0.00;
    for (let i = 0; i < Utente_Attivo.storico.Acquisti.length; i++) {
        const quanti = parseFloat(Utente_Attivo.storico.Acquisti[i].quantità)
        const prezzo = parseFloat(Utente_Attivo.storico.Acquisti[i].prezzo)
        tot += (quanti*prezzo)
    }
    for (let i = 0; i < Utente_Attivo.storico.Noleggii.length; i++) {
        const prezzo = parseFloat(Utente_Attivo.storico.Noleggii[i].prezzo)
        tot += prezzo
    }
    for (let i = 0; i < Utente_Attivo.storico.noleggiScaduti.length; i++) {
        const quanti = parseFloat(Utente_Attivo.storico.noleggiScaduti[i].quantità )
        const prezzo = parseFloat(Utente_Attivo.storico.noleggiScaduti[i].prezzo)
        tot += (quanti*prezzo)
    }
    document.getElementById("guadagno").innerHTML = "Guadagno: " + tot.toFixed(2) + " €";
}

function mostroRecensioni() {       
    if (Utente_Attivo.recensioni.length == 0) {
        document.getElementById("recensionidelnegozio").innerHTML = `<p style="color: oldlace;">Non ci sono ancora recensioni </p>`
    } else {
        Utente_Attivo.recensioni.forEach((recensione, idx) => {
        document.getElementById('caroselloRecensioni').appendChild(carouselRecensito(recensione, idx)) 
        })
    }
}
function carouselRecensito(recensione, idx) {
    var backdropCarosello = document.createElement('div');
    backdropCarosello.classList.add('carousel-item');
    if (idx == 0) {
        backdropCarosello.className = "carousel-item active";
    } 
    backdropCarosello.innerHTML = `
        <table class="table table-borderless" style="color: oldlace">
            <tbody>
                <tr>
                    <th scope="row">Autore:</th>
                    <td>${recensione.emailUtente}</td>
                </tr>
                <tr>
                    <th scope="row">Voto:</th>
                    <td>${ratingstar(recensione)}</td>
                </tr>
                <tr>
                    <th scope="row">Titolo</th>
                    <td colspan="2">${recensione.titolo}</td>
                </tr>
                <tr>
                    <th scope="row">Titolo</th>
                    <td colspan="2">${recensione.testo}</td>
                </tr>
            </tbody>
        </table>
    `
   
    return backdropCarosello
}
function ratingstar(recensione) {
    var rating =''
    for ( i=1 ; i<=recensione.voto; i++){
        rating += `<i class="fas fa-star"></i>`
    }
    for (let i = 0; i < (5-recensione.voto); i++) {
        rating += `<i class="far fa-star"></i>`
    }
    return rating
}