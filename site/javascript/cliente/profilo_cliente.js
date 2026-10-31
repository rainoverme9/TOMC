$(document).ready(() => {
    //Creo per ogni genere la lista dei filtri 
    getUrl(BASE_URL + "genre/movie/list?api_key=" + APY_KEY + "&language=en-US", function(response){
        console.log("generi: ", response);
        response.genres.forEach(genere => {                     
            const {id, name} = genere;
            document.getElementById("select_genere").innerHTML += `
                <option value="${id}">${name}</option>
            `
            
            if (Utente_Attivo.generiScelti.length > 0 && Utente_Attivo.generiScelti.includes(id)) {
                //check attivo
                document.getElementById("generiPreferiti").innerHTML += `
                    <input type="checkbox" checked class="btn-check" id="${id}" onchange="GestisciGeneri()">
                    <label class="btn btn-outline-secondary mr-1" for="${id}">${name}</label>
                `;
            } else {
                //check disattivo
                document.getElementById("generiPreferiti").innerHTML += `
                    <input type="checkbox" class="btn-check" id="${id}" onchange="GestisciGeneri()">
                    <label class="btn btn-outline-secondary mr-1" for="${id}">${name}</label>
                `;
            }
        });
    })
    

    //All'apertura saluto l'utente con il suo nome ne inserisco le informazioni dei film
    document.getElementById("salutoUtente").innerHTML += Utente_Attivo.nome + "!"
    if (Utente_Attivo.metodoPagamento == "pagmentoConVisa") {
        var scr = "https://img.icons8.com/color/50/000000/visa.png"
    } else {
        var scr = "https://img.icons8.com/color/48/000000/mastercard.png"
    }
    document.getElementById("infoCliente").innerHTML = `
        <p><strong>Nome :</strong> <span class="m-l-15">${Utente_Attivo.nome}</span></p>
        <p><strong>Cognome :</strong> <span class="m-l-15">${Utente_Attivo.cognome}</span></p>
        <p><strong>Email :</strong> <span class="m-l-15">${Utente_Attivo.email}</span></p>
        <p><strong>Regione :</strong> <span class="m-l-15"> ${Utente_Attivo.regione}</span></p>
        <p><strong>Citta :</strong> <span class="m-l-15"> ${Utente_Attivo.città}</span></p>
        <p><strong>Indirizzo :</strong> <span class="m-l-15"> ${Utente_Attivo.indirizzo}</span></p>
        <p><strong>Metodi di pagamento :</strong> <span class="m-l-5">
            <span class="flag-icon flag-icon-us m-r-5 m-t-0" title="us"></span> 
            <span><img src=${scr}/> </span> </span><span class="m-l-5">
        </p>   
        <p><strong>Generi preferiti :</strong> <span class="m-l-15"></span></p>      
    `

    quantiFilmNelCarrello()

    //All'apertura stampo lo storico
    if (Utente_Attivo.storico.filmAcquistati.length > 0) {
        for (let i = 0; i < Utente_Attivo.storico.filmAcquistati.length; i++) {
            var filmId = Utente_Attivo.storico.filmAcquistati[i].id;
            getUrl(BASE_URL+"movie/" + filmId + "?api_key=" + APY_KEY + "&language=en-US", function(response){
                var title = response.title
                var poster_path = response.poster_path
                var vote_average = response.vote_average
                var id = response.id
                var film = {title, poster_path, vote_average, id}      //per ogni film prendo la sua immagine         
                document.getElementById("caroselloAcquistati").appendChild((cardFilm(film)))
            })
        }  
    }
    quantifilmVenduti();
    scadenza();
    //stampoStorico()
})


