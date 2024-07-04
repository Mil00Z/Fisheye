//Mettre le code JavaScript lié à la page photographer.html


async function getPhotographer(currentId) {

    const response = await fetch('./data/photographers.json');
    const datas = await response.json();

    // console.log(datas);

    return datas.photographers.find((p)=>p.id === Number(currentId));
}

function getPhotographerId() {

    const urlParams = new URLSearchParams(window.location.search);

    const photographerId = urlParams.get('id');

    return photographerId;

}

async function init() {

    const currentPhotographerId = getPhotographerId();


    const currentPhotographerData = await getPhotographer(currentPhotographerId);

    // console.log(currentPhotographerData);
     
    displayHeader(currentPhotographerData);

}

function displayHeader(photographerDatas) {

    const {name,city,country,tagline,portrait,price,id} = photographerDatas;

    const photographerPageHeader = document.querySelector('.photograph-header');

    photographerPageHeader.innerHTML = `
    <div class="header-left">
        <h3 class="photographer-name" data-id="${id}">${name}</h3>
        <a class="photographer-city" href="https://www.google.com/maps/search/${city}">${city}, ${country}</a>
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