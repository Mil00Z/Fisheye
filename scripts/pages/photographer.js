import {photographerMediaTemplate} from "../templates/photographerMedia.js";

// let currentPhotographerMedia = {};

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

    // const currentPhotographerId = getPhotographerId();

    const currentPhotographerData = await getPhotographer(getPhotographerId());

    const currentPhotographerMedia = await getPhotographerMedias(getPhotographerId());

    // Display All of Datas Page
    displayHeader(currentPhotographerData);
    displayMedia(currentPhotographerMedia);


    //MODAL Treatment
    // document.querySelector('.modal-photographer-name').textContent = currentPhotographerData.name;
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

function displayMedia(photographerMedia) {

    const photographerPageMedia = document.querySelector('.photographer_media');

    for (const mediaElement in photographerMedia) {

        let objectData = photographerMedia[mediaElement];
        const assetPath = `../assets/photographers/${objectData.video}` ?? `../assets/photographers/${objectData.image}`;

        console.log(objectData);

        const article = document.createElement( 'a' );
            article.classList.add('card','card-media-photographer');
            article.setAttribute('href',`./media.html?id=${objectData.id}`);
            article.setAttribute('aria-label',`Lien vers la page du média ${objectData.title}`);
            article.dataset.mediaId = `${objectData.id}`;

            const mediaAssets = document.createElement( 'video' );
            mediaAssets.classList.add('photographer-media-video');
            mediaAssets.setAttribute("src", assetPath);

            const mediaTitle = document.createElement( 'h2' );
            mediaTitle.classList.add('photographer-media-title')
            mediaTitle.textContent = `${objectData.title}`;
            
            const mediaLikes = document.createElement('span');
            mediaLikes.classList.add('photographer-media-likes');
            mediaLikes.textContent = `${objectData.likes} personnes ont ❤`;

            const mediaDate = document.createElement('span');
            mediaDate.classList.add('photographer-media-date');
            mediaDate.textContent = `${objectData.date}`;

            const mediaPricing = document.createElement('p');
            mediaPricing.classList.add('photographer-pricing');
            mediaPricing.textContent = `${objectData.price} euros`;

            //Push data in Target Element
            article.append(mediaAssets,mediaTitle,mediaPricing,mediaDate,mediaLikes);

            // Push Target Element in DOM
            photographerPageMedia.append(article);
            
    }

    
    

    // photographerMedia.forEach((media) => {

    //     console.log(media);
        
    //     const mediaModel = photographerMediaTemplate(media);

    //     const mediaCardDOM = mediaModel.getMediaCardDOM()

    //     photographerPageMedia.append(mediaCardDOM)
    // });

}

//CALL Major function
init();