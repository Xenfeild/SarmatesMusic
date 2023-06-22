const arts = document.querySelectorAll('#automated details');

const closeAllArticle = () => {
    arts.forEach(a => a.open = false);
} 

arts.forEach(article => {
    article.addEventListener('click', () => {
        closeAllArticle();
    })
});