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
