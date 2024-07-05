//Mettre le code JavaScript lié à la page photographer.html
let currentPhotographerMedia = [];

async function getPhotographer(currentId) {

    const response = await fetch('./data/photographers.json');
    const datas = await response.json();

    let photographerFinded = datas.photographers.find((photographer) => photographer.id === Number(currentId));

    console.log(`données du photographe d'ID:${currentId}`, photographerFinded);

    return photographerFinded;
}


async function getPhotographerMedias(currentId) {

    const response = await fetch('./data/photographers.json');
    const datas = await response.json();

    // console.log(datas);

    let mediaFiltered = datas.media.filter((media) => media.photographerId === Number(currentId));

    console.log(`données des médias du photographe d'ID:${currentId}`, mediaFiltered);

    return mediaFiltered;
}

function getPhotographerId() {

    let urlParams = new URLSearchParams(window.location.search);

    let photographerId = urlParams.get('id');

    return photographerId;

}

async function init() {

    const currentPhotographerId = getPhotographerId();

    const currentPhotographerData = await getPhotographer(currentPhotographerId);

    // console.log(currentPhotographerData);
     
    displayHeader(currentPhotographerData);

    currentPhotographerMedia = getPhotographerMedias(currentPhotographerId);
    displayMedia(currentPhotographerMedia);

    //MODAL Treatment
    document.querySelector('.modal-photographer-name').textContent = currentPhotographerData.name;

}

function displayMedia(photographerMedia) {


    const photographerPageMedia = document.querySelector('.photograph-media');

    photographerMedia.forEach((element,index) => {

        console.log(element,index);
        
    });

}

function displayHeader(photographerDatas) {

    const {name,city,country,tagline,portrait,price,id} = photographerDatas;

    const photographerPageHeader = document.querySelector('.photograph-header');

    photographerPageHeader.innerHTML = `
    <div class="header-left">
        <h3 class="photographer-name" data-id="${id}">${name}</h3>
        <a class="photographer-city" href="https://www.google.com/maps/search/${city}" title="OpenCity on google Maps">${city}, ${country}</a>
        <span class="photographer-tagline">${tagline}</span>
    </div> 
    <div class="header-middle">
        <button class="contact_button" data-target="${name}" onclick="displayModal()">Contactez-moi</button>
    </div>
    <div class="header-right" data-text="${price} euros / jour">
        <img src="/assets/photographers/${portrait}" class="photographer-thumbnail" alt="Photographer ${name}">
    </div>`

}

init();