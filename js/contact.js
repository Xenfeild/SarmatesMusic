const select = s => document.querySelector(s);

const formBtn = select('#contactSubmit');

const REGEX_MAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// URL_DU_SERVEUR à renseigner
const urlServeur = 'php/contact.php';

let valide = 0;
let formData = new FormData();
let responseStatus, responseMsg;
const msg_MERCI = 'Votre message a bien été pris en compte. Nous vous contacterons prochainement.';
const msg_ERREUR = 'Erreur : ';

function verifValide(variable, long) {
  if (variable.value.length < long) {
    return false;
  } else {
    return true;
  }
}

formBtn.addEventListener('click', (event) => {
  event.preventDefault(); // Empêche le comportement par défaut de soumission du formulaire

  let prenom = select('#name');
  let prenomLbl = select('label[for="name"]');
  let nom = select('#surename');
  let nomLbl = select('label[for="surename"]');
  let society = select('#society');
  let mail = select('#emailContact');
  let mailLbl = select('label[for="emailContact"]');
  let message = select('#message');
  let messageLbl = select('label[for="message"]');

  if (!verifValide(prenom, 2)) {
    prenomLbl.style.color = 'red';
  } else {
    prenomLbl.style.color = 'green';
    valide++;
  }
  if (!verifValide(nom, 2)) {
    nomLbl.style.color = 'red';
  } else {
    nomLbl.style.color = 'green';
    valide++;
  }
  if (!REGEX_MAIL.test(mail.value)) {
    mailLbl.style.color = 'red';
  } else {
    mailLbl.style.color = 'green';
    valide++;
  }
  if (!verifValide(message, 10)) {
    messageLbl.style.color = 'red';
  } else {
    messageLbl.style.color = 'green';
    valide++;
  }

  if (valide === 4) {
    let reponseDansForm = select('#reponseServeur');

    // Ajouter les données du formulaire au FormData
    formData.append('name', prenom.value);
    formData.append('surename', nom.value);
    formData.append('society', society.value);
    formData.append('email', mail.value);
    formData.append('message', message.value);

    // Envoi du formulaire via fetch
    fetch(urlServeur, {
      body: formData,
      method: 'POST',
    })
      .then(function (response) {
        responseStatus = response.status;
        if (responseStatus === 200) {
          // Réinitialisation du formulaire
          prenom.value = '';
          prenomLbl.style.color = '#fff';
          nom.value = '';
          nomLbl.style.color = '#fff';
          mail.value = '';
          mailLbl.style.color = '#fff';
          message.value = '';
          messageLbl.style.color = '#fff';
          valide = 0;
          reponseDansForm.className = 'msgCtcOK';
          reponseDansForm.innerText = msg_MERCI;
        } else {
          reponseDansForm.className = 'msgCtcNOK';
          reponseDansForm.innerText = msg_ERREUR;
        }
        return response.text();
      })
      .then(function (text) {
        // Réponse du serveur
        responseMsg = JSON.parse(text);
        reponseDansForm.innerText += ' ' + responseMsg.message;
      });
  } else {
    valide = 0;
  }
});