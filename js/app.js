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

// more button
var moreBtn = document.getElementById('moreBtn');
var containerMore = document.getElementById('containerMore');

moreBtn.addEventListener('click', function() {
  containerMore.classList.toggle('expand');
  
  if (containerMore.classList.contains('expand')) {
    moreBtn.textContent = 'Voir moins';
  } else {
    moreBtn.textContent = 'Voir plus';
  }
});

// validate Newsletter

document.getElementById("newsletterForm").addEventListener('submit', function (e) {
  e.preventDefault();
  var error;
  var email = document.getElementById('email');
  var checkNewsletter = document.getElementById("checkNewsletter");

  if (!email.value) {
    error = "Mettez votre adresse e-mail pour recevoir la newsletter";
  } else if (email.value.indexOf("@") === -1 || email.value.indexOf(".") === -1) {
    error = "Veuillez entrer une adresse e-mail valide";
  }

  if (!checkNewsletter.checked) {
    error = "Veuillez valider la case de confirmation pour recevoir votre newsletter";
  }

  if (error) { 
    e.preventDefault();
    alert(error);
    return false;
  } else {
    // Si la vérification est réussie, vous pouvez autoriser la soumission
    this.removeEventListener('submit', arguments.callee);
    this.submit();
    alert("Vous êtes inscrit à la newsletter");
    
  }
});


// validate Contact

document.getElementById("contactForm").addEventListener('submit', function (e) {
  e.preventDefault();
  var contactError;
  var email = document.getElementById('emailContact');
  var surename = document.getElementById('surename');
  var name = document.getElementById('name');
  var message = document.getElementById('message');

  if (!surename.value) {
    contactError = "Veuillez entrer votre nom";
  } 

  if (!name.value) {
    contactError = "Veuillez entrer votre prénom";
  }

  if (!email.value) {
    contactError = "Mettez votre adresse e-mail pour envoyer votre message";
  } else if (email.value.indexOf("@") === -1 || email.value.indexOf(".") === -1) {
    contactError = "Veuillez entrer une adresse e-mail valide";
  }

  if (contactError) { 
    e.preventDefault();
    alert(contactError);
    return false;
  } else {
    // Si la vérification est réussie, vous pouvez autoriser la soumission
    this.removeEventListener('submit', arguments.callee);
    this.submit();
    alert("Votre message a été envoyé avec succès !");
  }
});

