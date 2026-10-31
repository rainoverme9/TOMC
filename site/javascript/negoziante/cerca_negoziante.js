var valoreRicerca
document.getElementById("cercaIFilm").innerHTML = " ";
function get_from_url(key){ // key è il prametro che volgio ottenere , nel nostro caso è id per avere id del film
    var indice = window.location.href.indexOf(key);
    if (indice == -1) {
        return false;
    }
   var sottostringa = window.location.href.slice(indice+key.length,window.location.href.length-(window.location.href.slice(window.location.href.indexOf("ambito=")+"ambito=".length).length+7));

   var id = "";
   for (i = 0 ; i < sottostringa.length; i++) {
       if (i==sottostringa.length || sottostringa[i]=="&") {
           break;
       } else {
        id += sottostringa[i];
       }
   }
   return id ;
}

valoreRicerca = get_from_url("id=")
if (window.location.href.slice(window.location.href.indexOf("ambito=")+"ambito=".length,window.location.href.length) == "film") {
    cercaFilm(valoreRicerca)
} else if (window.location.href.slice(window.location.href.indexOf("ambito=")+"ambito=".length,window.location.href.length) == "attore") {
    cercaAttore(valoreRicerca)
} else {
    mostroFilmPerGenere(valoreRicerca)   
}

//RICERCA
var nome;
function cercaFilm(valoreRicerca) {
    nome = valoreRicerca.replace('%20',' ');
    document.title = `TOMC | Ricerca per: ${nome}`;
    var page = 1;
    var divCerca = document.getElementById("cercaIFilm");  
    divCerca.innerHTML = " ";
    var cosaCerco = document.getElementById("cosaCerco");   
    if (valoreRicerca) {
        divCerca.innerHTML = " ";
        cosaCerco.innerHTML = `<div class="text-center"><h3>Risultati per: ${nome}</h3> </div><br>  `

        getUrl(BASE_URL+"search/movie?api_key=" + APY_KEY + "&query=" + valoreRicerca, function(response){
            response.results.forEach(ricerca => {         //per ogni film prendo la sua immagine
                divCerca.appendChild(cardFilm(ricerca));               
            });
            document.getElementById("diPiu").innerHTML = `
                <button type="button" id="pgFilm" class="btn btn-primary">Mostra altri elementi</button>
            `
            document.getElementById("pgFilm").classList.remove('disabled')
            document.getElementById("pgFilm").addEventListener('click', () => {
                page = page +1
                getUrl(BASE_URL+"search/movie?api_key=" + APY_KEY + "&query=" + valoreRicerca + "&page=" + page, function(response){                        
                    response.results.forEach(ricerca => {
                    divCerca.appendChild(cardFilm(ricerca))
                    document.getElementById("cercaIFilm").scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
                    });        
                    if (page == response.total_pages) {
                        pgFilm.classList.add('disabled');
                    }
                })
            })
        })
    }
}
function cercaAttore(valoreRicerca) {
    var page = 1;
    var divCerca = document.getElementById("cercaIFilm");
    divCerca.innerHTML = " ";  
    var cosaCerco = document.getElementById("cosaCerco");   

    if (valoreRicerca) {
        divCerca.innerHTML = " ";
        nome = valoreRicerca.replace('%20',' ');
        document.title = `TOMC | Ricerca per: ${nome}`;
        cosaCerco.innerHTML = `<div class="text-center"><h3>Risultati per: ${nome}</h3> </div><br>  `

        getUrl(BASE_URL+"search/person?api_key=" + APY_KEY + "&query=" + valoreRicerca, function(response){
            response.results.forEach(ricerca => {         //per ogni attore prendo la sua immagine
                divCerca.appendChild(cardAttore(ricerca));              
            });
            document.getElementById("diPiu").innerHTML = `
                <button type="button" id="pgAttori" class="btn btn-primary">Mostra altri elementi</button>
            `
            document.getElementById("pgAttori").classList.remove('disabled')
            document.getElementById("pgAttori").addEventListener('click', () => {
                page = page +1
                getUrl(BASE_URL+"search/person?api_key=" + APY_KEY + "&query=" + valoreRicerca + "&page=" + page, function(response){
                    response.results.forEach(ricerca => {
                    divCerca.appendChild(cardAttore(ricerca))
                    document.getElementById("cercaIFilm").scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
                    });
                    if (page == response.total_pages) {
                        pgAttori.classList.add('disabled');
                    }
                })
            })
        })
    }
}
//Per ogni genere mostro i film di quel tipo
function mostroFilmPerGenere(valoreRicerca) {
    var page = 1;
    var divCerca = document.getElementById("cercaIFilm");
    divCerca.innerHTML = " "; 
    var cosaCerco = document.getElementById("cosaCerco");   
    if (valoreRicerca) {
        divCerca.innerHTML = " ";
        getUrl(BASE_URL+"discover/movie?api_key=" + APY_KEY + "&with_genres=" + valoreRicerca + "&language=en-US&sort_by=popularity.desc&page=1", function(response){
            console.log(response)
            response.results.forEach(ricerca => {         //per ogni attore prendo la sua immagine
                divCerca.appendChild(cardFilm(ricerca));              
            });
            document.getElementById("diPiu").innerHTML = `
                <button type="button" id="pgGeneri" class="btn btn-primary">Mostra altri elementi</button>
            `
            document.getElementById("pgGeneri").classList.remove('disabled')
            document.getElementById("pgGeneri").addEventListener('click', () => {
                page = page +1
                getUrl(BASE_URL+"discover/movie?api_key=" + APY_KEY + "&with_genres=" + valoreRicerca  + "&language=en-US&sort_by=popularity.desc&page=" + page, function(response){
                    response.results.forEach(ricerca => {
                    divCerca.appendChild(cardFilm(ricerca))
                    document.getElementById("cercaIFilm").scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
                    });
                    if (page == response.total_pages) {
                        pgGeneri.classList.add('disabled');
                    }
                })
            })
        })
        getUrl(BASE_URL + "genre/movie/list?api_key=" + APY_KEY + "&language=en-US", function(response){
            console.log("generi: ", response);
            response.genres.forEach(genere => {                     
                const {id, name} = genere;
                if (id == valoreRicerca) {
                    nome = name;
                    document.title = `TOMC | Ricerca per: Film ${nome}`;
                    cosaCerco.innerHTML = `<div class="text-center"><h3>Risultati per: ${name}</h3> </div><br>  `
                }
            });
        })
    }
}

function film() {   
    var lente = document.getElementById("searchFilm");
    var valoreRicerca = lente.value;
    if (valoreRicerca == "") {
        lente.className = "form-control is-invalid"
    } else {
        document.getElementById("ffilmm").setAttribute("data-dismiss", "modal");
        window.location.assign("../../pagineDelSito/negoziante/cerca_negoziante.html?id=" + valoreRicerca + "ambito=film");
    }
}
function attore() {  
    var lente = document.getElementById("searchAttore");
    var valoreRicerca = lente.value;
    if (valoreRicerca == "") {
        lente.className = "form-control is-invalid"
    } else {
        document.getElementById("aattorii").setAttribute("data-dismiss", "modal");
        window.location.assign("../../pagineDelSito/negoziante/cerca_negoziante.html?id=" + valoreRicerca + "ambito=attore");
    }
    
}