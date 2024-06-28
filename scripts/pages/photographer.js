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

    const {name} = photographerDatas;

    const photographerPageHeader = document.querySelector('.photograph-header');

    photographerPageHeader.innerHTML = `<h3>${name}</h3><button class="contact_button" onclick="displayModal()">Contactez-moi</button>`

}

init();