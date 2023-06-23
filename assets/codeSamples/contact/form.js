const select = s => document.querySelector(s);

const formBtn = select('#sendForm');

const REGEX_MAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


//URL_DU_SERVEUR a renseigner
const urlServeur = 'https://URL_DU_SERVEUR/mailForm.php';

let valide = 0;
let formData = new FormData();
let responseStatus, responseMsg, msgServeur;
const msg_MERCI = 'Votre message a bien été pris en compte. Nous vous contacterons prochainement. ';
const msg_ERREUR = 'Erreur : ';

function verifValide(variable, long) {
    if (variable.value.length < long) {
        return false;
    } else {
        return true;
    }
}

formBtn.addEventListener('click', () => {
    let prenom = select('#prenom');
    let prenomLbl = select('#prenomLbl');
    let nom = select('#nom');
    let nomLbl = select('#nomLbl');
    let ent = select('#entr');
    let mail = select('#mail');
    let mailLbl = select('#mailLbl');
    let msg = select('#msg');
    let msgLbl = select('#msgLbl');


    if (!verifValide(prenom, 2)) {
        prenomLbl.style.color = 'red';
    } else {
        prenomLbl.style.color = 'green';
        valide++;
    };
    if (!verifValide(nom, 2)) {
        nomLbl.style.color = 'red';
    } else {
        nomLbl.style.color = 'green';
        valide++;
    };
    if (!REGEX_MAIL.test(mail.value)) {
        mailLbl.style.color = 'red';
    } else {
        mailLbl.style.color = 'green';
        valide++;
    };
    if (!verifValide(msg, 10)) {
        msgLbl.style.color = 'red';
    } else {
        msgLbl.style.color = 'green';
        valide++;
    };

    if (valide === 4) {
        let reponseDansForm = select('#reponseServeur');

        // On fait l'objet à envoyer pour PHP
        formData.append('prenom', prenom.value);
        formData.append('nom', nom.value);
        formData.append('tel', ent.value);
        formData.append('email', mail.value);
        formData.append('message', msg.value);

        //fetch formData
        fetch(urlServeur, {
                body: formData,
                method: "post",

            })
            .then(function (response) {
                responseStatus = response.status;
                if (responseStatus == 200) {
                    // Reset de la form
                    prenom.value = "";
                    prenomLbl.style.color = '#000';
                    nom.value = "";
                    nomLbl.style.color = '#000';
                    mail.value = "";
                    mailLbl.style.color = '#000';
                    ent.value = "";
                    msg.value = "";
                    msgLbl.style.color = '#000';
                    valide = 0;
                    reponseDansForm.className = 'msgCtcOK';
                    reponseDansForm.innerText = msg_MERCI;
                } else {
                    reponseDansForm.className = 'msgCtcNOK';
                    reponseDansForm.innerText = msg_ERREUR;
                }
                return response.text();
            }).then(function (text) {
                //Réponse du serveur
                responseMsg = JSON.parse(text);
                reponseDansForm.innerText += ' '+responseMsg.message;
            });
    } else valide = 0;
});
