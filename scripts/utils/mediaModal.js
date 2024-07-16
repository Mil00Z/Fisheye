import {displayModal,closeModal} from "../utils/contactForm.js";
import {getPhotographerMedias,getPhotographerId,getAdjacentModalMedia,getCurrentMedia} from "../pages/photographer.js";

//Checking if closer is defined before Event 
    if(document.querySelector('#media_modal .modal-closer')) {
   
    let modalMediaCloser = document.querySelector('#media_modal .modal-closer');
    modalMediaCloser.addEventListener('click',(e) =>{

      e.preventDefault();

      closeModal('#media_modal');
    
    });


    modalMediaCloser.addEventListener('keydown',(e) => {

    console.log(e.keycode, e.key)

      if (e.key === "ArrowRight") {

         e.preventDefault();
         
         // closeModal('#media_modal');
         console.log('*** Close modal');

      }

    });

 }

//  if (document.querySelector('#media_modal .player-buttons')) {

//     modalNavigation();

//  }

// function modalNavigation() {

//     let prevButtons = document.querySelector('.player-buttons.prev-media');
//     // let nextButtons = document.querySelector('.player-buttons.next-media');
  
//     prevButtons.addEventListener('click', async (e) =>{

//       const currentPhotographerMedia = await getPhotographerMedias(getPhotographerId());

//       // console.log('**** modal current Photographer Media*****', currentPhotographerMedia);

//       let currentMediaDatas = getCurrentMedia(currentPhotographerMedia,235234343);

//       console.log('*****Current Media',currentMediaDatas);
  
//       // let prevnextElements = getAdjacentModalMedia(currentPhotographerMedia,235234343);
  
//         // console.log(prevnextElements);
  
//     });
  
  
// }
 




    



