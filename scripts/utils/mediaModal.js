import {displayModal,closeModal} from "../utils/contactForm.js";

const layoutMedia = document.querySelector('.photographer_media');

const sniffedMutation = document.querySelector('.card-media-photographer');

//Create Array Of Elements injected In DOM but not Targetable here
let arrayMedias=[];

let observer = new MutationObserver((mutations) => {

    // console.log(mutations);

        for (const mutation of mutations){

            let allMedias = mutation.addedNodes;

                allMedias.forEach((addedNodeMedia) => {

                    if (layoutMedia.contains(addedNodeMedia)) {
                        console.info('Card Exist In DOM');
                    } else {
                        console.warn('Element is No Trigger in script but exist in DOM ?!? WTF');
                    }

                    displayModalDatas(addedNodeMedia);

                });
        }

        
        // Recreate List of Elements
        let allCardsMedia = document.querySelectorAll('.card-media-photographer');
        // arrayMedias.push();

        allCardsMedia.forEach((item) => {

            item.addEventListener('mouseover',() => {

                let assetsPath = item.querySelector('.photographer-media-assets').getAttribute('src');

                let imgModal = document.createElement('img');
                imgModal.setAttribute('src',assetsPath);

                document.querySelector('.modal-body').append(imgModal);

        
            });

        })


}); 
observer.observe(layoutMedia,{childList: true});




// Why this script doesn't work then Mutation Observer and some specs (defer script or delay) are good to say "children are in DOM" ?!
// let allMedias = document.querySelectorAll('.modal-body .card-media-photographer');
// console.log(allMedias);

// allMedias.forEach((media,index) => {
//     console.log(index, media.getAttribute('data-media-id'));
// });




// Trigger Modal Media
let modalMediaTrigger = document.querySelector('.photographer_media');
modalMediaTrigger.addEventListener('click',() =>{
    // console.log(e);
    displayModal('#media_modal');
 });

 if(document.querySelector('#media_modal .modal-closer')) {
   
    let modalMediaCloser = document.querySelector('#media_modal .modal-closer');
    modalMediaCloser.addEventListener('click',() =>{

       closeModal('#media_modal');
    });

 }

function displayModalDatas(targetNode){

    let cardId = targetNode.getAttribute('data-media-id');

    let cardAssets = targetNode.querySelector('img') ?? targetNode.querySelector('video');
    let cardAssetsCopy = cardAssets.cloneNode();

    let cardTitle = targetNode.querySelector('.photographer-media-title').textContent;
    
    // console.log(cardId,cardAssets,cardTitle);

    let newDataModal = document.createElement('article');
    newDataModal.classList.add('player-item');
    newDataModal.dataset.itemId = `${cardId}`;
    newDataModal.dataset.itemTitle = `${cardTitle}`;

    //Add Datas Get and Sets
    newDataModal.append(cardAssetsCopy);

    //Push Node on DOM
    document.querySelector('#media_modal .modal-body').append(newDataModal);

}



    



