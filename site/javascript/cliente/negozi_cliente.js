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
    quantiFilmNelCarrello()
})

//Mostro tutti i negozianti nell'apposito reparto
for (let i = 0; i < Negozianti_Registrati.length; i++) {
    const element = Negozianti_Registrati[i];
    document.getElementById("cardNegozianti").innerHTML += `
    <div class="card text-white bg-secondary mb-3" style="max-width: 18rem;">
        <div class="card-header"><h5>${element.nomeNegozio}</h5></div>
        <div class="card-body">
            <div class="text-left">
                <p><strong>Città :</strong> <span class="m-l-15"> ${element.città} , ${element.regione}
                <p><strong>Indirizzo :</strong> <span class="m-l-15"> ${element.indirizzo}
                <p><strong>Telefono :</strong> <span class="m-l-15"> ${element.telefono}
                <p><strong>Email :</strong> <span class="m-l-15">${element.email}</span></p>
                <p><strong>Film in vedinta :</strong> <span class="m-l-15"> ${element.filmVetrina.length}
            </div>
            <button class="btn btn-primary " data-toggle="modal" data-target="#modalDettagliNegozio" onclick="mostroFilmVetrina('${element.email}');" name="dettagliFilm">Dettagli Film</button> 
            <button class="btn btn-primary " style="margin-top: 1rem;" data-toggle="modal" data-target="#modalRecensioniNegozio" onclick="mostroRecensioni('${element.email}');" name="recensioni">Recensioni Negozio</button>
        </div> 
    </div> 
    `
}
function mostroFilmVetrina(emailVenditore) {
    for (let i = 0; i < Negozianti_Registrati.length; i++) {
        const element = Negozianti_Registrati[i];
        if (element.email == emailVenditore) {
            document.getElementById("filmDeiNegozi").innerHTML = ""
            var listaFilm = element.filmVetrina
            if (listaFilm.length > 0) {
                for (let j = 0; j < listaFilm.length; j++) {
                    var filmId = listaFilm[j].id;                  

                    getUrl(BASE_URL+"movie/" + filmId + "?api_key=" + APY_KEY + "&language=en-US", function(response){
                        var filmDeiNegozi = document.getElementById("filmDeiNegozi");
                        var title = response.title
                        var poster_path = response.poster_path
                        var vote_average = response.vote_average
                        var id = response.id
                        var film = {title, poster_path, vote_average, id}      //per ogni film prendo la sua immagine         
                        filmDeiNegozi.appendChild(cardFilmComprare(film, element.email, listaFilm[j].prezzoDiAcquisto, listaFilm[j].prezzoDiNoleggio))
                        disabilito(title, id)
                    })
                }
            } else {
                document.getElementById("filmDeiNegozi").innerHTML =  `<p style="color: oldlace;">Nessun film ancora in vendita</p>`
            }
            
        }
    }
}
function disabilito(title, id) {
    //Se il film è già nel carrello ne impedisco la vendita
    let listaDiv = document.getElementsByClassName(title);   
    for (let i = 0; i < Utente_Attivo.carrello.daAcquistare.length; i++) {
        const element = Utente_Attivo.carrello.daAcquistare[i].id;
        if (element == id) {   
            for (let j = 0; j < listaDiv.length; j++) {  
                listaDiv[j].innerHTML = `
                    <button style="margin-top: 3rem" data-toggle="modal" data-target="#modalAggiuntaAlCarrello" data-dismiss="modal" disabled="true" type="button" class="btn btn-secondary "><i class="fas fa-shopping-cart"></i> Film già nel carrello</button>                            
                `
            }
        }
    }
    for (let i = 0; i < Utente_Attivo.carrello.daNoleggiare.length; i++) {
        const element = Utente_Attivo.carrello.daNoleggiare[i].id;
        if (element == id) {   
            for (let j = 0; j < listaDiv.length; j++) {  
                listaDiv[j].innerHTML = `
                    <button style="margin-top: 3rem" data-toggle="modal" data-target="#modalAggiuntaAlCarrello" data-dismiss="modal" disabled="true" type="button" class="btn btn-secondary "><i class="fas fa-shopping-cart"></i> Film già nel carrello</button>                            
                `
            }
        }
    }
    for (let i = 0; i < Utente_Attivo.storico.filmNoleggiiati.length; i++) {
        const element = Utente_Attivo.storico.filmNoleggiiati[i].id;
        const data = Utente_Attivo.storico.filmNoleggiiati[i].scadenza;
        if (element == id && (((Date.now()-new Date(data).getTime()) / 1000 ) / 3600) < 72) {   
            for (let j = 0; j < listaDiv.length; j++) {  
                listaDiv[j].innerHTML = `
                    <button style="margin-top: 3rem" data-toggle="modal" data-target="#modalAggiuntaAlCarrello" data-dismiss="modal" disabled="true" type="button" class="btn btn-secondary "><i class="fas fa-shopping-cart"></i> Noleggio ancora valido</button>                            
                `
            }
        }
    }
    //Se il film è già stato venduto ne impedisco la vendita
    for (let i = 0; i < Utente_Attivo.storico.filmAcquistati.length; i++) {
        const filmId = Utente_Attivo.storico.filmAcquistati[i].id;
        if (filmId == id) {   
            for (let j = 0; j < listaDiv.length; j++) {  
                listaDiv[j].innerHTML = `
                    <button style="margin-top: 3rem" data-toggle="modal" data-target="#modalAggiuntaAlCarrello" data-dismiss="modal" disabled="true" type="button" class="btn btn-secondary "><i class="fas fa-shopping-cart"></i> Film già comprato</button>                            
                `
            }
        }
    }
}

