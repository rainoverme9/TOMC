/*LOCAL STORAGE*/
const Utente_Attivo = JSON.parse(localStorage.getItem('Utente_Attivo'));
const Negozianti_Registrati = JSON.parse(localStorage.getItem('Negozianti_Registrati'));
const Clienti_Registrati = JSON.parse(localStorage.getItem('Clienti_Registrati'));
const Utenti_Registrati = JSON.parse(localStorage.getItem('Utenti_Registrati'));

//Bottone Tornasu
var btn = $('#buttonTornaSu');
$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});
btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});


/* API */
const BASE_URL = "https://api.themoviedb.org/3/";
const APY_KEY = "91e866ba975e0d508ea55611f0c27d2a";

//Funzione generale per richiamare le API
function getUrl(url, callback) {                        //prendo un url e restituisco una funzione che determina cosa fare con la risposta ottenuta
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true); 
    xhr.responseType = 'json';

    xhr.onload = function() {                           //cosa fa la funzione quando ottengo la risposta
    if (xhr.status<200 || xhr.status>299) {
        return window.location.assign('../../pagineDelSito/cliente/404page.html');    //se ci sono problemi restituisce mex di errore
    }
    callback(xhr.response);
    };

    xhr.send(); 
}


//LOCANDINE DEI FILM
//Funzioni che restituiscono card e attori in base o meno alla presenza delle foto
function cardFilm(film) {
    const {title, poster_path, vote_average, id} = film;
    var card = document.createElement('div');
    card.classList.add("card2");               
    if(poster_path) {          
        card.innerHTML = `
            <div class="card__img lazyloaded">
                <img class="lazyload" onclick="openInfoFilm(${id}), aggiungofilm(${id})" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}">
            </div> 
            <h2 class="card__name">${title}</h2>
            <div class="card__rating">
                <div class="card__stars">
                    <div style="width: 80%;">
                        Voto utenti:
                    </div>
                </div>
                <div class="card__vote">
                    ${vote_average}
                </div>
            </div>
        `
    } else {
        card.innerHTML = `
            <div class="card__img lazyloaded" onclick="openInfoFilm(${id}), aggiungofilm(${id})"  style="background-color: #202124 ">
                <span ><i class="fas fa-image" style="color: grey, font-size: 36px"></i></span>
            </div>  
            <h2 class="card__name">${title}</h2>
            <div class="card__rating">
                <div class="card__stars">
                    <div name=${id} style="width: 80%;">
                        *****
                    </div>
                </div>
                <div class="card__vote">
                    ${vote_average}
                </div>
            </div>
        `
    }
    return card;
}
function cardFilmComprare(film, email, prezzo_acquisto, prezzo_noleggio) {
    const {title, poster_path, vote_average, id} = film;
    var card = document.createElement('div');
    card.classList.add("card2");               
    if(poster_path) {          
        card.innerHTML = `
            <div class="card__img lazyloaded">
                <img class="lazyload" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}">
            </div> 
            <h2 class="card__name">${title}</h2>
            <div class="card__rating" style="margin-bottom: 0">
                <div class="card__stars">
                    <div style="width: 80%;">
                        Voto utenti:
                    </div>
                </div>
                <div class="card__vote">
                    ${vote_average}
                </div>
            </div>
            <div style="display: flex; justify-content: space-around; flex-direction: column; align-items: stretch;" class="${title}" >
                <button style="margin-top: 1rem"  data-toggle="modal" data-target="#modalAggiuntaAlCarrello" data-dismiss="modal"  type="button" class="btn btn-primary ${title}" onclick="modalAcquisto('${id}', '${email}','${prezzo_acquisto}');">Acquista | ${prezzo_acquisto} €</button>                            
                <button style="margin-top: 1rem;margin-bottom: 2rem;" data-toggle="modal" data-target="#modalAggiuntaAlCarrello" data-dismiss="modal"  type="button" class="btn btn-success ${title}" onclick="modalNoleggio('${id}', '${email}', '${prezzo_noleggio}')">Noleggia | ${prezzo_noleggio} €</button>                            
            </div>
        `
    } else {
        card.innerHTML = `
            <div class="card__img lazyloaded" style="background-color: #202124 ">
                <span ><i class="fas fa-image" style="color: grey, font-size: 36px"></i></span>
            </div>  
            <h2 class="card__name">${title}</h2>
            <div class="card__rating" style="margin-bottom: 0">
                <div class="card__stars">
                    <div style="width: 80%;">
                        Voto utenti:
                    </div>
                </div>
                <div class="card__vote">
                    ${vote_average}
                </div>
            </div>
            <div style="display: flex; jjustify-content: space-around;" class="${title}">
                <button style="margin-top: 1rem" data-toggle="modal" data-target="#modalAggiuntaAlCarrello" data-dismiss="modal"  type="button" class="btn btn-primary ${title}" onclick="modalAcquisto('${id}, '${email}', '${prezzo_acquisto}')">Acquista</button>                            
                <button style="margin-top: 1rem;margin-bottom: 2rem;" data-toggle="modal" data-target="#modalAggiuntaAlCarrello" data-dismiss="modal"  type="button" class="btn btn-success ${title}" onclick="modalNoleggio('${id}, '${email}', '${prezzo_noleggio}')">Noleggia</button>                            
            </div>
        `
    }
    
    return card;
}
function cardFilmNoleggioScaduto(film) {
    const {title, poster_path, vote_average, id} = film;
    var card = document.createElement('div');
    card.classList.add("card2");               
    if(poster_path) {          
        card.innerHTML = `
            <div class="ribbon2 ribbon-primary">Scaduto</div>
            <div class="card__img lazyloaded">
                <img class="lazyload" onclick="openInfoFilm(${id}), aggiungofilm(${id})" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}">
            </div> 
            <h2 class="card__name">${title}</h2>
            <div class="card__rating">
                <div class="card__stars">
                    <div style="width: 80%;">
                        Voto utenti:
                    </div>
                </div>
                <div class="card__vote">
                    ${vote_average}
                </div>
            </div>
        `
    } else {
        card.innerHTML = `
            <div class="ribbon3 ribbon-primary">n 3</div>
            <div class="ribbon2 ribbon-primary">Scaduto</div>
            <div class="card__img lazyloaded" onclick="openInfoFilm(${id}), aggiungofilm(${id})"  style="background-color: #202124 ">
                <span ><i class="fas fa-image" style="color: grey, font-size: 36px"></i></span>
            </div>  
            <h2 class="card__name">${title}</h2>
            <div class="card__rating">
                <div class="card__stars">
                    <div style="width: 80%;">
                    Voto utenti:
                    </div>
                </div>
                <div class="card__vote">
                    ${vote_average}
                </div>
            </div>
        `
    }
    return card;
}
function cardFilmNoleggioScadutoQuantita(film, quantità) {
    const {title, poster_path, vote_average, id} = film;
    var card = document.createElement('div');
    card.classList.add("card2");               
    if(poster_path) {          
        card.innerHTML = `
            <div class="ribbon3 ribbon-primary">X ${quantità}</div>
            <div class="ribbon2 ribbon-primary">Scaduto</div>
            <div class="card__img lazyloaded">
                <img class="lazyload" onclick="openInfoFilm(${id}), aggiungofilm(${id})" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}">
            </div> 
            <h2 class="card__name">${title}</h2>
            <div class="card__rating">
                <div class="card__stars">
                    <div style="width: 80%;">
                        Voto utenti:
                    </div>
                </div>
                <div class="card__vote">
                    ${vote_average}
                </div>
            </div>
        `
    } else {
        card.innerHTML = `
            <div class="ribbon3 ribbon-primary">n 3</div>
            <div class="ribbon2 ribbon-primary">Scaduto</div>
            <div class="card__img lazyloaded" onclick="openInfoFilm(${id}), aggiungofilm(${id})" style="background-color: #202124 ">
                <span ><i class="fas fa-image" style="color: grey, font-size: 36px"></i></span>
            </div>  
            <h2 class="card__name">${title}</h2>
            <div class="card__rating">
                <div class="card__stars">
                    <div style="width: 80%;">
                        Voto utenti:
                    </div>
                </div>
                <div class="card__vote">
                    ${vote_average}
                </div>
            </div>
        `
    }
    return card;
}
function fotoFilm(response) {
    var card = document.createElement('div');
    if(response.poster_path) {          
        card.innerHTML = `
            <img card-img src="https://image.tmdb.org/t/p/w500${response.poster_path}" alt="${response.title}" style="width: 70%;">
        `
    } else {
        card.classList.add("card2");               
        card.innerHTML = `
        <div class="card2">
            <div class="card__img lazyloaded" style="background-color: #202124 ">
                <span ><i class="fas fa-image" style="color: grey, font-size: 36px"></i></span>
            </div>
        </div>
        `
    }
    return card;
}
function cardAttore(attore, titolo) {
    const {name, profile_path, character, id} = attore;
    var card = document.createElement('div');
    card.classList.add("card2");               
    if(profile_path) {
        if (character) {         
        card.innerHTML = `
            <div class="card__img lazyloaded">
                <img class="lazyload" onclick="openInfoAttore('${id}', '${titolo}'), aggiungoAttori('${id}', '${titolo}');" src="https://image.tmdb.org/t/p/w500${profile_path}" alt="${name}">
            </div> 
            <h2 class="card__name">${name}</h2>
            <div class="card__rating">
                <div class="card__stars">
                    <div>
                        ${character}
                    </div>
                </div>
            </div>
        `
        } else {
            card.innerHTML = `
            <div class="card__img lazyloaded">
                <img class="lazyload" onclick="openInfoAttore('${id}', '${titolo}'), aggiungoAttori('${id}', '${titolo}');" src="https://image.tmdb.org/t/p/w500${profile_path}" alt="${name}">
            </div> 
            <h2 class="card__name">${name}</h2>
            <div class="card__rating">
                <div class="card__stars">
                   
                </div>
            </div>
        `
        }
    } else {
        if (character) {
        card.innerHTML = `
            <div class="card__img lazyloaded" onclick="openInfoAttore('${id}', '${titolo}'), aggiungoAttori('${id}', '${titolo}');" style="background-color: #202124 ">
                <span ><i class="fas fa-image" style="color: grey, font-size: 36px"></i></span>
            </div> 
            <h2 class="card__name">${name}</h2>
            <div class="card__rating">
                <div class="card__stars">
                    <div>
                        ${character}
                    </div>
                </div>
            </div>
        `
        } else {
            card.innerHTML = `
            <div class="card__img lazyloaded" onclick="openInfoAttore('${id}', '${titolo}'), aggiungoAttori('${id}', '${titolo}');" style="background-color: #202124 ">
                <span ><i class="fas fa-image" style="color: grey, font-size: 36px"></i></span>
            </div> 
            <h2 class="card__name">${name}</h2>
            <div class="card__rating">
                <div class="card__stars">

                </div>
            </div>
        `
        }
    }
    return card;
}
function fotoAttore(response) {
    var card = document.createElement('div');
    if(response.profile_path) {          
        card.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${response.profile_path}" alt="${response.name}" style="width: 70%;">
        `
    } else {
        card.classList.add("card2");               
        card.innerHTML = `
        <div class="card__img lazyloaded"  style="background-color: #202124 ">
            <span ><i class="fas fa-image" style="color: grey, font-size: 36px"></i></span>
        </div> 
        `
    }
    return card;
}
function backdropFilm(film, index) {
    var backdropCarosello = document.createElement('div');
    backdropCarosello.classList.add('carousel-item');      
    const {title, backdrop_path, overview, id} = film;
 
    if (index == 0) {
        backdropCarosello.className = "carousel-item active";
    }            
    if(backdrop_path) {          
        backdropCarosello.innerHTML = `
        <div class="hero_F8SLO">
            <div class="backdrop_2w6W_">
                <div class="lazyloaded">
                    <img class="lazyload image_183rJ" style="width: 100%; height: 100%;" src="https://image.tmdb.org/t/p/original/${backdrop_path}" alt="${title}">
                    <div id="div2"></div>
                </div>
            </div>
            <div class="pane_2lVvR">
                <div>
                    <h3 class="name_zSTaZ"> ${title}</a></h3>
                    <div class="desc_1w0B3">
                        ${overview}                                    
                    </div>
                    <button class="btn warning" onclick="openInfoFilm(${id})" data-toggle="tooltip" data-placement="right" title="Scopri di piu'" style="margin-top: 1rem; background-color: #fba304; color: oldlace;">Scopri di più</i></button>

                </div>
            </div>
        </div>
        `
    } 
    return backdropCarosello;
}


//INFORMAZIONI SUI FILM
function openPageInfoFilm(pageName, elmnt) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontentInfoFilm");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = "#141414";
    elmnt.style.border = "none";
}
var arrayfilm = [];
function closeInfoFilm() {
    arrayfilm = []
    document.getElementById("informazioniFilm").style.width = "0%";
    console.log(arrayfilm.length, "arrayfilm")
}
function openInfoFilm(filmId) {
    var informazioni = document.getElementById("informazioniFilm");
    informazioni.innerHTML = " ";
    var divInfoFilm = document.createElement("div");
    
    getUrl(BASE_URL + "/movie/"+ filmId + "?api_key=" + APY_KEY + "&append_to_response=credits", function(response){  
        console.log("info film ", filmId, response);
        document.title = `TOMC |  ${response.title}`;
        divInfoFilm.innerHTML = `
            <div class="contenitore-margine">
                <nav class="navbar" style="background-color: black">
                    <div class="container-fluid" style="padding: 10px 20px;">
                        <a class="navbar-brand" style="margin-left: 2rem"><i onclick="tornaIndietro()" id="tornaindietro1" class="fas fa-arrow-left"></i></a>
                        <form class="d-flex">
                        <a onclick="closeInfoFilm(), titloPage()"><i class="fas fa-times" style="color: #fba304; font-size: 20px"></i></a>
                        </form>
                    </div>
                </nav>
                <div class="hero_F8SLO">
                    <div class="backdrop_2w6W_">
                        <div id="backdrop">
                            
                            <div id="div"> </div>
                        </div>
                    </div>
                    <div class="pane_2lVvR">
                        <div>
                            <h3>${response.title}</h3>    
                            <div>
                                ${response.overview}
                            </div>
                            <div class="bottoni-info">
                                <div id="bottoneLista">
                                    <button class="btn warning" style="color: oldlace;" onclick="funzioneLista(${filmId});" data-toggle="tooltip" data-placement="right" title="Aggiungi alla mia lista" id="bottoneLaMiaLista"><i class="far fa-thumbs-up" style="color: oldlace"></i> Aggiungi alla Lista </button> 
                                </div>
                                <div>
                                    <button id="compraFilm" data-toggle="modal" data-target="#modalCompra" type="button" onclick="modalNegozi(${filmId})" class="btn btn-light" > <i class="fas fa-cart-plus"></i> Compra </button>                            
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="contenitore_tablink">
                    <button class="tablink" onclick="openPageInfoFilm('info', this)" id="defaultOpenFilm" style="background-color: #141414"> ABOUT </button>
                    <button class="tablink" onclick="openPageInfoFilm('cast', this)">CAST</button>
                    <button class="tablink" onclick="openPageInfoFilm('trailer', this)">TRAILER</button>
                    <button class="tablink" onclick="openPageInfoFilm('simili', this)">SIMILI</button>
                </div>
                <div id="info" class="tabcontentInfoFilm" style="display: block;">
                    <div class="card mb-3" style="background-color: #141414">
                        <div class="row no-gutters">
                        <div class="col-md-4">
                            <div id="copertina" style="">

                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body" >
                            <div class="infoFilm">
                                <div class="text-center">
                                <h3 class="titolo" id="titolo">${response.title} </h3>   
                                </div>
                                <table class="table table-borderless" style="color: white">
                                    <tbody>
                                    <tr>
                                        <th scope="row">Overview</th>
                                        <td><div class="trama" id="trama">${response.overview} </div></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Generi</th>
                                        <td><div id="generi"> </div></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Regista</th>
                                        <td><div id="regista"> </div></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Produttori</th>
                                        <td><div id="produttori">  </div></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Durata</th>
                                        <td><div id="durata">${response.runtime} min</div></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Data di uscita</th>
                                        <td><div id="dataUscita"> ${response.release_date} </div></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Voto degli utenti</th>
                                        <td><div id="votoUtenti"> </div></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                <div id="cast" class="tabcontentInfoFilm">
                    <div class="carosello">
                        <h3>CAST</h3>
                        <div id="caroselloCast"  class="carousel slide">
                            <div class="row padding_index" >
                                <div id="caroselloAttori" class="algin-top overflow-auto scroller_index" style="white-space: nowrap;">
            
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>

                <div id="trailer" class="tabcontentInfoFilm">
                    <div class="container-fluid">
                        <div class="container" id="trailerVideo">

                        </div>
                    </div>
                </div>

                <div id="simili" class="tabcontentInfoFilm">
                    <div class="carosello">
                        <h3>FILM SIMILI</h3>
                        <div id="caroselloFilmSimili"  class="carousel slide">
                            <div class="row padding_index" >
                                <div id="caroselloSimili" class="algin-top overflow-auto scroller_index" style="white-space: nowrap;">
            
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>     
        `      
        document.getElementById("copertina").appendChild(fotoFilm(response));

        if (response.backdrop_path !== null) {
            document.getElementById("backdrop").innerHTML = `<img class="lazyload image_183rJ" style="width: 100%; height: 100%;" src="https://image.tmdb.org/t/p/original/${response.backdrop_path}"></img>`
        }

        //Regista
        response.credits.crew.forEach(componente => {
            if (componente.job == "Director") {
                document.getElementById("regista").innerHTML = `<span>${componente.name}</span>`;
            }
        });
       

        //Generi
        var listaGeneri = [];
        response.genres.forEach(genere => {
            listaGeneri.push(genere.name);
            var separatoreListaGeneri = listaGeneri.join(' - ');
            document.getElementById("generi").innerHTML = `<span>${separatoreListaGeneri}</span>`;
        });

        //Produttori
        var listaProduttori = [];
        response.production_companies.forEach(produttore => {
            listaProduttori.push(produttore.name);
            var separatoreListaAttori = listaProduttori.join(' - ');
            document.getElementById("produttori").innerHTML = `<span>${separatoreListaAttori}</span>`;
        });

        var idCaroselloAttori= document.getElementById("caroselloAttori");
        console.log("cast: ", response)
        response.credits.cast.forEach(attore => {         //per ogni film prendo la sua immagine
            idCaroselloAttori.appendChild(cardAttore(attore, response.title))
        });

        getUrl(BASE_URL+"/movie/"+ filmId + "/similar?api_key=" + APY_KEY + "&language=en-US&page=1", function(response){
            var idCaroselloFilmSimili = document.getElementById("caroselloSimili");
            console.log("film simili: ", response);
            response.results.forEach(film => {         //per ogni film prendo la sua immagine
                idCaroselloFilmSimili.appendChild(cardFilm(film))
            });
            
        })
        
        getUrl(BASE_URL + "/movie/"+ filmId + "/videos?api_key=" + APY_KEY + "&language=en-US", function(response){    
            var divTrailer = document.getElementById("trailerVideo");
            console.log("trailer: ", response);
            response.results.forEach(trailer => {
                if (trailer.site == "YouTube") {
                    divTrailer.innerHTML = `
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer.key}" title="${trailer.name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    `            
                } else {
                    divTrailer.innerHTML = `
                    <h1 class="no-results">No Results Found</h1>
                    ` 
                }            
            });
        })

        //Se il film è già presente nella lista lo rimuove
        for (let i = 0; i < Utente_Attivo.filmPreferiti.length; i++) {
            const element = Utente_Attivo.filmPreferiti[i];
            if (element == filmId) {
                document.getElementById("bottoneLaMiaLista").innerHTML = `<i class="fas fa-thumbs-up" style="color: oldlace"></i> Rimuovi dalla Lista `
            }
        }

        //Se Il film è già presente nel carrello è disabilitato  compraFilm
        for (let i = 0; i < Utente_Attivo.carrello.daAcquistare.length; i++) {
            const element = Utente_Attivo.carrello.daAcquistare[i].titolo;
            if (element == response.title) {
                document.getElementById("compraFilm").disabled = "true"
                document.getElementById("compraFilm").innerHTML = `<i class="fas fa-shopping-cart"></i> Film nel carrello `

            }
        }
        for (let i = 0; i < Utente_Attivo.carrello.daNoleggiare.length; i++) {
            const element = Utente_Attivo.carrello.daNoleggiare[i].titolo;
            if (element == response.title) {
                document.getElementById("compraFilm").disabled = "true"
                document.getElementById("compraFilm").innerHTML = `<i class="fas fa-shopping-cart"></i> Film nel carrello `

            }
        }
        for (let i = 0; i < Utente_Attivo.storico.filmNoleggiiati.length; i++) {
            if (Utente_Attivo.storico.filmNoleggiiati[i].id == filmId) {
                const data =  Utente_Attivo.storico.filmNoleggiiati[i].scadenza;  
                if ((((Date.now()-new Date(data).getTime()) / 1000 ) / 3600) <= 72) {       
                    document.getElementById("compraFilm").disabled = "true"
                    document.getElementById("compraFilm").innerHTML = `<i class="fas fa-shopping-cart"></i> Noleggio ancora valido `
                }
            }
        }
        //Se il film è già stato venduto non può essere comprato
        for (let i = 0; i < Utente_Attivo.storico.filmAcquistati.length; i++) {
            const id = Utente_Attivo.storico.filmAcquistati[i].id;
            if (id == filmId) {   
                document.getElementById("compraFilm").disabled = "true"
                document.getElementById("compraFilm").innerHTML = `<i class="fas fa-shopping-cart"></i> Film già comprato `
            }
        } 
        rating(response.vote_average)
    })  
    informazioni.appendChild(divInfoFilm)
    document.getElementById("informazioniFilm").style.width = "100%";
}
function rating(voto) {
    if( voto > 0 && voto <= 1) {
        document.getElementById("votoUtenti").innerHTML = `
        <i class="fas fa-star-half-alt"></i> 
        <i class="far fa-star"></i> 
        <i class="far fa-star"></i> 
        <i class="far fa-star"></i> 
        <i class="far fa-star"></i> 
        `
    } else if (voto > 1 && voto <= 2) {
        document.getElementById("votoUtenti").innerHTML = `
        <i class="fas fa-star"></i>
        <i class="far fa-star"></i> 
        <i class="far fa-star"></i> 
        <i class="far fa-star"></i> 
        <i class="far fa-star"></i> 
        `
    } else if (voto > 2 && voto <= 3) {
        document.getElementById("votoUtenti").innerHTML = `
        <i class="fas fa-star"></i>
        <i class="fas fa-star-half-alt"></i> 
        <i class="far fa-star"></i> 
        <i class="far fa-star"></i> 
        <i class="far fa-star"></i> 
        `
    } else if (voto > 3 && voto <= 4) {
        document.getElementById("votoUtenti").innerHTML = `
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="far fa-star"></i> 
        <i class="far fa-star"></i> 
        `
    } else if( voto > 4 && voto <= 5) {
        document.getElementById("votoUtenti").innerHTML = `
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star-half-alt"></i> 
        <i class="far fa-star"></i> 
        <i class="far fa-star"></i> 
        `
    } else if (voto > 5 && voto <= 6) {
        document.getElementById("votoUtenti").innerHTML = `
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="far fa-star"></i> 
        <i class="far fa-star"></i> 
        `
    } else if( voto > 6 && voto <= 7) {
        document.getElementById("votoUtenti").innerHTML = `
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star-half-alt"></i> 
        <i class="far fa-star"></i> 
        `
    } else if (voto > 7 && voto <= 8) {
        document.getElementById("votoUtenti").innerHTML = `
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="far fa-star"></i> 
        `
    } else if (voto > 8 && voto <= 9) {
        document.getElementById("votoUtenti").innerHTML = `
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star-half-alt"></i> 
        `
    }else if (voto > 9 && voto <= 10) {
        document.getElementById("votoUtenti").innerHTML = `
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        `
    }

}
function aggiungofilm(id) {
    var inseriscoEl = {id: id, tipo: "film"}
    arrayfilm.push(inseriscoEl)
    console.log(arrayfilm, "arrayfilm", arrayfilm.length)
}
function aggiungoAttori(id, titolo) {
    var inseriscoEl = {id: id, titolo: titolo, tipo: "attore"}
    arrayfilm.push(inseriscoEl)
    console.log(arrayfilm, "arrayfilm", arrayfilm.length)
}
function tornaIndietro() {
    if (arrayfilm.length == 1) {
        closeInfoFilm() 
        titloPage()
    } else {
        arrayfilm.splice((arrayfilm.length)-1, 1);
        const filmId = arrayfilm[(arrayfilm.length)-1].id;
        const tipo = arrayfilm[(arrayfilm.length)-1].tipo;

        if (tipo == "film") {
            openInfoFilm(filmId)
        } else {
            const titolo = arrayfilm[(arrayfilm.length)-1].titolo;
            openInfoAttore(filmId, titolo)
        }
        console.log(arrayfilm, "arrayfilm", arrayfilm.length)
    }    
}
function titloPage() {
    console.log(window.location.href.indexOf("home_cliente"))
    if (window.location.href.indexOf("home")>-1) {
        document.title = "TOMC | Home"; 
    } else if (window.location.href.indexOf("filmPreferiti")>-1) {
        document.title = "TOMC | La Mia Lista"; 
        stampoPreferiti()
    } else if (window.location.href.indexOf("carrello")>-1) {
        document.title = "TOMC | Carrello"; 
    } else if (window.location.href.indexOf("negozianti")>-1) {
        document.title = "TOMC | Negozi"; 
    } else if (window.location.href.indexOf("profilo")>-1) {
        document.title = "TOMC | Profilo"; 
    } else if (window.location.href.indexOf("cerca")>-1) {
        if (isNaN("nome")) {
            document.title = "TOMC | Film con durata inferiore a: " + nome;
        } else {
            document.title = "TOMC | Ricerca per: " + nome; 
        }
    }
}
function stampoPreferiti() {
    var arrayFilmPreferiti = Utente_Attivo.filmPreferiti;
    if (arrayFilmPreferiti.length == 0) {
        document.getElementById("contenitoreLaMiaLista").innerHTML = `<p> Nessun film tra i preferiti</p>`
    } else {
        document.getElementById("contenitoreLaMiaLista").innerHTML = ""
        for (let i = 0; i < arrayFilmPreferiti.length; i++) {
            const filmId = arrayFilmPreferiti[i];
            getUrl(BASE_URL+"movie/" + filmId + "?api_key=" + APY_KEY + "&language=en-US", function(response) {
                var title = response.title
                var poster_path = response.poster_path
                var vote_average = response.vote_average
                var id = response.id
                var film = {title, poster_path, vote_average, id}      
                document.getElementById("contenitoreLaMiaLista").appendChild((cardFilm(film)))
            });
        }
    }
}
//INFORMAZIONI SUGLI ATTORI
function openPageInfoAttore(pageName, elmnt) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontentInfoAttore");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = "#141414";
    elmnt.style.border = "none";
}
function openInfoAttore(attoreId, titolo) {
    var informazioni = document.getElementById("informazioniFilm");
    informazioni.innerHTML = " ";
    var divInfoFilm = document.createElement("div");
    getUrl(BASE_URL+"person/"+ attoreId + "?api_key=" + APY_KEY + "&language=en-US", function(response){
        document.title = `TOMC |  ${response.name}`
        console.log("attore: ", attoreId, response);
        divInfoFilm.innerHTML = `
            <div class="contenitore-margine">
            <nav class="navbar" style="background-color: black">
                <div class="container-fluid" style="padding: 10px 20px;">
                    <a class="navbar-brand" style="margin-left: 2rem"><i onclick="tornaIndietro()" id="tornaindietro2" class="fas fa-arrow-left" style="color: #fba304, font-size: 20px"></i></a>
                    <form class="d-flex">
                    <a onclick="closeInfoFilm(), titloPage()"><i class="fas fa-times" style="color: #fba304; font-size: 20px"></i></a>
                    </form>
                </div>
            </nav>
            <div class="contenitore_tablinks">
                <button class="tablinks" id="aa" onclick="openPageInfoAttore('infoAttore', this)" id="defaultOpenAttori" style="background-color: #141414"> ABOUT </button>
                <button class="tablinks" id="bb" onclick="openPageInfoAttore('altriFilm', this)">ALTRI FILM</button>
            </div>
            <div id="infoAttore" class="tabcontentInfoAttore" style="display: block;">
                <div class="card mb-3" style="background-color: #141414">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <div id="attore" style="">

                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body" >
                                <div class="infoFilm">
                                    <div class="text-center">
                                    <h3>${response.name}</h3>   
                                    </div>
                                    <table class="table table-borderless" style="color: white">
                                        <tbody>
                                        <tr>
                                            <th scope="row">Biografia: </th>
                                            <td><div>${response.biography}</div></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Ambito: </th>
                                            <td><div>${response.known_for_department} </div></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Luogo di nascita: </th>
                                            <td><div>${response.place_of_birth}</div></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Dada di nascita: </th>
                                            <td><div>${response.birthday}</div></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="altriFilm" class="tabcontentInfoAttore">
                <div class="carosello">
                    <h3>ALTRI FILM</h3>
                    <div   class="carousel slide">
                        <div class="row padding_index" >
                            <div id="caroselloAltriFilm" class="algin-top overflow-auto scroller_index" style="white-space: nowrap;">
        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        `
        var attore = document.getElementById("attore");
        attore.appendChild(fotoAttore(response));

        getUrl(BASE_URL+"person/"+ attoreId + "/movie_credits?api_key=" + APY_KEY + "&language=en-US", function(response){
            var idCaroselloAltriFilm = document.getElementById("caroselloAltriFilm")
            console.log("altri film: ",response);
            response.cast.forEach(film => {         //per ogni film prendo la sua immagine
                idCaroselloAltriFilm.appendChild(cardFilm(film));
            });
        })
    })
    informazioni.appendChild(divInfoFilm)
    document.getElementById("informazioniFilm").style.width = "100%";
}


//AGGIUNGI ALLA LISTA
function funzioneLista(filmId) {
    var arrayFilmPreferiti = Utente_Attivo.filmPreferiti;

    if(arrayFilmPreferiti.includes(filmId)){
        document.getElementById("bottoneLaMiaLista").innerHTML = `<i class="far fa-thumbs-up" style="color: oldlace"></i> Aggiungi alla Lista `
        arrayFilmPreferiti.forEach((id, idx) => {
            if(id == filmId){
                arrayFilmPreferiti.splice(idx, 1);
            }
        })
    } else {
        document.getElementById("bottoneLaMiaLista").innerHTML = `<i class="fas fa-thumbs-up" style="color: oldlace"></i> Rimuovi dalla Lista ` 
        arrayFilmPreferiti.push(filmId);
    }
    Utente_Attivo.filmPreferiti = arrayFilmPreferiti;
    localStorage.setItem("Utente_Attivo",JSON.stringify(Utente_Attivo));

    for (let i = 0; i < Clienti_Registrati.length; i++) {
        const element = Clienti_Registrati[i].email;
        if (Utente_Attivo.email == element) {
            Clienti_Registrati[i].filmPreferiti = Utente_Attivo.filmPreferiti;
            localStorage.setItem("Clienti_Registrati",JSON.stringify(Clienti_Registrati));
            break
        }
    }
}


//RICERCA
//Mostro il tab ricerca
function cancellaDatiRicerca() {
    document.getElementById('qualeRicerca').value = 0;
    document.getElementById("searchFilm").value = "";
    document.getElementById("searchAttore").value = "";
    document.getElementById("select_genere").value = 28;
}
function showForm(){
    var value = document.getElementById('qualeRicerca').value;
    console.log("Opzione cambiata " + value);
    var form = document.getElementById('section_' + value);
    console.log('section_' + value);
    var sections = document.getElementsByTagName('section')
    for(i=0; i< sections.length; i++){
        sections[i].style.display = "none";
    }
    form.style.display = "block";
}
function cercaFilm() {
    var lente = document.getElementById("searchFilm");
    var valoreRicerca = lente.value;
    if (valoreRicerca == "") {
        lente.className = "form-control is-invalid"
    } else {
        document.getElementById("ffilmm").setAttribute("data-dismiss", "modal");
        window.location.assign("../../pagineDelSito/cliente/cerca_cliente.html?id=" + valoreRicerca + "ambito=film");
    }  
}
function cercaAttore() {
    var lente = document.getElementById("searchAttore");
    var valoreRicerca = lente.value;
    if (valoreRicerca == "") {
        lente.className = "form-control is-invalid"
    } else {
        document.getElementById("aattorii").setAttribute("data-dismiss", "modal");
        window.location.assign("../../pagineDelSito/cliente/cerca_cliente.html?id=" + valoreRicerca + "ambito=attore");
    } 
}
function cercaDurata() {  
    var lente = document.getElementById("searchDurata");
    var valoreRicerca = lente.value;
    if (valoreRicerca == "" || !Number(valoreRicerca)) {
        lente.className = "form-control is-invalid"
    } else {
        document.getElementById("aattorii").setAttribute("data-dismiss", "modal");
        window.location.assign("../../pagineDelSito/cliente/cerca_cliente.html?id=" + valoreRicerca + "ambito=durata")
    } 
}
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
function mostroGeneri() {
    var selectDaVerificare = document.getElementById("select_genere");
    var indiceSelezionato = selectDaVerificare.selectedIndex;
    var valoreSelezionato = selectDaVerificare.options[indiceSelezionato]; 
    var valoreRicerca = valoreSelezionato.value;
    window.location.assign("../../pagineDelSito/cliente/cerca_cliente.html?id=" + valoreRicerca + "ambito=genere");
}

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

        for (let i = 0; i < Clienti_Registrati.length; i++) {
            const element = Clienti_Registrati[i].email;
            if (Utente_Attivo.email == element) {
                Clienti_Registrati[i].carrello.daAcquistare = Utente_Attivo.carrello.daAcquistare;
                localStorage.setItem("Clienti_Registrati",JSON.stringify(Clienti_Registrati));
                break
            }
        }
    });
    quantiFilmNelCarrello(1)
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

        for (let i = 0; i < Clienti_Registrati.length; i++) {
            const element = Clienti_Registrati[i].email;
            if (Utente_Attivo.email == element) {
                Clienti_Registrati[i].carrello.daNoleggiare = Utente_Attivo.carrello.daNoleggiare;
                localStorage.setItem("Clienti_Registrati",JSON.stringify(Clienti_Registrati));
                break
            }
        }
    });
    quantiFilmNelCarrello(1)
}
function rendiNonDisponibile() {
    document.getElementById("compraFilm").disabled = "true"
    document.getElementById("compraFilm").innerHTML = `<i class="fas fa-shopping-cart"></i> Film nel carrello `
}
function quantiFilmNelCarrello(n) {
    if(n == null) {
        n = 0
    }
    document.getElementById("iconNewCarrello").innerHTML = Utente_Attivo.carrello.daAcquistare.length + Utente_Attivo.carrello.daNoleggiare.length + n;
}
quantiFilmNelCarrello();

//ESCI
function esci() {
    localStorage.setItem("Utente_Attivo",JSON.stringify("Nessun utente loggato"));
    window.location.replace("../../accedi.html")       
}