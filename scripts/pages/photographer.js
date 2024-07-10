// import {photographerMediaTemplate} from "../templates/photographerMedia.js";
import {displayModal,closeModal,dataInContactModal} from "../utils/contactForm.js";

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

    displayMedias(currentPhotographerMedia);

    displayFooter(currentPhotographerData,currentPhotographerMedia);

    dataInContactModal(currentPhotographerData);

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
        <button class="cta-button modal-trig-button" title="contact ${name}">Contactez-moi</button>
    </div>
    <div class="header-right" data-text="${price} euros / jour">
        <img src="/assets/photographers/${portrait}" class="photographer-thumbnail" alt="Picture of Photographer ${name}" title="Photographer ${name}">
    </div>`;

    const btnContactModal = document.querySelector('.modal-trig-button');

    btnContactModal.addEventListener('click',()=> {

        displayModal('#contact_modal');

        // console.log('Display Modal');

    });

}

function displayMedias(photographerMedia) {

    const photographerPageMedia = document.querySelector('.photographer_media');

    for (let mediaElement in photographerMedia) {

        let {id,title,image,video,likes,date,price} = photographerMedia[mediaElement];

        const assetPath = `../assets/photographers`;

        const article = document.createElement( 'a' );
            article.classList.add('card','card-media-photographer');
            article.setAttribute('href',`#media_modal`);
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


            // Create Event after Element in same context
            article.addEventListener("click",()=>{

                let currentMediaDatas = getCurrentMedia(photographerMedia,id);

                console.log(`Données de l'élèment courant clické'`, currentMediaDatas);

                setModalMedia('#media_modal .modal-content',currentMediaDatas);

                //Finally
                displayModal('#media_modal');

            });
            
    }


    // photographerMedia.forEach((media) => {
    //     console.log(media);
    //     const mediaModel = photographerMediaTemplate(media);
    //     const mediaCardDOM = mediaModel.getMediaCardDOM()
    //     photographerPageMedia.append(mediaCardDOM)
    // });
}

function setModalMedia(target,currentMedia) {

    // Target element for Injection
    let elementTarget = document.querySelector(`${target}`);

    const {title,image,likes,date,price,id,photographerId} = currentMedia;


    let modalItem = document.createElement('article');
    
    //pas meilleur moyen efficace de récupérer le nom sans faire un traitement "lourd" sur jeux de données croisées
    // => exemple de pk certaines querySelector sur des elements crées peuvent etre utiles
    let name = document.querySelector('.photographer-name').textContent;
    modalItem.classList.add('modal-item');
    modalItem.dataset.mediaId = `${id}`;

    // modalItem.style.setProperty('background-image',`url(../assets/photographers/${image})`);

    modalItem.innerHTML = `
        <img src="../assets/photographers/${image}" alt="Photographie ${title} de ${name}"/>
    `;

   
    
    elementTarget.append(modalItem);
}


function getCurrentMedia(mediaArray,mediaId) {

    // const currentMedia = mediaArray.find((m) => m.id == mediaId);
    // console.log(currentMedia);

    let currentIndex = mediaArray.findIndex((m) => m.id == mediaId); 
    const currentMedia = mediaArray[currentIndex];

    return currentMedia;

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

    const likesSum2 = photographerMediaDatas.reduce((acc,curr) =>{

            return acc + curr.likes ; 

    },0);
    // console.log('reduce',likesSum2);


    // Display Values
    photographerMoreMedia.innerHTML = `
    <div class="photographer-likes">
    ${likesSum} <i class="fa-solid fa-heart"></i>
    </div>
    <div class="photographer-pricing"> 
        ${price} $ / jour
    </div> `;
}




//CALL Major function
init();