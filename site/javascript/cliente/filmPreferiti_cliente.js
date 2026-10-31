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
    stampoPreferiti();
    quantiFilmNelCarrello();
})

//Stampo i film preferiti
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