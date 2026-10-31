const venditori = [
    {
        "tipo": "negoziante",
        "nomeNegozio": "FilmOni!",
        "telefono": "3636633999",
        "email": "filmOni@info.it",
        "pw": "1",
        "regione": "Lombardia",
        "città": "Milano",
        "indirizzo": "Via Dante 40",
        "partitaIVA": "09876543210",
        "filmVetrina": [
            {
                "id": 617502,
                "prezzoDiAcquisto": 6.50.toFixed(2),
                "prezzoDiNoleggio": 2.99.toFixed(2) 
            },
            {
                "id": 774825,
                "prezzoDiAcquisto": 12.50.toFixed(2) ,
                "prezzoDiNoleggio": 7.99.toFixed(2) 
            },
            {
                "id": 795514,
                "prezzoDiAcquisto": 10.50.toFixed(2) ,
                "prezzoDiNoleggio": 4.99.toFixed(2) 
            },
            {
                "id": 817648,
                "prezzoDiAcquisto": 6.50.toFixed(2) ,
                "prezzoDiNoleggio": 2.99.toFixed(2) 
            },
            {
                "id": 425909,
                "prezzoDiAcquisto": 9.99.toFixed(2) ,
                "prezzoDiNoleggio": 5.50.toFixed(2) 
            },
            {
                "id": 680,
                "prezzoDiAcquisto": 12.50.toFixed(2) ,
                "prezzoDiNoleggio": 8.99.toFixed(2) 
            }
        ],
        "storico": {
            "Acquisti": [
                {
                    "id": "774825",
                    "titolo": "The Ice Age Adventures of Buck Wild",
                    "quantità": 2,
                    "prezzo": 12.50.toFixed(2) 
                }
            ],
            "Noleggii": [
                {
                    "id": "617502",
                    "titolo": "Jolt",
                    "emailCliente": "mario.paluso@yahoo.it",
                    "quantità": 1,
                    "scadenza": "2022-01-30T22:33:52.221Z",
                    "verificato": true,
                    "prezzo": 6.50.toFixed(2) 
                }
            ],
            "noleggiScaduti": [
                {
                    "id": "617502",
                    "titolo": "Jolt",
                    "quantità": 1,
                    "prezzo": 6.50.toFixed(2) 
                }
            ]
        },
        "recensioni": []
    },
    {
        "tipo": "negoziante",
        "nomeNegozio": "CinemaCage",
        "telefono": "3455996865",
        "email": "cinemaCage@info.it",
        "pw": "1",
        "regione": "Sardegna",
        "città": "Cagliari",
        "indirizzo": "Piazza Albertini 45",
        "partitaIVA": "12345678901",
        "filmVetrina": [
            {
                "id": 385128,
                "prezzoDiAcquisto": 12.99.toFixed(2) ,
                "prezzoDiNoleggio": 6.50.toFixed(2) 
            },
            {
                "id": 774825,
                "prezzoDiAcquisto": 6.50.toFixed(2) ,
                "prezzoDiNoleggio": 2.50.toFixed(2) 
            },
            {
                "id": 795514,
                "prezzoDiAcquisto": 9.99.toFixed(2) ,
                "prezzoDiNoleggio": 5.50.toFixed(2) 
            },
            {
                "id": 817648,
                "prezzoDiAcquisto": 6.50.toFixed(2) ,
                "prezzoDiNoleggio": 2.50.toFixed(2) 
            }
        ],
        "storico": {
            "Acquisti": [
                {
                    "id": "385128",
                    "titolo": "F9",
                    "quantità": 1,
                    "prezzo": 9.50.toFixed(2) 
                }
            ],
            "Noleggii": [],
            "noleggiScaduti": [],
        },
        "recensioni": [
            {
                "voto": 3,
                "titolo": "Servizio rapido",
                "testo": "Ottimo il servizio fornito da questo negozio, completamente soddisfatto!",
                "emailUtente": "mario.paluso@yahoo.it"
            },
            {
                "voto": 5,
                "titolo": "Servizio rapido",
                "testo": "Ottimo il servizio fornito da questo negozio, completamente soddisfatto!",
                "emailUtente": "luca.paluso@yahoo.it"
            }
        ]
    }
]
const clienti = [
    {
        "tipo": "cliente",
        "nome": "Mario",
        "cognome": "Paluso",
        "email": "mario.paluso@yahoo.it",
        "telefono": "3339455498",
        "pw": "1",
        "regione": "Sicilia",
        "città": "Agrigento",
        "indirizzo": "Via San Sebastiano 20",
        "metodoPagamento": "o3",
        "filmPreferiti": [
            522016,
            568124,
            496243
        ],
        "generiScelti": [
            28,
            35,
            14
        ],
        "storico": {
            "filmAcquistati": [
                {
                    "titolo": "The Ice Age Adventures of Buck Wild",
                    "id": "774825",
                    "emailNegozio": "filmOni@info.it",
                    "prezzo": 12.50.toFixed(2) 
                },
                {
                    "titolo": "F9",
                    "id": "385128",
                    "emailNegozio": "cinemaCage@info.it",
                    "prezzo": 6.50.toFixed(2) 
                }
            ],
            "filmNoleggiiati": [
                {
                    "titolo": "Sing 2",
                    "id": "438695",
                    "emailNegozio": "filmOni@info.it",
                    "scadenza": "2022-01-29T18:20:06.666Z",
                    "prezzo": 3.99.toFixed(2) ,
                    "quantità": 1
                },
                {
                    "titolo": "Jolt",
                    "id": "617502",
                    "emailNegozio": "filmOni@info.it",
                    "scadenza": "2022-01-30T22:33:52.221Z",
                    "prezzo": 1.50.toFixed(2) ,
                    "quantità": 1
                }
            ]
        },
        "carrello": {
            "daAcquistare": [
                {
                    "titolo": "The Fallout",
                    "id": "795514",
                    "emailNegozio": "filmOni@info.it",
                    "prezzo": 10.50.toFixed(2) 
                }
            ],
            "daNoleggiare": []
        }
    },
    {
        "tipo": "cliente",
        "nome": "Arianna",
        "cognome": "Lampugnano",
        "email": "ariannalampugnano2000@gmail.com",
        "telefono": "3455443443",
        "pw": "1",
        "regione": "Lombardia",
        "città": "Milano",
        "indirizzo": "Via Dante 37",
        "metodoPagamento": "o3",
        "filmPreferiti": [],
        "generiScelti": [
            28
        ],
        "storico": {
            "filmAcquistati": [
                {
                    "titolo": "F9",
                    "id": "385128",
                    "emailNegozio": "filmOni@info.it",
                    "prezzo": 9.99.toFixed(2) 
                },
                {
                    "titolo": "The Ice Age Adventures of Buck Wild",
                    "id": "774825",
                    "emailNegozio": "filmOni@info.it",
                    "prezzo": 10.50.toFixed(2) 
                }
            ],
            "filmNoleggiiati": [
                {
                    "titolo": "Sing 2",
                    "id": "438695",
                    "emailNegozio": "filmOni@info.it",
                    "scadenza": "2022-01-29T18:22:08.903Z",
                    "prezzo": 3.99.toFixed(2) ,
                    "quantità": 1
                }
            ]
        },
        "carrello": {
            "daAcquistare": [],
            "daNoleggiare": []
        }
    }
]
const utenti = [
    {
        "emailUtente": "filmOni@info.it",
        "passwordUtente": "1",
        "tipoUtente": "negozio"
    },
    {
        "emailUtente": "mario.paluso@yahoo.it",
        "passwordUtente": "1",
        "tipoUtente": "cliente"
    },
    {
        "emailUtente": "ariannalampugnano2000@gmail.com",
        "passwordUtente": "1",
        "tipoUtente": "cliente"
    },
    {
        "emailUtente": "cinemaCage@info.it",
        "passwordUtente": "1",
        "tipoUtente": "negozio"
    }
]