//Aggiungo i film nello storico del profilo
function quantifilmVenduti() {
    var tot = 0
    for (let i = 0; i < Utente_Attivo.storico.filmNoleggiiati.length; i++) {
        const element = Utente_Attivo.storico.filmNoleggiiati[i].quantità;
        tot += element
    }
    document.getElementById("ottenuti").innerHTML = Utente_Attivo.storico.filmAcquistati.length +tot;
    document.getElementById("acquistati").innerHTML = Utente_Attivo.storico.filmAcquistati.length;
    document.getElementById("noleggiati").innerHTML = tot;
}
function stampoStorico() {
    document.getElementById("caroselloAcquistati").innerHTML = "";
    if (Utente_Attivo.storico.filmAcquistati.length > 0) {
        for (let i = 0; i < Utente_Attivo.storico.filmAcquistati.length; i++) {
            const filmId = Utente_Attivo.storico.filmAcquistati[i].id;
            getUrl(BASE_URL+"movie/" + filmId + "?api_key=" + APY_KEY + "&language=en-US", function(response){
                var title = response.title
                var poster_path = response.poster_path
                var vote_average = response.vote_average
                var id = response.id
                var film = {title, poster_path, vote_average, id}      //per ogni film prendo la sua immagine
                document.getElementById("caroselloAcquistati").appendChild((cardFilm(film))) 
            })
        }   
    } else {
        document.getElementById("caroselloAcquistati").innerHTML = `<p style="margin-left: 1rem;"> Nessun film acquistato </p>`
    }
    
}
function scadenza() {
    document.getElementById("caroselloNoleggiati").innerHTML = "";
    document.getElementById("caroselloNoleggiValidi").innerHTML = "";
    document.getElementById("scadenzeFilmNoleggiati").innerHTML = "";


    noleggiAttivi = Utente_Attivo.storico.filmNoleggiiati.filter(element => (((Date.now()-new Date(element.scadenza).getTime()) / 1000 ) / 3600) < 72)
    noleggiScaduti = Utente_Attivo.storico.filmNoleggiiati.filter(element => (((Date.now()-new Date(element.scadenza).getTime()) / 1000 ) / 3600) > 72)
    if (noleggiAttivi.length == 0 || Utente_Attivo.storico.filmNoleggiiati.length == 0) {
        document.getElementById("caroselloNoleggiValidi").innerHTML = `<p style="margin-left: 1rem;"> Nessun noleggio attivo </p>`
    }
    if (noleggiScaduti.length == 0 || Utente_Attivo.storico.filmNoleggiiati.length == 0) {
        document.getElementById("caroselloNoleggiati").innerHTML = `<p style="margin-left: 1rem;"> Nessun noleggio scaduto </p>`
    }

    for (let i = 0; i < Utente_Attivo.storico.filmNoleggiiati.length; i++) {
        var filmId = Utente_Attivo.storico.filmNoleggiiati[i].id;
        const data =  Utente_Attivo.storico.filmNoleggiiati[i].scadenza;
        const titolo =  Utente_Attivo.storico.filmNoleggiiati[i].titolo;
        const quantità = Utente_Attivo.storico.filmNoleggiiati[i].quantità;
        var scadenza = new Date(data)
        scadenza.setDate(scadenza.getDate() + 3); //Scadenza 3 giorni dopo

        if ((((Date.now()-new Date(data).getTime()) / 1000 ) / 3600) > 72) {       
            getUrl(BASE_URL+"movie/" + filmId + "?api_key=" + APY_KEY + "&language=en-US", function(response){
                var title = response.title
                var poster_path = response.poster_path
                var vote_average = response.vote_average
                var id = response.id
                var film = {title, poster_path, vote_average, id}      //per ogni film prendo la sua immagine
                if (quantità > 1) {
                    document.getElementById("caroselloNoleggiati").appendChild(cardFilmNoleggioScadutoQuantita(film, quantità));
                } else {
                    document.getElementById("caroselloNoleggiati").appendChild(cardFilmNoleggioScaduto(film));
                }
            })
        } else if (((((Date.now()-new Date(data).getTime()) / 1000 ) / 3600) < 72) && quantità > 1){
            var inserisco = "Il " + scadenza.toLocaleDateString() + "  alle " + scadenza.toLocaleTimeString();
            document.getElementById("scadenzeFilmNoleggiati").innerHTML += `
            <div class="inbox-item">
            <h6 class="inbox-item-author" style="margin-left: 0;"> ${titolo}</h6>
            <p> ${inserisco} </p>
            </div>
            `
            getUrl(BASE_URL+"movie/" + filmId + "?api_key=" + APY_KEY + "&language=en-US", function(response){
                var title = response.title
                var poster_path = response.poster_path
                var vote_average = response.vote_average
                var id = response.id
                var film = {title, poster_path, vote_average, id}      //per ogni film prendo la sua immagine
                document.getElementById("caroselloNoleggiati").appendChild(cardFilmNoleggioScadutoQuantita(film, quantità-1));
            })
            getUrl(BASE_URL+"movie/" + filmId + "?api_key=" + APY_KEY + "&language=en-US", function(response){
                var title = response.title
                var poster_path = response.poster_path
                var vote_average = response.vote_average
                var id = response.id
                var film = {title, poster_path, vote_average, id}      //per ogni film prendo la sua immagine         
                document.getElementById("caroselloNoleggiValidi").appendChild(cardFilm(film))
            })
        } else {
            var inserisco = "Il " + scadenza.toLocaleDateString() + "  alle " + scadenza.toLocaleTimeString();
            document.getElementById("scadenzeFilmNoleggiati").innerHTML += `
            <div class="inbox-item">
            <h6 class="inbox-item-author" style="margin-left: 0;"> ${titolo}</h6>
            <p> ${inserisco} </p>
            </div>
            `
            getUrl(BASE_URL+"movie/" + filmId + "?api_key=" + APY_KEY + "&language=en-US", function(response){
                var title = response.title
                var poster_path = response.poster_path
                var vote_average = response.vote_average
                var id = response.id
                var film = {title, poster_path, vote_average, id}      //per ogni film prendo la sua immagine         
                document.getElementById("caroselloNoleggiValidi").appendChild(cardFilm(film))
            })
        }
    }
    
}


