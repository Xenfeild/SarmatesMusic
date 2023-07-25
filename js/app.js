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
const moreBtn = document.getElementById('moreBtn');
const containerMore = document.getElementById('containerMore');

moreBtn.addEventListener('click', function() {
  containerMore.classList.toggle('expand');
  
  if (containerMore.classList.contains('expand')) {
    moreBtn.textContent = 'Voir moins';
  } else {
    moreBtn.textContent = 'Voir plus';
  }
});

// validate Newsletter

// document.getElementById("sib-form").addEventListener('submit', function (e) {
//   e.preventDefault();
//   var error;
//   var email = document.getElementById('EMAIL');
//   var checkNewsletter = document.getElementById("OPT_IN");

//   if (!email.value) {
//     error = "Mettez votre adresse e-mail pour recevoir la newsletter";
//   } else if (email.value.indexOf("@") === -1 || email.value.indexOf(".") === -1) {
//     error = "Veuillez entrer une adresse e-mail valide";
//   }

//   if (!checkNewsletter.checked) {
//     error = "Veuillez valider la case de confirmation pour recevoir votre newsletter";
//   }

//   if (error) { 
//     // e.preventDefault();
//     alert(error);
//     return false;
//   } else {
//     // Si la vérification est réussie, vous pouvez autoriser la soumission
//     this.removeEventListener('submit', arguments.callee);
//     this.submit();
//     alert("Vous êtes inscrit à la newsletter");
    
//   }
// });


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

// carousel gallery

// function previous() {
//   const galleryContent = document.querySelector('.galleryContent');
//   const widthGallery = document.querySelector('.gallery').offsetWidth;
//   const scrollLeft = galleryContent.scrollLeft;
//   const maxScrollLeft = galleryContent.scrollWidth - galleryContent.clientWidth;

//   if (scrollLeft === 0) {
//       galleryContent.scrollLeft = maxScrollLeft;
//   } else {
//       galleryContent.scrollLeft -= widthGallery;
//   }
// }

// function next () {
//   const galleryContent = document.querySelector('.galleryContent');
//   const widthGallery = document.querySelector('.gallery').offsetWidth;
//   const scrollLeft = galleryContent.scrollLeft;
//   const maxScrollLeft = galleryContent.scrollWidth - galleryContent.clientWidth;

//   if (scrollLeft + widthGallery >= maxScrollLeft) {
//       galleryContent.scrollLeft = 0;
//   } else {
//       galleryContent.scrollLeft += widthGallery;
//   }
// }

function previous() {
  const galleryContent = document.querySelector('.galleryContent');
  const widthGallery = document.querySelector('.gallery').offsetWidth;
  galleryContent.scrollLeft -= widthGallery;
}

function next() {
  const galleryContent = document.querySelector('.galleryContent');
  const widthGallery = document.querySelector('.gallery').offsetWidth;
  galleryContent.scrollLeft += widthGallery;
}

function openPopup(imageSrc, altText) {
  const popup = document.createElement('div');
  popup.className = 'popupPhoto';

  const img = document.createElement('img');
  img.src = imageSrc;

  const title = document.createElement('div'); 
  title.textContent = altText;
  title.className = 'popupTitle'; 

  const titleText = document.createElement('p'); 
  titleText.textContent = altText; 

  const closeBtn = document.createElement('span');
  closeBtn.innerHTML = '&times;';
  closeBtn.className = 'popupPhoto-close';
  closeBtn.onclick = closePopup;

  popup.appendChild(img);
  title.appendChild(titleText);
  popup.appendChild(title);
  popup.appendChild(closeBtn);

  document.body.appendChild(popup);
}

function closePopup() {
  const popup = document.querySelector('.popupPhoto');
  popup.parentNode.removeChild(popup);
}