//  Tutti gli utenti
if (window.localStorage.hasOwnProperty("Utenti_Registrati")) {
    var Utenti_Registrati = JSON.parse(localStorage.getItem('Utenti_Registrati'));
} else {
    localStorage.setItem("Utenti_Registrati",JSON.stringify(utenti));
    var Utenti_Registrati = JSON.parse(localStorage.getItem('Utenti_Registrati'));
}

//  Negozianti
if (window.localStorage.hasOwnProperty("Negozianti_Registrati")) {
    var Negozianti_Registrati = JSON.parse(localStorage.getItem('Negozianti_Registrati'));
} else {
    localStorage.setItem("Negozianti_Registrati",JSON.stringify(venditori));
    var Negozianti_Registrati = JSON.parse(localStorage.getItem('Negozianti_Registrati'));
}

//  Clienti
if (window.localStorage.hasOwnProperty("Clienti_Registrati")) {
    var Clienti_Registrati = JSON.parse(localStorage.getItem('Clienti_Registrati'));
} else {
    localStorage.setItem("Clienti_Registrati",JSON.stringify(clienti));
    var Clienti_Registrati = JSON.parse(localStorage.getItem('Clienti_Registrati'));
}

if (window.localStorage.hasOwnProperty("Utente_Attivo")) {              
    var Utente_Attivo = JSON.parse(localStorage.getItem('Utente_Attivo'));
} else {           
    localStorage.setItem("Utente_Attivo",JSON.stringify("nessun utente loggato"));         
    var Utente_Attivo = JSON.parse(localStorage.getItem('Utente_Attivo')); 
}

if (Utente_Attivo.tipo === "negoziante") {              
    window.location.replace('./pagineDelSito/negoziante/home_negoziante.html')      
} else if (Utente_Attivo.tipo === "cliente") {   
    window.location.replace('./pagineDelSito/cliente/home_cliente.html')           
}