//  Modifica delle in formazioni personali //
function MostraPasswordCliente() {
    var MPCPW = document.getElementById('PasswordCliente');
    if (MPCPW.value == "") {
        alert("Inserire una Password")
    } else {
        if (document.getElementById('eye').click || document.getElementById('noeye').click){
            if (MPCPW.type === "password") {
                MPCPW.setAttribute('type', 'text');
                document.getElementById('noeye').style.display = "block";         //Se bottone   document.getElementById('vedo').value = "Nascondi";                                           
                document.getElementById('eye').style.display = "none";
            } else {
                MPCPW.setAttribute('type', 'password');
                document.getElementById('eye').style.display = "block";
                document.getElementById('noeye').style.display = "none";
            }
        }
    }
    
}
function setErrorFor(cosa, dove, mex) {
	cosa.className = "form-control is-invalid"
    dove.className = "invalid-feedback"
    dove.innerText = mex;
}
function setSuccessFor(cosa, dove) {
	cosa.className = "form-control is-valid"
    dove.className = "valid-feedback"
    dove.innerText = "";
}	
function isAlfabetico(nome) {
    return /^([a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27]\s?)+$/.test(nome);
}
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
function isPasswordSicura(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}
function isTelefono(telefono) {
    return /^[0-9]{10}$/.test(telefono);
}
function isNumeriLetter(nome) {
    return /[a-zA-Z1-9]+/.test(nome);
}

