import sliderContent from "./sliderContent.js";

const mediaSize = window.innerWidth < 769 ? 'm' : 'xl';
const tempoImage = 6000;
const sliderArea = document.querySelector('.slider');
const imgFolder = mediaSize == 'm' ? './img/m/' : './img/';

// changing mediaSize
if (mediaSize == 'm') {
    // modify the :root css rules
    const root = document.querySelector(':root');
    root.style.setProperty('--inset-x', '60px');
    root.style.setProperty('--inset-y', '50px');
    root.style.setProperty('--inset-blur', '150px');
}

const sliderContentLength = sliderContent.length -1;
sliderContent.init = function () {
    this.forEach( (elt, idx) => {
        const fileExtension = elt.imageUrl.split('.').pop();
        let backDiv;
        // Background
        if (fileExtension == 'mp4') {
            backDiv = document.createElement('video');
            backDiv.preload = true;
            backDiv.autoplay = true;
            backDiv.muted = true;
            backDiv.loop = true;
            backDiv.classList.add('videoBg');
            const videoSrc = document.createElement('source');
            videoSrc.src = imgFolder + elt.imageUrl;
            videoSrc.type = 'video/mp4';
            backDiv.appendChild(videoSrc);
            const trackSrc = document.createElement('track');
            trackSrc.src = imgFolder + elt.imageUrl.split('.')[0]+'.vtt';
            trackSrc.kind = 'captions';
            trackSrc.srclang = 'fr';
            trackSrc.label = 'french_captions';
            backDiv.appendChild(trackSrc);
        }
        else {
            backDiv = document.createElement('div');
            backDiv.classList.add('slideBg');
            const bgImg = 'url("'+imgFolder + elt.imageUrl+'")';
            backDiv.style.backgroundImage = bgImg;
        }

        backDiv.id = 'slide'+idx;
        if (idx > 0) {
            if (idx %2 == 0)
                backDiv.style.transform="translateX(-100%)";
            else
                backDiv.style.transform="translateX(100%)";
        }

        sliderArea.appendChild(backDiv);
        if (fileExtension == 'mp4') {
            const shadowDiv = document.createElement('div');
            shadowDiv.classList.add('videoShadow');
            sliderArea.appendChild(shadowDiv);
        }
        // Text
        const textDiv = document.createElement('div');
        textDiv.id = 'text'+idx;
        if (idx %2 == 0)
            textDiv.style.transform="translateX(100%)";
        else
            textDiv.style.transform="translateX(-100%)";
        textDiv.classList.add('textBg');
        textDiv.textContent = elt.title;
        if (elt.bouton && elt.boutonUrl) {
            const btnDiv = document.createElement('button');
            btnDiv.id = 'btn'+idx;
            btnDiv.classList.add('btnSlide');
            textDiv.appendChild(btnDiv);
            const urlDiv = document.createElement('a');
            urlDiv.href = elt.boutonUrl;
            urlDiv.textContent = elt.bouton;
            btnDiv.appendChild(urlDiv);
        }
        sliderArea.appendChild(textDiv);
    });
}

function slide() {
    let counter = 0;
        
    setInterval(function() {
        // Background
        if (counter == 0) {
            document.querySelector('#slide'+sliderContentLength).style.transform='translateX(100%)';
            document.querySelector('#text'+sliderContentLength).style.transform='translateX(-100%)';
            document.querySelector('#text'+sliderContentLength).style.opacity = 0;
        }
        else {
            if (counter%2 == 0) {
                document.querySelector('#slide'+(counter-1)).style.transform='translateX(100%)';
                document.querySelector('#text'+(counter-1)).style.transform='translateX(-100%)';
                document.querySelector('#text'+(counter-1)).style.opacity = 0;
            }
            else {
                document.querySelector('#slide'+(counter-1)).style.transform='translateX(-100%)';
                document.querySelector('#text'+(counter-1)).style.transform='translateX(100%)';
                document.querySelector('#text'+(counter-1)).style.opacity = 0;
            }
        }
        document.querySelector('#slide'+counter).style.transform='translateX(0)';
        if (document.querySelector('#slide'+(counter)).nodeName == 'VIDEO')
            document.querySelector('.videoShadow').style.opacity = 1;
        else {
            if (document.querySelector('.videoShadow') != null)
                document.querySelector('.videoShadow').style.opacity = 0;
        }

        document.querySelector('#text'+(counter)).style.transform='translateX(0)';
        document.querySelector('#text'+(counter)).style.opacity = 1;
        counter++;
        if (counter > sliderContentLength)
            counter = 0;
    }, tempoImage);
};

sliderContent.init();
slide();