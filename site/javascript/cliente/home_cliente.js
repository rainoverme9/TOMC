$(document).ready(() => {
    //Creo carosello I film più votati
    getUrl(BASE_URL+"movie/top_rated?api_key=" + APY_KEY + "&language=en-US&page=1", function(response){
        var idCaroselloFilmMostRated = document.getElementById("caroselloMostRated");
        console.log("film most rated: ",response);
        response.results.forEach(film => {         //per ogni film prendo la sua immagine         
            idCaroselloFilmMostRated.appendChild(cardFilm(film))
        });
    })
    //Creo carosello I film popolari
    getUrl(BASE_URL+"trending/movie/day?api_key=" + APY_KEY + "&language=en-US&page=1", function(response){
        var idCaroselloPopolari = document.getElementById("caroselloPopolari");
        console.log("film popolari: ", response);
        response.results.forEach(film => {         //per ogni film prendo la sua immagine
            idCaroselloPopolari.appendChild(cardFilm(film))
        });
    })
    //Creo carosello I film in arrivo
    getUrl(BASE_URL+"movie/upcoming?api_key=" + APY_KEY + "&language=en-US&page=1", function(response){
        var idCaroselloInArrivo = document.getElementById("caroselloInArrivo");
        console.log("film in arrivo: ", response);
        response.results.forEach(film => {         //per ogni film prendo la sua immagine
            idCaroselloInArrivo.appendChild(cardFilm(film))
        });

    })

    //Creo per ogni genere la lista dei filtri 
    getUrl(BASE_URL + "genre/movie/list?api_key=" + APY_KEY + "&language=en-US", function(response){
        console.log("generi: ", response);
        response.genres.forEach(genere => {                     
            const {id, name} = genere;
            document.getElementById("select_genere").innerHTML += `
                <option value="${id}">${name}</option>
            `
            
            if (Utente_Attivo.generiScelti.length > 0 && Utente_Attivo.generiScelti.includes(id)) {

                document.getElementById("titoloDivCaroselli").innerHTML = "SCELTI PER TE"

                document.getElementById("divDeiCaroselli").innerHTML += ` 
                <div class="carosello">
                    <h3>Film ${name}</h3><br>
                    <div class="carousel slide">
                        <div class="row padding_index">
                            <div id="${name}" class="algin-top overflow-auto scroller_index" style="white-space: nowrap;">

                            </div>
                        </div>
                    </div>
                </div>
                `
                getUrl(BASE_URL+"discover/movie?api_key=" + APY_KEY + "&with_genres=" + id + "&language=en-US&sort_by=popularity.desc&page=1", function(response){ 
                    var caroselloGeneri = document.getElementById(name);
                    response.results.forEach(film => {         //per ogni film prendo la sua immagine
                        caroselloGeneri.appendChild(cardFilm(film)) 
                    });
                })
            }
        });
    })
    
    
    //Carosello principiale
    getUrl(BASE_URL+"movie/now_playing?api_key=" + APY_KEY + "&language=en-US&page=1", function(response){
        var idCaroselloFilmDescrizione = document.getElementById("caroselloFilmDescrizione");
        console.log("now playing: ", response);
        response.results.forEach((film, index) => {         //per ogni film prendo la sua immagine
            idCaroselloFilmDescrizione.appendChild(backdropFilm(film, index));
        });
    })
    quantiFilmNelCarrello();
})

//PREFERENZE DELL'UTENTE
function GestisciGeneri() {
    generiPreferiti = document.getElementById('generiPreferiti');
    allInputGeneri = generiPreferiti.getElementsByClassName("btn-check");
    
    //creo array di generi scelti
    arrayGeneriScelti = [];
    for (input of allInputGeneri) {
        if (input.checked) {
            arrayGeneriScelti.push(Number(input.id));
            document.getElementById(input.id).checked = true;
        } else {
            document.getElementById(input.id).checked = false;
        }
    }

    Utente_Attivo.generiScelti = arrayGeneriScelti;
    localStorage.setItem('Utente_Attivo',JSON.stringify(Utente_Attivo))

    Clienti_Registrati.forEach((element, idx) => {
        if(element.email == Utente_Attivo.email){
            Clienti_Registrati[idx] = Utente_Attivo
            localStorage.setItem("Clienti_Registrati",JSON.stringify(Clienti_Registrati));
        }
    })
}
function checkGeneri() {
    if (Utente_Attivo.generiScelti.length > 0) {
        document.getElementById("titoloDivCaroselli").innerHTML = "SCELTI PER TE"
    }

    document.getElementById("divDeiCaroselli").innerHTML = "";
    getUrl(BASE_URL + "genre/movie/list?api_key=" + APY_KEY + "&language=en-US", function(response){
        response.genres.forEach(genere => {                     
            const {id, name} = genere;
            if ( Utente_Attivo.generiScelti.length > 0 && Utente_Attivo.generiScelti.includes(id)) {
                document.getElementById("divDeiCaroselli").innerHTML += ` 
                <div class="carosello">
                    <h3>Film ${name}</h3><br>
                    <div class="carousel slide">
                        <div class="row padding_index">
                            <div id="${name}" class="algin-top overflow-auto scroller_index" style="white-space: nowrap;">

                            </div>
                        </div>
                    </div>
                </div>
                `
                getUrl(BASE_URL+"discover/movie?api_key=" + APY_KEY + "&with_genres=" + id + "&language=en-US&sort_by=popularity.desc&page=1", function(response){ 
                    var caroselloGeneri = document.getElementById(name);
                    response.results.forEach(film => {         //per ogni film prendo la sua immagine
                        caroselloGeneri.appendChild(cardFilm(film))
                    });
                })
            }
        });
    })
}