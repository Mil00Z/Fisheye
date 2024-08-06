// import {photographerMediaTemplate} from "../templates/photographerMedia.js";

import {displayModal,dataInContactModal} from "../utils/contactForm.js";

import {CardMedia,ModalItem} from "../templates/photographerMedia.js";

//Call the dataArray before the functions Call Datas
let currentPhotographerMedia = [];


async function getPhotographer(currentId) {

    try {

        const response = await fetch('./data/photographers.json');
        const datas = await response.json();
    
        let photographerFinded = datas.photographers.find((photographer) => photographer.id === Number(currentId));
    
        console.log(`données du photographe d'ID:${currentId}`, photographerFinded);
    
        return photographerFinded;

    } catch {

        const errorMessage = 'Pas de datas disponibles';

        let errorArea = document.createElement('div');;
        errorArea.classList.add('debeug');
        errorArea.textContent = `${errorMessage}`;
        document.body.append(errorArea);

        //Display Log error
        throw new Error (errorMessage);

    }

}


export async function getPhotographerMedias(currentId) {

    try {
        
        const response = await fetch('./data/photographers.json');
        const datas = await response.json();
    
        let mediaFiltered = datas.media.filter((media) => media.photographerId === Number(currentId));
    
        return mediaFiltered;
        
    } catch {

        const errorMessage = 'Pas de datas disponibles';

        let errorArea = document.createElement('div');;
        errorArea.classList.add('debeug');
        errorArea.textContent = `${errorMessage}`;
        document.body.append(errorArea);

        //Display Log error
        throw new Error (errorMessage);
    }

}


export function getPhotographerId() {

    let urlParams = new URLSearchParams(window.location.search);

    let photographerId = urlParams.get('id');

    return photographerId;

}

async function init() {

    const currentPhotographerData = await getPhotographer(getPhotographerId());

    currentPhotographerMedia = await getPhotographerMedias(getPhotographerId());

    // Display All of Datas Page
    displayHeader(currentPhotographerData,'.photographer_header');

    displayMedias(currentPhotographerMedia,'.photographer_media');

    displayFooter(currentPhotographerData,currentPhotographerMedia,'.photographer_more');

    dataInContactModal(currentPhotographerData);


    watchingTheCoreMedia();

}



//  function getAdjacentModalMedia(mediasArray,mediaId) {

//     let allMediasIndex = mediasArray.map((item) => item.id ); 
//     console.log('**AllMediasID',allMediasIndex);

//     let currentIndex = allMediasIndex.indexOf(mediaId); 
//     // console.log('***TargetMediaID',currentIndex);

//     //get previous media : if is it the first, index is the last
//     let prevMediaId = (currentIndex) === 0 ? allMediasIndex[allMediasIndex.length -1] : allMediasIndex[currentIndex - 1] ;

//     //get next media : if is it the last, index is the first
//     let nextMediaId = allMediasIndex[currentIndex + 1] ?? allMediasIndex[0];
    

//     return [prevMediaId,nextMediaId];
    
// }

function displayHeader(photographerDatas,targetAction) {

    const {name,city,country,tagline,portrait,price,id} = photographerDatas;

    const photographerPageHeader = document.querySelector(`${targetAction}`);

    photographerPageHeader.innerHTML = `
    <div class="header-left">
        <h1 class="photographer-name" data-id="${id}">${name}</h1>
        <a class="photographer-city" href="https://www.google.com/maps/search/${city}" title="OpenCity on google Maps">${city}, ${country}</a>
        <span class="photographer-tagline">${tagline}</span>
    </div> 
    <div class="header-middle">
        <button class="cta-button modal-trig-button" aria-label="modal de contact de ${name}" aria-controls="contact_modal">Contactez-moi</button>
    </div>
    <div class="header-right" data-text="${price} euros / jour">
        <img src="./assets/photographers/${portrait}" class="photographer-thumbnail" alt="Picture of Photographer ${name}" title="Photographer ${name}">
    </div>`;


    const btnContactModal = document.querySelector('.modal-trig-button');
    btnContactModal.addEventListener('click',()=> {

        displayModal('#contact_modal');

    });

    btnContactModal.addEventListener('keydown',(e) => {

            if(e.key === "Enter"){

                displayModal('#contact_modal');
             
            };

    });

}


