import {displayModal,closeModal} from "../utils/contactForm.js";

// this query work because element is already in HTML
const layoutMedia = document.querySelector('.photographer_media');

// this query doesn't work beacause (JS injection ?)
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

                    //Get Set All Datas cloned to Modal BODY
                    pushClonedDatasModal(addedNodeMedia);

                    //Update Array of Nodes added before to select them after
                    arrayMedias.push(addedNodeMedia);

                });
        }

        console.log('array media',arrayMedias);
        // Recreate List of Elements
        // let allCardsMedia = document.querySelectorAll('.card-media-photographer');
        
        arrayMedias.forEach((item) => {

            item.addEventListener('click',() => {
                
                let assetsPath = item.querySelector('.photographer-media-assets').getAttribute('src');

                let assetsModal;
                if (assetsPath.includes('.mp4')){

                   assetsModal = document.createElement('video');

                } else {

                    assetsModal = document.createElement('img');
                }

                assetsModal.setAttribute('src',assetsPath);


                let itemModal = document.createElement('div');
                itemModal.classList.add('.player-item');

                // Create Single
                itemModal.append(assetsModal);

                //Push Item in DOM
                document.querySelector('.modal-body .modal-content').append(assetsModal);

                //Finally
                displayModal('#media_modal');
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
// let modalMediaTrigger = document.querySelector('.photographer_media');

// modalMediaTrigger.addEventListener('click',() =>{
//     // console.log(e);
//     displayModal('#media_modal');
//  });

 if(document.querySelector('#media_modal .modal-closer')) {
   
    let modalMediaCloser = document.querySelector('#media_modal .modal-closer');
    modalMediaCloser.addEventListener('click',() =>{

       closeModal('#media_modal');
    });

 }

function pushClonedDatasModal(targetNode){

    let cardId = targetNode.getAttribute('data-media-id');

    let cardAssets = targetNode.querySelector('img') ?? targetNode.querySelector('video');
    let cardAssetsCopy = cardAssets.cloneNode();

    let cardTitle = targetNode.querySelector('.photographer-media-title').textContent;
    
    console.log(cardId,cardAssets,cardTitle);

  

    let newDataModal = document.createElement('article');
    newDataModal.classList.add('player-item');
    newDataModal.dataset.itemId = `${cardId}`;
    newDataModal.dataset.itemTitle = `${cardTitle}`;

    //Add Datas Get and Sets
    newDataModal.append(cardAssetsCopy);

    //Push Node on DOM
    document.querySelector('#media_modal .modal-all-content').append(newDataModal);

}



    



