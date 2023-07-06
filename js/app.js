const nav = document.querySelector('nav');
const burger = document.querySelector('#burgerIcon');





nav.addEventListener('click', () => {
    showMenu();
});

const showMenu = () => {
    if (nav.style.visibility == 'visible') {
        nav.style.visibility='hidden';
        burger.classList.remove('active');
    } else {
        nav.style.visibility='visible';
        burger.classList.add('active');
    }
    
}

// validate Newsletter

document.getElementById("newsletterForm").addEventListener('submit', function (send) {
  send.preventDefault();
  var error;
  var email = document.getElementById('email');
  var checkNewsletter = document.getElementById("checkNewsletter");

  if (!email.value) {
    error = "mettez votre adresse e-mail pour recevoir la newsletter"
  } else if (email.value.indexOf("@") === -1 || email.value.indexOf(".") === -1) {
    error = ("Veuillez entrer une adresse e-mail valide");
  }

  if (!checkNewsletter.checked) {
    error = "veuillez valider la case de confirmation pour recevoir votre newsletter"
  }

  if (error){ 
    send.preventDefault();
    document.getElementById("newsletterError").innerHTML = error;
    return false;
  } else {

  alert("Vous êtes inscrit à la newsletter")
  }
})


// validate Contact

document.getElementById("contactForm").addEventListener('submit', function (e) {
  e.preventDefault();
  var contactError;
  var email = document.getElementById('emailContact');
  var surename = document.getElementById('surename') 
  var name = document.getElementById('name') 

  if (!surename.value) {
    contactError =" veuillez entrer votre nom"
  } 

  if (!name.value) {
    contactError = "veuillez entrer votre prénom"
  }

  if (!email.value) {
    contactError = "mettez votre adresse e-mail pour envoyer votre message"
  } else if (email.value.indexOf("@") === -1 || email.value.indexOf(".") === -1) {
    contactError = ("Veuillez entrer une adresse e-mail valide");
  }


  if (contactError){ 
    e.preventDefault();
    document.getElementById("contactError").innerHTML = contactError;
    return false;
  } else {

  alert("Votre message a bien été envoyé")
  }
})