//Controllo dei capi di registrazione del cliente
const formCliente = document.querySelectorAll('.needs-validation1');
const nomeCliente = document.getElementById("NomeCliente");
nomeCliente.setAttribute("value", Utente_Attivo.nome)
const cognomeCliente = document.getElementById("CognomeCliente");
cognomeCliente.setAttribute("value", Utente_Attivo.cognome)
const emailCliente = document.getElementById("EmailCliente");
emailCliente.setAttribute("value", Utente_Attivo.email)
const telefonoCliente = document.getElementById("TelefonoCliente");
telefonoCliente.setAttribute("value", Utente_Attivo.telefono)
const pwCliente = document.getElementById("PasswordCliente");
const passwordNuovaCliente = document.getElementById("PasswordNuovaCliente")
const controlloPwCliente = document.getElementById("PasswordControlloCliente");
const regioneCliente = document.getElementById("inputRegione");
regioneCliente.value = Utente_Attivo.regione
const cittaCliente = document.getElementById("inputCittà");
cittaCliente.value = Utente_Attivo.città
const indirizzoCliente = document.getElementById("inputAddress");
indirizzoCliente.setAttribute("value", Utente_Attivo.indirizzo)
var visa = document.getElementById("Visa")
var masterCard = document.getElementById("MasterCard")
var pago;

if (Utente_Attivo.metodoPagamento == "pagmentoConVisa") {
    visa.setAttribute("checked", true)
} else {
    masterCard.setAttribute("checked", true)
}

const messaggioNomeCliente = document.getElementById("messaggioNomeCliente");
const messaggioCognomeCliente = document.getElementById("messaggioCognomeCliente");
const messaggioEmailCliente = document.getElementById("messaggioEmailCliente");
const messaggioTelefonoCliente = document.getElementById("messaggioTelefonoCliente");
const messaggioPasswordCliente= document.getElementById("messaggioPasswordCliente");
const messaggioPasswordNuovaCliente = document.getElementById("messaggioPasswordNuovaCliente");
const messaggioPasswordControlloCliente = document.getElementById("messaggioPasswordControlloCliente");
const messaggioRegioneCliente = document.getElementById("messaggioRegione");
const messaggioCittaCliente = document.getElementById("messaggioCitta");
const messaggioIndirizzoCliente = document.getElementById("messaggioIndirizzo");
const messaggioPagamentoCliente = document.getElementById("messaggioPagamento");


var booleanNomeCliente = false;
var booleanCognomeCliente = false;
var booleanEmailCliente = false;
var booleanTelefonoCliente = false;
var booleanPasswordCliente = false;
var booleanPasswordNuovaCliente = false;
var booleanRegioneCliente = false;
var booleanCittaCliente = false;
var booleanIndirizzoCliente = false;
var booleanConsensoCliente = false;


