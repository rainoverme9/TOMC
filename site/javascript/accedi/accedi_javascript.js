//FUNZIONI GENERALI
//Mostra la Form di registrazione del Cliente o del Negoziante
function showForm(){
    var value = document.getElementById('ChiSiRegistra').value;
    console.log("Opzione cambiata " + value);
    var form = document.getElementById('section_' + value);
    console.log('section_' + value);
    var sections = document.getElementsByTagName('section')
    for(i=0; i< sections.length; i++){
        sections[i].style.display = "none";
    }
    form.style.display = "block";
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
function isIVA(iva) {
    return /^[0-9]{11}$/.test(iva);
}



//  !!!  CLIENTI  !!! //
//Mostra la password del cliente
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
//Controllo dei capi di registrazione del cliente
const formCliente = document.querySelectorAll('.needs-validation1');
const nomeCliente = document.getElementById("NomeCliente");
const cognomeCliente = document.getElementById("CognomeCliente");
const emailCliente = document.getElementById("EmailCliente");
const telefonoCliente = document.getElementById("TelefonoCliente");
const pwCliente = document.getElementById("PasswordCliente");
const controlloPwCliente = document.getElementById("PasswordControlloCliente");
const regioneCliente = document.getElementById("inputRegione");
const cittaCliente = document.getElementById("inputCittà");
const indirizzoCliente = document.getElementById("inputAddress");
var pago;
const lista = document.getElementsByName('pagamento');


const messaggioNomeCliente = document.getElementById("messaggioNomeCliente");
const messaggioCognomeCliente = document.getElementById("messaggioCognomeCliente");
const messaggioEmailCliente = document.getElementById("messaggioEmailCliente");
const messaggioTelefonoCliente = document.getElementById("messaggioTelefonoCliente");
const messaggioPasswordCliente= document.getElementById("messaggioPasswordCliente");
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
var booleanRegioneCliente = false;
var booleanCittaCliente = false;
var booleanIndirizzoCliente = false;
var booleanConsensoCliente = false;


(function () {
    'use strict'
Array.prototype.slice.call(formCliente)
    .forEach(function (form) {
        form.addEventListener('submit', event => {
        //event.preventDefault()
        checkInputsCliente();

        if (!permessoCliente() || !form.checkValidity()) {
            event.preventDefault()
        } else {
            form.classList.add('was-validated')
            console.log("Registrazione avvenuta con successo")
            if (document.getElementById('ChiSiRegistra').value == "cliente") {
                pago = document.querySelector('input[name="pagamento"]:checked').value
                RegistrazioneDeiClienti();
            }
        }
    });
    }, false);
})()
function permessoCliente() {
    if (booleanNomeCliente==true && booleanCognomeCliente==true && booleanEmailCliente==true && booleanPasswordCliente==true && booleanRegioneCliente==true && booleanCittaCliente==true && booleanIndirizzoCliente==true &&  booleanTelefonoCliente === true) {
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
    for (let i = 0; i < Utenti_Registrati.length; i++) {
        const emailDaVerificare = Utenti_Registrati[i].emailUtente;
        if (emailClienteValue == emailDaVerificare) {
            setErrorFor(emailCliente, messaggioEmailCliente, 'Email precedentemente registrata');
            booleanEmailCliente = false;
            break
        }
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
    const controlloPwClienteValue = controlloPwCliente.value.trim();
	if(pwClienteValue === '') {
		setErrorFor(pwCliente, messaggioPasswordCliente,'Password vuota');
	} else if (!isPasswordSicura(pwClienteValue)){
        setErrorFor(pwCliente, messaggioPasswordCliente,'La password deve contenere almeno 8 caratteri di cui: \n - Almeno uno maiuscolo \n - Almeno uno minuscolo \n - Almeno uno numerico \n - Almeno un carattere speciale');
    } else if(pwClienteValue !== controlloPwClienteValue){
        setErrorFor(pwCliente, messaggioPasswordCliente,'Password non corrispondente');
    } else {
		setSuccessFor(pwCliente, messaggioPasswordCliente);
	}
	
	if(controlloPwClienteValue === '' || pwClienteValue !== controlloPwClienteValue) {
		setErrorFor(controlloPwCliente, messaggioPasswordControlloCliente, 'Password inserita non corrispondente');
	} else {
		setSuccessFor(controlloPwCliente, messaggioPasswordControlloCliente);
        booleanPasswordCliente = true;
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
function RegistrazioneDeiClienti() {
    var cr = {tipo: 'cliente', nome: nomeCliente.value, cognome: cognomeCliente.value, email: emailCliente.value, telefono: telefonoCliente.value, pw: pwCliente.value, regione: regioneCliente.value, città: cittaCliente.value, indirizzo: indirizzoCliente.value, metodoPagamento: pago, filmPreferiti: [], generiScelti: [], storico:  {filmAcquistati:[], filmNoleggiiati:[]}, carrello: {daAcquistare: [], daNoleggiare:[]}}
    var clientiArray = JSON.parse(localStorage.getItem('Clienti_Registrati'));
    clientiArray.push(cr);
    localStorage.setItem('Clienti_Registrati', JSON.stringify(clientiArray));
    RegistrazioneUtenti(emailCliente.value, pwCliente.value, "cliente")
    localStorage.setItem("Utente_Attivo",JSON.stringify(cr));
    window.location.replace('./pagineDelSito/cliente/home_cliente.html')           
    console.log(Utente_Attivo)
}


//  !!! NEGOZIANTI  !!! //
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
const telefonoNegozio = document.getElementById("telefonoNegozio");
const emailNegozio = document.getElementById("EmailNegoziante");
const pwNegozio = document.getElementById("PasswordNegoziante");
const controlloPwNegozio = document.getElementById("PasswordControlloNegoziante");
const regioneNegozio = document.getElementById("inputRegioneNegozio");
const cittaNegozio = document.getElementById("inputCittàNegozio");
const indirizzoNegozio = document.getElementById("IndirizzoNegoziante");
const IVANegozio = document.getElementById("IVA");

const messaggioNomeNegozio = document.getElementById("messaggioNomeNegozio");
const messaggioTelefonoNegozio = document.getElementById("messaggioTelefonoNegozio");
const messaggioEmailNegozio = document.getElementById("messaggioEmailNegozio");
const messaggioPasswordNegozio= document.getElementById("messaggioPasswordNegozio");
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
        //event.preventDefault()
        checkInputsNegozio();
        
        if (!permessoNegozio() || !form.checkValidity()) {
            event.preventDefault()
        } else {
            form.classList.add('was-validated')
            console.log("Registrazione avvenuta con successo")
            if (document.getElementById('ChiSiRegistra').value =="negoziante") {
                RegistrazioneDeiNegozianti();
            }
        }
    });
    }, false);
})()
function permessoNegozio() {
    if (boleanNomeNegozio==true && booleanTelefonoNegozio==true && booleanEmailNegozio==true && booleanPasswordNegozio==true && booleanRegioneNegozio==true && booleanCittàNegozio==true && booleanIndirizzoNegozio==true &&booleanIvaNegozio==true) {
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
    for (let i = 0; i < Utenti_Registrati.length; i++) {
        const emailDaVerificare = Utenti_Registrati[i].emailUtente;
        if (emailNegozioValue == emailDaVerificare) {
            setErrorFor(emailNegozio, messaggioEmailNegozio, 'Email precedentemente registrata');
            booleanEmailNegozio = false;
            break
        }
    }
}	
function checkPasswordNegozio() {
    const pwNegozioValue = pwNegozio.value.trim();
    const controlloPwNegozioValue = controlloPwNegozio.value.trim();
	if(pwNegozioValue === '') {
		setErrorFor(pwNegozio, messaggioPasswordNegozio,'Password vuota');
	} else if (!isPasswordSicura(pwNegozioValue)){
        setErrorFor(pwNegozio, messaggioPasswordNegozio,'La password deve contenere almeno 8 caratteri di cui: \n - Almeno uno maiuscolo \n - Almeno uno minuscolo \n - Almeno uno numerico \n - Almeno un carattere speciale');
    } else if(pwNegozioValue !== controlloPwNegozioValue){
        setErrorFor(pwNegozio, messaggioPasswordNegozio,'Password non corrispondente');
    } else {
		setSuccessFor(pwNegozio, messaggioPasswordNegozio);
	}
	
	if(controlloPwNegozioValue === '' || pwNegozioValue !== controlloPwNegozioValue) {
		setErrorFor(controlloPwNegozio, messaggioPasswordControlloNegozio, 'Password inserita non corrispondente');
	} else{
		setSuccessFor(controlloPwNegozio, messaggioPasswordControlloNegozio);
        booleanPasswordNegozio = true;
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
function RegistrazioneDeiNegozianti() {
    var nr = { tipo: 'negoziante', nomeNegozio: nomeNegozio.value, telefono: telefonoNegozio.value, email: emailNegozio.value, pw: pwNegozio.value, regione: regioneNegozio.value, città: cittaNegozio.value, indirizzo: indirizzoNegozio.value, partitaIVA: IVANegozio.value, filmVetrina: [], recensioni: [], storico: {Acquisti:[], Noleggii:[], noleggiScaduti: []}}
    var negoziantiArray = JSON.parse(localStorage.getItem('Negozianti_Registrati'));
    negoziantiArray.push(nr);
    localStorage.setItem('Negozianti_Registrati', JSON.stringify(negoziantiArray));
    RegistrazioneUtenti(emailNegozio.value, pwNegozio.value, "negozio")
    localStorage.setItem("Utente_Attivo",JSON.stringify(nr));
    window.location.replace('./pagineDelSito/negoziante/home_negoziante.html')      
    console.log(Utente_Attivo)

}

//Metto gli utenti in un unico array di oggetti --> Ottimizzazione accesso e ricerche successive
function RegistrazioneUtenti(email, pw, tipo) {
    var utente = { emailUtente: email, passwordUtente: pw, tipoUtente: tipo}
    var utentiRegistratiArray = JSON.parse(localStorage.getItem('Utenti_Registrati'));
    utentiRegistratiArray.push(utente);
    localStorage.setItem('Utenti_Registrati', JSON.stringify(utentiRegistratiArray));
}


//  !!!  LOGIN   !!! //
const formLogin = document.querySelectorAll('.needs-validation');
const messaggioEmail = document.getElementById("messaggioEmail");
const messaggioPassword = document.getElementById("messaggioPassword");

var vof = false;
(function () {
    'use strict'
Array.prototype.slice.call(formLogin)
    .forEach(function (form) {
        form.addEventListener('submit', event => {
        //event.preventDefault()  
        messaggiErroreEmail();
        
        if (!permessoLogin() || !form.checkValidity()) {
            event.preventDefault();
        } else {
            var login_Email = document.getElementById("login_Email").value;
            var login_Password = document.getElementById("login_Password").value;
            for (let i = 0; i < Utenti_Registrati.length; i++) {
                const emailDaVerificare = Utenti_Registrati[i].emailUtente;
                const pwDaVerificare = Utenti_Registrati[i].passwordUtente;
                const cheTipoUtente = Utenti_Registrati[i].tipoUtente;
                if (login_Email == emailDaVerificare && login_Password == pwDaVerificare) {
                    AccediAlSito(cheTipoUtente, login_Email)
                    break
                }
            }
        }
        //form.classList.add('was-validated')
    }, false);
    })
})()
function permessoLogin() {
    var login_Email = document.getElementById("login_Email").value;
    var login_Password = document.getElementById("login_Password").value;
    for (let i = 0; i < Utenti_Registrati.length; i++) {
        const emailDaVerificare = Utenti_Registrati[i].emailUtente;
        const pwDaVerificare = Utenti_Registrati[i].passwordUtente;
        if (login_Email == emailDaVerificare && login_Password == pwDaVerificare) {
            vof = true
            break
        }
    }
    return vof
}
function messaggiErroreEmail() {
    const login_Email = document.getElementById("login_Email");
    const login_Password = document.getElementById("login_Password");
    
    //Filtro gli utenti registrati con quell'email  --> se esiste accedo, se non esiste invio il messaggio di registrarsi
    const utente = Utenti_Registrati.filter(account => account.emailUtente == login_Email.value)
    console.log(utente, utente.length)
    if (utente.length == 0) {
        setErrorFor(login_Email, messaggioEmail, 'Non sei ancora registrato');
        //setErrorFor(login_Password, messaggioPassword, ' ');
    } else {
        setSuccessFor(login_Email, messaggioEmail);
         
        const pwDaVerificare = utente[0].passwordUtente;
        console.log(login_Password.value, "ps ut", pwDaVerificare, "pw reg");
        if (login_Password.value == ""){
            setErrorFor(login_Password, messaggioPassword, 'Devi inserire la password per accedere');
        }  else {
            setSuccessFor(login_Password, messaggioPassword);
        }
        if (login_Password.value !== pwDaVerificare){
            setErrorFor(login_Password, messaggioPassword, 'Password inserita errata');
        } else {
            setSuccessFor(login_Password, messaggioPassword);
        }
        
    }
    
}

function mexErrore() {
    const login_Email = document.getElementById("login_Email");
    
    //Filtro gli utenti registrati con quell'email  --> se esiste accedo, se non esiste invio il messaggio di registrarsi
    const utente = Utenti_Registrati.filter(account => account.emailUtente == login_Email.value)
    console.log(utente, utente.length)
    if (utente.length == 0) {
        setErrorFor(login_Email, messaggioEmail, 'Non sei ancora registrato');
        //setErrorFor(login_Password, messaggioPassword, ' ');
    } else {
        setSuccessFor(login_Email, messaggioEmail);
    }
}

//Definisco l'active user al login
function AccediAlSito(cheTipoUtente, login_Email) {
    if (cheTipoUtente == "cliente") {
        for (let i = 0; i < Clienti_Registrati.length; i++) {
            const elemento = Clienti_Registrati[i].email;
            if (login_Email == elemento) {
                localStorage.setItem("Utente_Attivo",JSON.stringify(Clienti_Registrati[i]));
            }
        }
        window.location.replace('./pagineDelSito/cliente/home_cliente.html');           
    } else {
        for (let i = 0; i < Negozianti_Registrati.length; i++) {
            const elemento = Negozianti_Registrati[i].email;
            if (login_Email == elemento) {
                localStorage.setItem("Utente_Attivo",JSON.stringify(Negozianti_Registrati[i]));
            }
        }
        window.location.replace('./pagineDelSito/negoziante/home_negoziante.html')      
    }
    console.log(Utente_Attivo)
}