function mostroRecensioni(email) {  
    document.getElementById("alert").style.display = "none";
    document.getElementById("formRecensione").style.display = "block";

    document.getElementById("formRecensione").innerHTML = `
        <div class="c4l-rating">
            <label for="titoloRecensione" class="form-label">Votazione</label><br>
            <input name="c4l-rating" type="radio" id="c4l-rate1" value="1" checked/>
            <label for="c4l-rate1"><i for="c4l-rate1" class="fas fa-star"></i> </label>
            <input name="c4l-rating" type="radio" id="c4l-rate2" value="2" />
            <label for="c4l-rate2"><i class="fas fa-star"></i> </label>
            <input name="c4l-rating" type="radio" id="c4l-rate3" value="3" />
            <label for="c4l-rate3"><i class="fas fa-star"></i> </label>
            <input name="c4l-rating" type="radio" id="c4l-rate4" value="4" />
            <label for="c4l-rate4"><i class="fas fa-star"></i> </label>
            <input name="c4l-rating" type="radio" id="c4l-rate5" value="5" />
            <label for="c4l-rate5"><i class="fas fa-star"></i> </label>
        </div>
        <div class="mb-3">
            <label for="titoloRecensione" class="form-label">Titolo</label>
            <input type="text" class="form-control" id="titoloRecensione">
        </div>
        <div class="mb-3">
            <label for="testoRecensione" class="form-label">Testo</label>
            <textarea class="form-control" id="testoRecensione" rows="3"></textarea>
        </div>
        <button type="button" class="btn btn-primary" id="inviaRecensione" >Invia Recensione</button>
    `
    
    document.getElementById('caroselloRecensioni').innerHTML = ""
    
    for (let i = 0; i < Negozianti_Registrati.length; i++) {
        const negozio = Negozianti_Registrati[i].email;
        if (email == negozio) {   
            if (Negozianti_Registrati[i].recensioni.length == 0) {
                document.getElementById("recensionidelnegozio").innerHTML = `<p style="color: oldlace;">Non ci sono ancora recensioni per questo negozio</p>`
            } else {
                Negozianti_Registrati[i].recensioni.forEach((recensione, idx) => {
                document.getElementById('caroselloRecensioni').appendChild(carouselRecensito(recensione, idx)) 
                })
            }
        }
    }

    document.getElementById("inviaRecensione").addEventListener('click', () => {
        var voto = document.querySelector('input[name="c4l-rating"]:checked').value
        var titolo = document.getElementById('titoloRecensione').value
        var testo = document.getElementById('testoRecensione').value
        for (let i = 0; i < Negozianti_Registrati.length; i++) {
            const negozio = Negozianti_Registrati[i].email;
            if (email == negozio) {   
                var recensione = {voto: Number(voto), titolo: titolo, testo: testo, emailUtente: Utente_Attivo.email}
                console.log(recensione)
                Negozianti_Registrati[i].recensioni.push(recensione)
                localStorage.setItem('Negozianti_Registrati',JSON.stringify(Negozianti_Registrati))
            }
        }
        document.getElementById("alert").style.display = "block";
        document.getElementById("formRecensione").style.display = "none"; 
    })
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