(function () {
    'use strict'
Array.prototype.slice.call(formCliente)
    .forEach(function (form) {
        form.addEventListener('submit', event => {
        checkInputsCliente();
        if (!permessoCliente()) {
            event.preventDefault()
        } else {
            //form.classList.add('was-validated')
            pago = document.querySelector('input[name="pagamento"]:checked').value
            AggiornamentoDeiClienti();
            aggiornamento();
        }
    });
    })
})()
function permessoCliente() {
    if (booleanNomeCliente==true && booleanCognomeCliente==true && booleanEmailCliente==true && booleanPasswordCliente==true && booleanPasswordNuovaCliente && booleanRegioneCliente==true && booleanCittaCliente==true && booleanIndirizzoCliente==true &&  booleanTelefonoCliente === true) {
        booleanConsensoCliente = true
    }
    return booleanConsensoCliente
}
function checkInputsCliente() {
    checkNomeCliente();
	checkCognomeCliente();
	checkEmailCliente();
    checkTelefonoCliente();
    checkPasswordCliente();
    checkIndirizzoCliente();
    checkRegioneCliente();
    checkCittaCliente();
}
function checkNomeCliente() {
    const nomeClienteValue = nomeCliente.value.trim();
	if(nomeClienteValue === '' || nomeClienteValue.length < 2 || !isAlfabetico(nomeClienteValue)) {
		setErrorFor(nomeCliente, messaggioNomeCliente ,'Nome inserito non valido');
	} else {
		setSuccessFor(nomeCliente, messaggioNomeCliente);
        booleanNomeCliente = true;
	}
}
function checkCognomeCliente() {
    const cognomeClienteValue = cognomeCliente.value.trim();
    if(cognomeClienteValue === '' || cognomeClienteValue.length < 2 || !isAlfabetico(cognomeClienteValue)) {
		setErrorFor(cognomeCliente, messaggioCognomeCliente ,'Cognome inserito non valido');
	} else {
		setSuccessFor(cognomeCliente, messaggioCognomeCliente);
        booleanCognomeCliente = true;
	}
}
function checkEmailCliente() {
    const emailClienteValue = emailCliente.value.trim();
	if(emailClienteValue === '' || !isEmail(emailClienteValue)) {
		setErrorFor(emailCliente, messaggioEmailCliente, 'Email inserita non valida');
	} else {
		setSuccessFor(emailCliente, messaggioEmailCliente);
        booleanEmailCliente = true;
	}
}
function checkTelefonoCliente() {
    const telefonoClienteValue = telefonoCliente.value.trim();
    if(telefonoClienteValue === '' || !isTelefono(telefonoClienteValue)) {
		setErrorFor(telefonoCliente, messaggioTelefonoCliente ,'Numero di telefono inserito non valido');
	} else {
		setSuccessFor(telefonoCliente, messaggioTelefonoCliente);
        booleanTelefonoCliente = true;
	}
}
function checkPasswordCliente() {
    const pwClienteValue = pwCliente.value.trim();
    const pwNuovaClienteValue = passwordNuovaCliente.value.trim();
    const controlloPwClienteValue = controlloPwCliente.value.trim();

    if (pwClienteValue === "" && pwNuovaClienteValue === "" && controlloPwClienteValue === "") {
        password = Utente_Attivo.pw
        setSuccessFor(pwCliente, messaggioPasswordCliente);
        setSuccessFor(passwordNuovaCliente, messaggioPasswordNuovaCliente);
        setSuccessFor(controlloPwCliente, messaggioPasswordControlloCliente);
        booleanPasswordNuovaCliente = true;
        booleanPasswordCliente = true;
    } else {
        if (pwClienteValue !== Utente_Attivo.pw) {
        setErrorFor(pwCliente, messaggioPasswordCliente,'Password errata');
        } else if (pwClienteValue === '')  {
            setErrorFor(pwCliente, messaggioPasswordCliente,'Devi inserire la password precedente');
        } else {
            setSuccessFor(pwCliente, messaggioPasswordCliente);
            booleanPasswordCliente = true;
        }

        if(pwNuovaClienteValue === '') {
            setErrorFor(passwordNuovaCliente, messaggioPasswordNuovaCliente,'Password vuota');
        } else if (!isPasswordSicura(pwNuovaClienteValue)){
            setErrorFor(passwordNuovaCliente, messaggioPasswordNuovaCliente,'La password deve contenere almeno 8 caratteri di cui: \n - Almeno uno maiuscolo \n - Almeno uno minuscolo \n - Almeno uno numerico \n - Almeno un carattere speciale');
        } else if(pwNuovaClienteValue !== controlloPwClienteValue){
            setErrorFor(passwordNuovaCliente, messaggioPasswordNuovaCliente,'Password non corrispondente');
        } else {
            setSuccessFor(passwordNuovaCliente, messaggioPasswordNuovaCliente);
        }
        
        if(controlloPwClienteValue === '' || passwordNuovaCliente !== controlloPwClienteValue) {
            setErrorFor(controlloPwCliente, messaggioPasswordControlloCliente, 'Password inserita non corrispondente');
        } else{
            setSuccessFor(controlloPwCliente, messaggioPasswordControlloCliente);
            booleanPasswordNuovaCliente = true;
            password = pwNuovaClienteValue;
        } 
    }   
}
function checkRegioneCliente() {
    var controllo = false
    for (let i = 1; i < regioneCliente.options.length; i++) {
        const element = regioneCliente.options[i];
        if (element.selected) {
            controllo = true
            break
        } 
    }
    if (controllo != true) {
		setErrorFor(regioneCliente, messaggioRegioneCliente ,'Regione non selezionata');
    } else {
        setSuccessFor(regioneCliente, messaggioRegioneCliente);
        booleanRegioneCliente = true;
    }
}
function checkCittaCliente() {
    var controllo = false
    for (let i = 1; i < cittaCliente.options.length; i++) {
        const element = cittaCliente.options[i];
        if (element.selected) {
            controllo = true
            break
        } 
    }
    if (controllo != true || cittaCliente.options[0].selected) {
		setErrorFor(cittaCliente, messaggioCittaCliente ,'Citta non selezionata');
    } else {
        setSuccessFor(cittaCliente, messaggioCittaCliente);
        booleanCittaCliente = true;
    }
}
function controlloRegioneCliente() {
    checkRegioneCliente();
}
function controlloCittaCliente() {
    checkCittaCliente();
}
function checkIndirizzoCliente() {
    const indirizzoClienteValue = indirizzoCliente.value.trim();
    if(indirizzoClienteValue === '' || indirizzoClienteValue.length < 3 || !isNumeriLetter(indirizzoClienteValue)) {
		setErrorFor(indirizzoCliente, messaggioIndirizzoCliente ,'Indirizzo inserito non valido');
	} else {
		setSuccessFor(indirizzoCliente, messaggioIndirizzoCliente);
        booleanIndirizzoCliente = true;
	}
}

