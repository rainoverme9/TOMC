$(document).ready(() => {
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


//AGGIORNAMENTO DEI PARAMETRI
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
function isIVA(iva) {
    return /^[0-9]{11}$/.test(iva);
}
function MostraPasswordNegoziante() {
    var pass = document.getElementById('PasswordNegoziante');
    if (pass.value == "") {
        alert("Inserire una Password")
    } else {
        if (document.getElementById('vedoNegoziante').click || document.getElementById('NonVedoNegoziante').click) {
            if (pass.type === "password") {
                pass.setAttribute('type', 'text');
                document.getElementById('NonVedoNegoziante').style.display = "block";                          
                document.getElementById('vedoNegoziante').style.display = "none";
            }  else {
                pass.setAttribute('type', 'password');
                document.getElementById('NonVedoNegoziante').style.display = "none";                          
                document.getElementById('vedoNegoziante').style.display = "block";         
            }
        }
    }
}
//Controllo dei capi di registrazione del negoziante
const formNegozio = document.querySelectorAll('.needs-validation2');
const nomeNegozio = document.getElementById("nomeNegozio");
nomeNegozio.setAttribute("value", Utente_Attivo.nomeNegozio)
const telefonoNegozio = document.getElementById("telefonoNegozio");
telefonoNegozio.setAttribute("value", Utente_Attivo.telefono)
const emailNegozio = document.getElementById("EmailNegoziante");
emailNegozio.setAttribute("value", Utente_Attivo.email)
const pwNegozio = document.getElementById("PasswordNegoziante");
const passwordNuovaNegoziante = document.getElementById("PasswordNuovaNegoziante")
const controlloPwNegozio = document.getElementById("PasswordControlloNegoziante");
const regioneNegozio = document.getElementById("inputRegioneNegozio");
regioneNegozio.value = Utente_Attivo.regione
const cittaNegozio = document.getElementById("inputCittàNegozio");
cittaNegozio.value = Utente_Attivo.città
const indirizzoNegozio = document.getElementById("IndirizzoNegoziante");
indirizzoNegozio.setAttribute("value", Utente_Attivo.indirizzo)
const IVANegozio = document.getElementById("IVA");
IVANegozio.setAttribute("value", Utente_Attivo.partitaIVA)
var password;
const messaggioNomeNegozio = document.getElementById("messaggioNomeNegozio");
const messaggioTelefonoNegozio = document.getElementById("messaggioTelefonoNegozio");
const messaggioEmailNegozio = document.getElementById("messaggioEmailNegozio");
const messaggioPasswordNegozio= document.getElementById("messaggioPasswordNegozio");
const messaggioPasswordNuovaNegozio= document.getElementById("messaggioPasswordNuovaNegozio");
const messaggioPasswordControlloNegozio = document.getElementById("messaggioPasswordControlloNegoziante");
const messaggioIndirizzoNegozio = document.getElementById("messaggioIndirizzoNegozio");
const messaggioRegioneNegozio = document.getElementById("messaggioRegioneNegozio");
const messaggioCittaNegozio = document.getElementById("messaggioCittaNegozio");
const messaggioIVANegozio = document.getElementById("messaggioIVANegozio");
const messaggioPrivacyNegozio = document.getElementById("messaggioPrivacyNegozio");


var boleanNomeNegozio = false;
var booleanTelefonoNegozio = false;
var booleanEmailNegozio = false;
var booleanPasswordNegozio = false;
var booleanPasswordNuovaNegozio = false;
var booleanRegioneNegozio = false;
var booleanCittàNegozio = false;
var booleanIndirizzoNegozio = false;
var booleanIvaNegozio = false;
var booleanConsensoNegozio = false;

(function () {
    'use strict'
Array.prototype.slice.call(formNegozio)
    .forEach(function (form) {
        form.addEventListener('submit', event => {
        checkInputsNegozio();
        if (!permessoNegozio()) {
            event.preventDefault()
        } else {
            //form.classList.add('was-validated')
            AggiornamentoDeiNegozi();
            aggiornamento();
        }
    });
    })
})()
function permessoNegozio() {
    if (boleanNomeNegozio==true && booleanTelefonoNegozio==true && booleanEmailNegozio==true && booleanPasswordNuovaNegozio && booleanPasswordNegozio==true && booleanRegioneNegozio==true && booleanCittàNegozio==true && booleanIndirizzoNegozio==true &&booleanIvaNegozio==true) {
        booleanConsensoNegozio = true
    }
    return booleanConsensoNegozio
}
function checkInputsNegozio() {
    checkNomeNegozio();
	checkTelefonoNegozio();
	checkEmailNegozio();
    checkPasswordNegozio();
    checkIndirizzoNegozio();
    checkRegioneNegozio();
    checkCittaNegozio();
    checkIVANegozio();
}
function checkNomeNegozio() {
    const nomeNegozioValue = nomeNegozio.value.trim();
	if(nomeNegozioValue === '' || nomeNegozioValue.length < 1 || !isNumeriLetter(nomeNegozioValue)) {
		setErrorFor(nomeNegozio, messaggioNomeNegozio ,'Nome inserito non valido');
	} else {
		setSuccessFor(nomeNegozio, messaggioNomeNegozio);
        boleanNomeNegozio = true;
	}
}
function checkTelefonoNegozio() {
    const telefonoNegozioValue = telefonoNegozio.value.trim();
    if(telefonoNegozioValue === '' || !isTelefono(telefonoNegozioValue)) {
		setErrorFor(telefonoNegozio, messaggioTelefonoNegozio ,'Telefono inserito non valido');
	} else {
		setSuccessFor(telefonoNegozio, messaggioTelefonoNegozio);
        booleanTelefonoNegozio = true;
	}
}
function checkEmailNegozio() {
    const emailNegozioValue = emailNegozio.value.trim();
	if(emailNegozioValue === '' || !isEmail(emailNegozioValue)) {
		setErrorFor(emailNegozio, messaggioEmailNegozio, 'Email inserita non valida');
	} else {
		setSuccessFor(emailNegozio, messaggioEmailNegozio);
        booleanEmailNegozio = true;
	}
}	
function checkPasswordNegozio() {
    const pwNegozioValue = pwNegozio.value.trim();
    const pwNuovaNegozioValue = passwordNuovaNegoziante.value.trim();
    const controlloPwNegozioValue = controlloPwNegozio.value.trim();

    if (pwNegozio.value === "" && passwordNuovaNegoziante.value === "" && controlloPwNegozio.value === "") {
        password = Utente_Attivo.pw
        setSuccessFor(pwNegozio, messaggioPasswordNegozio);
        setSuccessFor(passwordNuovaNegoziante, messaggioPasswordNuovaNegozio);
        setSuccessFor(controlloPwNegozio, messaggioPasswordControlloNegozio);
        booleanPasswordNuovaNegozio = true;
        booleanPasswordNegozio = true;
    } else {
        if (pwNegozioValue !== Utente_Attivo.pw) {
        setErrorFor(pwNegozio, messaggioPasswordNegozio,'Password errata');
        } else if (pwNegozioValue === '')  {
            setErrorFor(pwNegozio, messaggioPasswordNegozio,'Devi inserire la password precedente');
        } else {
            setSuccessFor(pwNegozio, messaggioPasswordNegozio);
            booleanPasswordNegozio = true;
        }

        if(pwNuovaNegozioValue === '') {
            setErrorFor(passwordNuovaNegoziante, messaggioPasswordNuovaNegozio,'Password vuota');
        } else if (!isPasswordSicura(pwNuovaNegozioValue)){
            setErrorFor(passwordNuovaNegoziante, messaggioPasswordNuovaNegozio,'La password deve contenere almeno 8 caratteri di cui: \n - Almeno uno maiuscolo \n - Almeno uno minuscolo \n - Almeno uno numerico \n - Almeno un carattere speciale');
        } else if(pwNuovaNegozioValue !== controlloPwNegozioValue){
            setErrorFor(passwordNuovaNegoziante, messaggioPasswordNuovaNegozio,'Password non corrispondente');
        } else {
            setSuccessFor(passwordNuovaNegoziante, messaggioPasswordNuovaNegozio);
        }
        
        if(controlloPwNegozioValue === '' || pwNuovaNegozioValue !== controlloPwNegozioValue) {
            setErrorFor(controlloPwNegozio, messaggioPasswordControlloNegozio, 'Password inserita non corrispondente');
        } else{
            setSuccessFor(controlloPwNegozio, messaggioPasswordControlloNegozio);
            booleanPasswordNuovaNegozio = true;
            password = pwNuovaNegozioValue;
        } 
    }       
}
function checkRegioneNegozio() {
    var controllo = false
    for (let i = 1; i < regioneNegozio.options.length; i++) {
        const element = regioneNegozio.options[i];
        if (element.selected) {
            controllo = true
            break
        } 
    }
    if (controllo != true) {
		setErrorFor(regioneNegozio, messaggioRegioneNegozio ,'Regione non selezionata');
    } else {
        setSuccessFor(regioneNegozio, messaggioRegioneNegozio);
        booleanRegioneNegozio = true;
    }
}
function checkCittaNegozio() {
    var controllo = false
    for (let i = 1; i < cittaNegozio.options.length; i++) {
        const element = cittaNegozio.options[i];
        if (element.selected) {
            controllo = true
            break
        } 
    }
    if (controllo != true || cittaNegozio.options[0].selected) {
		setErrorFor(cittaNegozio, messaggioCittaNegozio ,'Citta non selezionata');
    } else {
        setSuccessFor(cittaNegozio, messaggioCittaNegozio);
        booleanCittàNegozio = true;
    }
}
function checkIndirizzoNegozio() {
    const indirizzoNegozioValue = indirizzoNegozio.value.trim();
    if(indirizzoNegozioValue === '' || indirizzoNegozioValue.length < 4 || !isNumeriLetter(indirizzoNegozioValue)) {
		setErrorFor(indirizzoNegozio, messaggioIndirizzoNegozio ,'Indirizzo inserito non valido');
	} else {
		setSuccessFor(indirizzoNegozio, messaggioIndirizzoNegozio);
        booleanIndirizzoNegozio = true;
	}
}
function checkIVANegozio() {
    const IVANegozioValue = IVANegozio.value.trim();
    if(IVANegozioValue === '' || !isNumeriLetter(IVANegozioValue)) {
		setErrorFor(IVANegozio, messaggioIVANegozio ,'IVA inserito non valido');
	} else {
		setSuccessFor(IVANegozio, messaggioIVANegozio);
        booleanIvaNegozio = true;
	}
}
function controlloRegioneNegozio() {
    checkRegioneNegozio();
}
function controlloCittaNegozio() {
    checkCittaNegozio();
}
function  AggiornamentoDeiNegozi() {
    var nr = {tipo: "negoziante",  nomeNegozio: nomeNegozio.value, telefono: telefonoNegozio.value, email: emailNegozio.value, pw: password, regione: regioneNegozio.value, città: cittaNegozio.value, indirizzo: indirizzoNegozio.value, partitaIVA: IVANegozio.value, filmVetrina: Utente_Attivo.filmVetrina, recensioni: Utente_Attivo.recensioni,storico: Utente_Attivo.storico}
    Negozianti_Registrati.forEach((element, idx) => {
        if(element.email == Utente_Attivo.email){
            Negozianti_Registrati[idx] = nr
        }
    })

    Utenti_Registrati.forEach((element, idx) => {
        if(element.emailUtente == Utente_Attivo.email){
            Utenti_Registrati[idx].emailUtente = emailNegozio.value
            Utenti_Registrati[idx].passwordUtente = password;
        }
    })

    localStorage.setItem("Utente_Attivo",JSON.stringify(nr));
    localStorage.setItem('Negozianti_Registrati', JSON.stringify(Negozianti_Registrati));
    localStorage.setItem('Utenti_Registrati', JSON.stringify(Utenti_Registrati)); 
}
function aggiornamento() {
    window.location.reload();
}


//ELIMINAZIONE ACCOUNT
function eliminaAccount() {   
    Negozianti_Registrati.forEach((element, idx) => {
        if(element.email == Utente_Attivo.email){
            Negozianti_Registrati.splice(idx, 1);
            localStorage.setItem("Negozianti_Registrati",JSON.stringify(Negozianti_Registrati));
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