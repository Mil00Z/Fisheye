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
    displayFooter(currentPhotographerData,currentPhotographerMedia);


    //MODAL Treatment
    // document.querySelector('.modal-photographer-name').textContent = currentPhotographerData.name;
}

function displayHeader(photographerDatas) {

    const {name,city,country,tagline,portrait,price,id} = photographerDatas;

    const photographerPageHeader = document.querySelector('.photographer_header');

    photographerPageHeader.innerHTML = `
    <div class="header-left">
        <h3 class="photographer-name" data-id="${id}">${name}</h3>
        <a class="photographer-city" href="https://www.google.com/maps/search/${city}" title="OpenCity on google Maps">${city}, ${country}</a>
        <span class="photographer-tagline">${tagline}</span>
    </div> 
    <div class="header-middle">
        <button class="cta-button contact_button" title="contact ${name}" onclick="displayModal()">Contactez-moi</button>
    </div>
    <div class="header-right" data-text="${price} euros / jour">
        <img src="/assets/photographers/${portrait}" class="photographer-thumbnail" alt="Picture of Photographer ${name}" title="Photographer ${name}">
    </div>`

}

function displayMedia(photographerMedia) {

    const photographerPageMedia = document.querySelector('.photographer_media');

    for (let mediaElement in photographerMedia) {

        let {id,title,image,video,likes,date,price} = photographerMedia[mediaElement];

        console.log(photographerMedia[mediaElement]);

        const assetPath = `../assets/photographers`;

        const article = document.createElement( 'a' );
            article.classList.add('card','card-media-photographer');
            article.setAttribute('href',`./media.html?id=${id}`);
            article.setAttribute('aria-label',`Lien vers la page du média ${title}`);
            article.dataset.mediaId = `${id}`;
            article.dataset.pricing = `${price}`;


        let mediaAssets;

            if(video) {

                mediaAssets = document.createElement( 'video' );
            } else {
                 mediaAssets = document.createElement( 'img' );
            }

            mediaAssets.classList.add('photographer-media-assets');
            mediaAssets.setAttribute("src", `${assetPath}/${video ?? image}`);
            mediaAssets.dataset.release = `${date}`;

            const mediaTexts = document.createElement('div');
            mediaTexts.classList.add('photographer-media-bottom');
            
            const mediaTitle = document.createElement( 'h2' );
            mediaTitle.classList.add('photographer-media-title')
            mediaTitle.textContent = `${title}`;
            

            const mediaLikes = document.createElement('span');
            mediaLikes.classList.add('photographer-media-likes');
            mediaLikes.innerHTML = `${likes} <i class="fa-solid fa-heart"></i>`;

            mediaTexts.append(mediaTitle,mediaLikes);


            const mediaDate = document.createElement('span');
            mediaDate.classList.add('photographer-media-date');
            mediaDate.textContent = `${date}`;


            // const mediaPricing = document.createElement('p');
            // mediaPricing.classList.add('photographer-pricing');
            // mediaPricing.textContent = `${price} euros`;

            //Push data in Target Element
            article.append(mediaAssets,mediaTexts);

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

function displayFooter(photographerDatas,photographerMediaDatas) {

    const {price} = photographerDatas;
    const {likes} = photographerMediaDatas;

    const photographerMoreMedia = document.querySelector('.photographer_more');

    // Get SUm of Likes Globally
    let likesSum = 0;

    photographerMediaDatas.forEach((element) => {
        
         likesSum += element.likes ;
        
    });

    // const likesSum = Object.values(photographerMediaDatas).reduce((acc,curr) =>{

    //         return acc.likes + curr.likes; 

    // },0);

    // Display Values
    photographerMoreMedia.innerHTML = `
    <div class="photographer-likes">
    ${likesSum} <i class="fa-solid fa-heart"></i>
    </div>
    <div class="photographer-pricing"> 
        ${price} $ / jour
    </div> `;

    // document.body.append(photographerMoreMedia);

}

//CALL Major function
init();