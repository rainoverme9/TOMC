$(document).ready(() => {
    //Creo carosello I film più votati
    getUrl(BASE_URL+"movie/top_rated?api_key=" + APY_KEY + "&language=en-US&page=1", function(response){
        var idCaroselloFilmMostRated = document.getElementById("caroselloMostRated");
        console.log("film most rated: ",response);
        response.results.forEach(film => {         //per ogni film prendo la sua immagine         
            idCaroselloFilmMostRated.appendChild(cardFilm(film))
            rating(film.id, film.vote_average)
        });
    })
    //Creo carosello I film popolari
    getUrl(BASE_URL+"trending/movie/day?api_key=" + APY_KEY + "&language=en-US&page=1", function(response){
        var idCaroselloPopolari = document.getElementById("caroselloPopolari");
        console.log("film popolari: ", response);
        response.results.forEach(film => {         //per ogni film prendo la sua immagine
            idCaroselloPopolari.appendChild(cardFilm(film))
            rating(film.id, film.vote_average)
        });

    })
    //Creo carosello I film in arrivo
    getUrl(BASE_URL+"movie/upcoming?api_key=" + APY_KEY + "&language=en-US&page=1", function(response){
        var idCaroselloInArrivo = document.getElementById("caroselloInArrivo");
        console.log("film in arrivo: ", response);
        response.results.forEach(film => {         //per ogni film prendo la sua immagine
            idCaroselloInArrivo.appendChild(cardFilm(film))
            rating(film.id, film.vote_average)
        });

    })
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
})