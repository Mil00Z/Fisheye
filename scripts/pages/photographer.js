// import {photographerMediaTemplate} from "../templates/photographerMedia.js";
import {displayModal,dataInContactModal} from "../utils/contactForm.js";

//Call the dataArray before the function
let currentPhotographerMedia = [];


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

    return mediaFiltered;
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

            let {id,title,image,video,likes,date,price} = mediaElement;
    
            const assetPath = `./assets/photographers`;
    
            const article = document.createElement( 'a' );
                article.classList.add('card','card-media-photographer');
                article.setAttribute('href',`#media_modal`);
                article.setAttribute('aria-label',`Lien vers la page du média ${title}`);
                article.dataset.mediaId = `${id}`;
                article.dataset.mediaIndex = `${index}`;
                article.dataset.pricing = `${price}`;
    
            let mediaAssets;
            
                if(video) {
    
                    mediaAssets = document.createElement( 'video' );
                    mediaAssets.setAttribute('controls','');
                    mediaAssets.setAttribute('aria-label',`video appelée - ${title}`);

                    let sourceVideo = document.createElement('source');
                    sourceVideo.setAttribute('src',`${assetPath}/${video}`);

                    let subtitles = document.createElement('track');

                    const titlesAttributs = {
                        "src":`${assetPath}/template-subs.vtt`,
                        "kind":"subtitles",
                        "srclang":`${document.documentElement.lang}`,
                        "label":`Sous titres en ${document.documentElement.lang}`,
                        "data-subtitles":"One Fake Subtitles for all the video"
                    }

                    //Push Attributs Object on Element
                    for (const attribut in titlesAttributs) {
                        subtitles.setAttribute(attribut, titlesAttributs[attribut]);
                      }

                      // ADD media Video Specials 
                    mediaAssets.append(sourceVideo,subtitles);


                } else {
                     mediaAssets = document.createElement( 'img' );
                     mediaAssets.setAttribute('src',`${assetPath}/${image}`);
                     mediaAssets.setAttribute('alt',`image de ${title}`)
                }
    
                mediaAssets.classList.add('photographer-media-assets');
                mediaAssets.dataset.release = `${date}`;
    
                const mediaTexts = document.createElement('div');
                mediaTexts.classList.add('photographer-media-bottom');
                
                const mediaTitle = document.createElement( 'h2' );
                mediaTitle.classList.add('photographer-media-title')
                mediaTitle.textContent = `${title}`;
                
                const mediaLikes = document.createElement('span');
                mediaLikes.classList.add('photographer-media-likes');
                mediaLikes.innerHTML = `${likes} <i class="fa-solid fa-heart aria-hidden="true" title="nombre de likes du projet"></i>`;
    
                mediaTexts.append(mediaTitle,mediaLikes);
    
                //Push data in Target Element
                article.append(mediaAssets,mediaTexts);
    
                // Push Target Element in DOM
                photographerPageMedia.append(article);
    

                // Create Event after Element in same context
                article.addEventListener("click",()=> {

                    openLightBox(index);

                });
    
                
            });
    
}


function openLightBox(mediaIndex) {
 
    let currentIndex = mediaIndex;

    function displayCurrentMedia() {

        const currentMedia = currentPhotographerMedia[currentIndex];

        console.log('**Media Clicked',currentPhotographerMedia[currentIndex]);

        let singleMediaAsset;
        const assetPath = `./assets/photographers`;

        if (currentMedia.video) {
            singleMediaAsset = document.createElement('video');
            singleMediaAsset.setAttribute('controls','');
            singleMediaAsset.setAttribute('aria-label',`video appelée - ${currentMedia.title}`);

            let sourceVideo = document.createElement('source');
            sourceVideo.setAttribute('src',`${assetPath}/${currentMedia.video}`);


            let subtitles = document.createElement('track');

            const titlesAttributs = {
                "src":`${assetPath}/template-subs.vtt`,
                "kind":"subtitles",
                "srclang":`${document.documentElement.lang}`,
                "label":`Sous titres en ${document.documentElement.lang}`,
                "data-subtitles":"One Fake Subtitles for all the video"
            }

             //Push Attributs Object on Element
             for (const attribut in titlesAttributs) {
                subtitles.setAttribute(attribut, titlesAttributs[attribut]);
              }


               // ADD media Video Specials
               singleMediaAsset.append(sourceVideo,subtitles);

        } else {
            singleMediaAsset = document.createElement('img');
            singleMediaAsset.setAttribute('src',`${assetPath}/${currentMedia.image}`);
            singleMediaAsset.setAttribute('alt',`Photographie appelée - ${currentMedia.title}`);
        }
        

        document.querySelector('.modal-item').setAttribute('data-index',`${currentIndex}`)
        
        let mediaTitle = document.createElement('h3');
        mediaTitle.classList.add('modal-item-title');
        mediaTitle.textContent = `${currentMedia.title}`;


        //Push Elements on DOM
        document.querySelector('.modal-item').innerHTML = '';
        document.querySelector('.modal-item').append(singleMediaAsset,mediaTitle);

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
    ${likesSum} <i class="fa-solid fa-heart aria-hiden="true" title="nombre total de likes du photographe"></i>
    </div>
    <div class="photographer-pricing"> 
        ${price} $ / jour
    </div> `;
}

//Filter Feature
let mediaFilter = document.querySelector('#type-media-choice');

mediaFilter.addEventListener('change',(e) =>{

    // console.log(e.target.value);
    let selectedOptionValue = e.target.options[e.target.selectedIndex].value;

    // console.log(selectedOptionValue,currentPhotographerMedia);

    //Get Datas from Media Datas
    
    //Filter by Scenarii ?? : if option value = X then function Y go here
    // or make conditions in super function 


    getCurrentMediaByTri(currentPhotographerMedia,selectedOptionValue);
    
});


function getCurrentMediaByTri(arrayMedia,criteria){

    
    if(criteria === 'popularity') {

        arrayMedia.sort((a,b) =>{

            return b.likes - a.likes;

        });

        console.log('**** debeug tri',criteria,arrayMedia);

        displayMedias(arrayMedia,'.photographer_media');

    } else if(criteria === 'title') {

        arrayMedia.sort((a,b)=>{

            return  a.title.localeCompare(b.title);
     
        });
        
        console.log('**** debeug tri',criteria,currentPhotographerMedia);

        displayMedias(arrayMedia,'.photographer_media');

    } else if(criteria === 'date') {

       arrayMedia.sort((a,b) =>{

            return b.date.localeCompare(a.date);

       });

       console.log(arrayMedia);

       displayMedias(arrayMedia,'.photographer_media');

    } else if(criteria === 'type-image') {

        const typeFiltered = arrayMedia.filter((typeMedia) => {

            return typeMedia.image;

        });

        console.log('**** debeug tri',criteria,typeFiltered);

        displayMedias(typeFiltered,'.photographer_media');
        
    } else if(criteria === 'type-video') {

        const typeFiltered = arrayMedia.filter((typeMedia) => {

            return typeMedia.video;

        });

        console.log('**** debeug tri',criteria,typeFiltered);

        displayMedias(typeFiltered,'.photographer_media');
        
    } else if(criteria === 'all') {
        
        console.log('**** debeug tri',criteria,currentPhotographerMedia);

        displayMedias(currentPhotographerMedia,'.photographer_media');

    } else {

        console.log('beug tri selection');
    }


}





//CALL Major function
init();