function displayMedias(photographerMedia,targetAction) {

    const photographerPageMedia = document.querySelector(`${targetAction}`);

    photographerPageMedia.innerHTML = '';
    photographerMedia.forEach((mediaElement,index) =>{

        let {title,image,video,likes,date} = mediaElement;
    
        //Testing Datas to Create Element
        let type;
        let source;
            
            if(video){
    
                type = 'video';
                source = video;
    
            } else {
    
                type = 'image';
                source = image;
            }

            const cardMedia = new CardMedia(index,type,source,title,likes,date);
            let theMedia = cardMedia.createMedia();
            let article = cardMedia.createCard(theMedia);

            // setTimeout(photographerPageMedia.append(article),5000);

            // Push Target Element in DOM
            photographerPageMedia.append(article);
    
            // Create Event after Element in same context
            article.querySelector('.photographer-media-title').addEventListener("click",()=> {

                    openLightBox(index);

                });

            });
    
}



function openLightBox(mediaIndex) {
 
    let currentIndex = mediaIndex;

    function displayCurrentMedia() {

        const currentMedia = currentPhotographerMedia[currentIndex];

        console.log('**Media Clicked',currentPhotographerMedia[currentIndex]);

        let type;
        let source;
        
        if(currentMedia.video){

            type = 'video';
            source = currentMedia.video;

        } else {

            type = 'image';
            source = currentMedia.image;
        }

        // New Card Element : get Object, datas from Parent and New Item Media
        let currentItem = new ModalItem(currentIndex,type,source,currentMedia.title);
        let currentMediaItem = currentItem.createMedia();
        currentItem.createItem(currentMediaItem);
        
        //Show me Your Assets
        displayModal('#media_modal');
    }


    displayCurrentMedia();

    function nextMedia () {

        currentIndex++;

        if (currentIndex === currentPhotographerMedia.length) {

            currentIndex = 0;

        }

        document.querySelector('.modal-item img,.modal-item video').remove();
        document.querySelector('.modal-item-title').remove();
        
        displayCurrentMedia();
    }


    function prevMedia() {

        currentIndex--;

         if (currentIndex === -1) {

            currentIndex = currentPhotographerMedia.length - 1;
         }


         document.querySelector('.modal-item img,.modal-item video').remove()
         document.querySelector('.modal-item-title').remove();

         displayCurrentMedia();
    }


    let nextButtons = document.querySelector('.player-buttons.next-media');
    let prevButtons = document.querySelector('.player-buttons.prev-media');

    nextButtons.addEventListener('click',nextMedia);
    prevButtons.addEventListener('click',prevMedia);

    //Page Photographer Behavior Keyboar Navigation
    document.querySelector('.photographer').addEventListener('keydown',(e)=>{

        console.log(e);

        if (e.key === "ArrowRight"){

            nextMedia();
            console.log('next Media');

        } else if (e.key === "ArrowLeft") {

            prevMedia();
            console.log('prev Media');
        }
    });

}
 

// function setModalMedia(currentMedia,target) {

//     // Target element for Injection
//     let elementTarget = document.querySelector(`${target}`);

//     const {title,image,video,likes,date,price,id,photographerId} = currentMedia;

//     let modalItem = document.createElement('article');

//     //pas meilleur moyen efficace de récupérer le nom sans faire un traitement "lourd" sur jeux de données croisées
//     // => exemple de pk certaines querySelector sur des elements crées peuvent etre utiles
//     let name = document.querySelector('.photographer-name').textContent;
//     modalItem.classList.add('modal-item');
//     modalItem.dataset.mediaId = `${id}`;