function AggiornamentoDeiClienti() {    
    var cr = {tipo: "cliente", nome: nomeCliente.value, cognome: cognomeCliente.value, email: emailCliente.value, telefono: telefonoCliente.value, pw: password, regione: regioneCliente.value, città: cittaCliente.value, indirizzo: indirizzoCliente.value, metodoPagamento: pago, filmPreferiti:  Utente_Attivo.filmPreferiti, generiScelti: Utente_Attivo.generiScelti, storico:  Utente_Attivo.storico, scadenze: Utente_Attivo.scadenza, carrello: Utente_Attivo.carrello}

    Clienti_Registrati.forEach((element, idx) => {
        if(element.email == Utente_Attivo.email){
            Clienti_Registrati[idx] = cr;
            console.log(Clienti_Registrati[idx])
        }
    })

    Utenti_Registrati.forEach((element, idx) => {
        if(element.emailUtente == Utente_Attivo.email){
            Utenti_Registrati[idx].emailUtente = emailCliente.value;
            Utenti_Registrati[idx].passwordUtente = password;
        }
    })

    localStorage.setItem("Utente_Attivo",JSON.stringify(cr));
    localStorage.setItem('Clienti_Registrati', JSON.stringify(Clienti_Registrati));
    localStorage.setItem('Utenti_Registrati', JSON.stringify(Utenti_Registrati)); 
}
function aggiornamento() {
    window.location.reload();
}


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

//ELIMINAZIONE ACCOUNT ED USCITA
function eliminaAccount() {   
    Clienti_Registrati.forEach((element, idx) => {
        if(element.email == Utente_Attivo.email){
            Clienti_Registrati.splice(idx, 1);
            localStorage.setItem("Clienti_Registrati",JSON.stringify(Clienti_Registrati));
        }
    })

    Utenti_Registrati.forEach((element, idx) => {
        if(element.emailUtente == Utente_Attivo.email){
            Utenti_Registrati.splice(idx, 1);
            localStorage.setItem("Utenti_Registrati",JSON.stringify(Utenti_Registrati));
        }
    })

    esci()
}