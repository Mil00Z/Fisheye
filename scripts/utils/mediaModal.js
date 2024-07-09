const layoutMedia = document.querySelector('.photographer_media');

const sniffedMutation = document.querySelector('.card-media-photographer');


let observer = new MutationObserver((mutations) => {

    // console.log(mutations);

        for (const mutation of mutations){

            mutation.addedNodes.forEach((currentNodeMedia) => {

                    if (layoutMedia.contains(currentNodeMedia)) {

                        console.info('Card Exist In DOM');
    
                            let cardId = currentNodeMedia.getAttribute('data-media-id');
                            let cardAssets = currentNodeMedia.querySelector('img') ?? currentNodeMedia.querySelector('video');
                            let cardTitle = currentNodeMedia.querySelector('.photographer-media-title').textContent;
    
                        console.log(cardId,cardAssets,cardTitle);

                        let newDataModal = document.createElement('div');
                        newDataModal.classList.add('modal',`debeug-${cardId}`);

                        newDataModal.append(cardAssets,cardTitle);

                        document.querySelector('#media_modal').append(newDataModal);


                        } else {
                            console.warn('Element is No Trigger in script but exist in DOM ?!? WTF');
                         }

                    }
    
            );

        }

}); 

observer.observe(layoutMedia,{childList: true});


// Why this script doesn't work then Mutation Observer and some specs (defer script or delay) are good to say "children are in DOM" ?!
let allMedias = document.querySelectorAll('.card-photographer-media');
console.log(allMedias);

// allMedias.forEach((media,index) => {
//     console.log(index, media.getAttribute('data-media-id'));
// });





    