//     // modalItem.style.setProperty('background-image',`url(../assets/photographers/${image})`);
//     if (video) {
//     modalItem.innerHTML = `
//         <video src="../assets/photographers/${video}" alt="Video ${title} de ${name}" controls/>
//     ` } else {
//         modalItem.innerHTML = `
//         <img src="../assets/photographers/${image}" alt="Photographie ${title} de ${name}"/>`
//     }

// //    if (document.querySelector('.modal-item')){

// //         document.querySelector('.modal-item')

// //    }


//     elementTarget.append(modalItem);
// }


function getCurrentMedia(mediaArray,mediaId) {

    // const currentMedia = mediaArray.find((m) => m.id == mediaId);
    // console.log(currentMedia);

    let currentIndex = mediaArray.findIndex((m) => m.id == mediaId); 
    const currentMedia = mediaArray[currentIndex];

    return currentMedia;

}

function displayFooter(photographerDatas,photographerMediaDatas,targetAction) {

    const {price} = photographerDatas;
    
    const photographerMoreMedia = document.querySelector(`${targetAction}`);

    // Get SUm of Likes Globally
    let likesSum = 0;

    photographerMediaDatas.forEach((element) => {
        
         likesSum += element.likes ;
        
    });

    // const likesSum2 = photographerMediaDatas.reduce((acc,curr) =>{

    //         return acc + curr.likes ; 

    // },0);
    // console.log('reduce',likesSum2);


    // Display Values
    photographerMoreMedia.innerHTML = `
    <div class="photographer-likes">
    <span class="likes-total-count">${likesSum}</span>
    <i class="fa-solid fa-heart aria-hiden="true" title="nombre total de likes du photographe"></i>
    </div>
    <div class="photographer-pricing"> 
        ${price} euros / jour
    </div> `;
}

// Plan B si jamais la solution est jugée "trop difficile"
function countSumLikes(){



}


//Filter Feature
let mediaFilter = document.querySelector('#type-media-choice');

mediaFilter.addEventListener('change',(e) =>{

    let selectedOptionValue = e.target.options[e.target.selectedIndex].value;

    getCurrentMediaByTri(currentPhotographerMedia,selectedOptionValue);
    
});


function getCurrentMediaByTri(arrayMedia,criteria){

    if(criteria === 'popularity') {

        arrayMedia.sort((a,b) =>{

            return b.likes - a.likes;

        });
    
    } else if(criteria === 'title') {

        arrayMedia.sort((a,b)=>{

            return  a.title.localeCompare(b.title);
     
        });
      
    } else if(criteria === 'date') {

       arrayMedia.sort((a,b) =>{

            return b.date.localeCompare(a.date);

       });

    } else if(criteria === 'type-image') {

        arrayMedia= arrayMedia.filter((typeMedia) => {

            return typeMedia.image;

        });
        
    } else if(criteria === 'type-video') {

        arrayMedia = arrayMedia.filter((typeMedia) => {

            return typeMedia.video;

        });

       
    } else if(criteria === 'all') {
        
        displayMedias(currentPhotographerMedia,'.photographer_media');


    } else {

        console.log(`beug de tri in ${criteria} Option`);
    }

    displayMedias(arrayMedia,'.photographer_media');
}


function watchingTheCoreMedia() {

    let targetObserve = document.querySelector('.photographer_media');

    let targetInitialSum = document.querySelector('.likes-total-count');
           
    let initialTotalSum = Number(targetInitialSum.textContent);

    // console.log('*** initial Sum Likes',initialTotalSum);

    const config = {childList:true,subtree: true};

        let observer = new MutationObserver((mutationList) => {

                for (let mutation of mutationList) {

                    //Target Only Change on Count Likes
                    if (mutation.target.className === 'likes-count'){
    
                        console.log('**mutation',mutation);
                        
                        targetInitialSum.textContent = `${++initialTotalSum}`;
                
                    } 
                }
        
        });

    observer.observe(targetObserve,config);   
}

//CALL Major function
init();