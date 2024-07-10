import {displayModal} from "../utils/contactForm.js";

//Create Array Of Elements injected In DOM but not Targetable here
let arrayMedias=[];
let layoutMedia = document.querySelector('.photographer_media');

let observer = new MutationObserver((mutations) => {

    console.log(mutations);

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

    //Looping in all of Node Added before
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


// Functions
function pushClonedDatasModal(targetNode){

    let cardId = targetNode.getAttribute('data-media-id');

    let cardAssets = targetNode.querySelector('img') ?? targetNode.querySelector('video');
    let cardAssetsCopy = cardAssets.cloneNode();

    let cardTitle = targetNode.querySelector('.photographer-media-title').textContent;
    
    let newDataModal = document.createElement('article');
    newDataModal.classList.add('player-item');
    newDataModal.dataset.itemId = `${cardId}`;
    newDataModal.dataset.itemTitle = `${cardTitle}`;

    //Add Datas Get and Sets
    newDataModal.append(cardAssetsCopy);

    //Push Node on DOM
    document.querySelector('#media_modal .modal-all-content').append(newDataModal);

}