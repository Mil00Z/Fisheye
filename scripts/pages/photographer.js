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


export async function getPhotographerMedias(currentId) {

    const response = await fetch('./data/photographers.json');
    const datas = await response.json();

    let mediaFiltered = datas.media.filter((media) => media.photographerId === Number(currentId));

    // console.log(`données des médias du photographe d'ID:${currentId}`, mediaFiltered);

    return mediaFiltered;
}


export function getPhotographerId() {

    let urlParams = new URLSearchParams(window.location.search);

    let photographerId = urlParams.get('id');

    return photographerId;

}


async function init() {

    // const currentPhotographerId = getPhotographerId();

    const currentPhotographerData = await getPhotographer(getPhotographerId());

    const currentPhotographerMedia = await getPhotographerMedias(getPhotographerId());

    // Display All of Datas Page
    displayHeader(currentPhotographerData,'.photographer_header');

    displayMedias(currentPhotographerMedia,'.photographer_media');

    displayFooter(currentPhotographerData,currentPhotographerMedia,'.photographer_more');

    dataInContactModal(currentPhotographerData);

}



export function getAdjacentModalMedia(mediasArray,mediaId) {

    let allMediasIndex = mediasArray.map((item) => item.id ); 
    console.log('**AllMediasID',allMediasIndex);

    let currentIndex = allMediasIndex.indexOf(mediaId); 
    // console.log('***TargetMediaID',currentIndex);

    //get previous media : if is it the first, index is the last
    let prevMediaId = (currentIndex) === 0 ? allMediasIndex[allMediasIndex.length -1] : allMediasIndex[currentIndex - 1] ;

    //get next media : if is it the last, index is the first
    let nextMediaId = allMediasIndex[currentIndex + 1] ?? allMediasIndex[0];
    // console.log('-- PrevMediaId',prevMediaId);
    // console.log('++ NextMediaId',nextMediaId);

    return [prevMediaId,nextMediaId];
    
}

function displayHeader(photographerDatas,targetAction) {

    const {name,city,country,tagline,portrait,price,id} = photographerDatas;

    const photographerPageHeader = document.querySelector(`${targetAction}`);

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

    btnContactModal.addEventListener('keydown',(e) => {

            if(e.key === "Enter"){

                displayModal('#contact_modal');
                // console.log('Display Modal');

            };

    });

}

function displayMedias(photographerMedia,targetAction) {

    const photographerPageMedia = document.querySelector(`${targetAction}`);

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
                mediaAssets.setAttribute('controls','');
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

                setModalMedia(currentMediaDatas,'#media_modal .modal-content');

                // Gets Some datas adjacents ID
                let adjacentsMediaId = getAdjacentModalMedia(photographerMedia,id);

                
                adjacentsMediaId.forEach((adjacentItemId,index) => {

                    let adjacentMedia = getCurrentMedia(photographerMedia,adjacentItemId);

                    // console.log(`adjacent media numéro ${index}`,adjacentMedia);

                    // Inject Visuals Assets to Check if the Script is correct
                    // setModalMedia(adjacentMedia,'#media_modal .modal-all-content');

                });

                //Show the Modal
                displayModal('#media_modal');


            //Buttons Actions
            let prevButtons = document.querySelector('.player-buttons.prev-media');
            let nextButtons = document.querySelector('.player-buttons.next-media');

            prevButtons.addEventListener('click', () =>{

                let prevMedia = getCurrentMedia(photographerMedia,adjacentsMediaId[0]);

                console.log('**Previous Media Datas**', prevMedia);

                document.querySelector('#media_modal .modal-content .modal-item > img').setAttribute('src',`../assets/photographers/${prevMedia.image}`);

                // setModalMedia(prevMedia,'#media_modal .modal-content');

            });


            nextButtons.addEventListener('click', () =>{

    
                let nextMedia = getCurrentMedia(photographerMedia,adjacentsMediaId[1]);

                console.log('**Next Media Datas**', nextMedia);

                document.querySelector('#media_modal .modal-content .modal-item > img').setAttribute('src',`../assets/photographers/${nextMedia.image}`);

                // setModalMedia(nextMedia,'#media_modal .modal-content');

            });

        });

    }

}


function modalNavigation() {
 
}
 

function setModalMedia(currentMedia,target) {

    // Target element for Injection
    let elementTarget = document.querySelector(`${target}`);

    const {title,image,video,likes,date,price,id,photographerId} = currentMedia;

    let modalItem = document.createElement('article');

    //pas meilleur moyen efficace de récupérer le nom sans faire un traitement "lourd" sur jeux de données croisées
    // => exemple de pk certaines querySelector sur des elements crées peuvent etre utiles
    let name = document.querySelector('.photographer-name').textContent;
    modalItem.classList.add('modal-item');
    modalItem.dataset.mediaId = `${id}`;

    // modalItem.style.setProperty('background-image',`url(../assets/photographers/${image})`);
    if (video) {
    modalItem.innerHTML = `
        <video src="../assets/photographers/${video}" alt="Video ${title} de ${name}" controls/>
    ` } else {
        modalItem.innerHTML = `
        <img src="../assets/photographers/${image}" alt="Photographie ${title} de ${name}"/>`
    }

//    if (document.querySelector('.modal-item')){

//         document.querySelector('.modal-item')

//    }


    elementTarget.append(modalItem);
}


export function getCurrentMedia(mediaArray,mediaId) {

    // const currentMedia = mediaArray.find((m) => m.id == mediaId);
    // console.log(currentMedia);

    let currentIndex = mediaArray.findIndex((m) => m.id == mediaId); 
    const currentMedia = mediaArray[currentIndex];

    return currentMedia;

}

function displayFooter(photographerDatas,photographerMediaDatas,targetAction) {

    const {price} = photographerDatas;
    const {likes} = photographerMediaDatas;

    const photographerMoreMedia = document.querySelector(`${targetAction}`);

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