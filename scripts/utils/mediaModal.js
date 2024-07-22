import {displayModal,closeModal} from "../utils/contactForm.js";
// import {getPhotographerMedias,getPhotographerId,getAdjacentModalMedia,getCurrentMedia} from "../pages/photographer.js";

  //Checking if closer is defined before Event 
    if(document.querySelector('#media_modal .modal-closer')) {
   
    let modalMediaCloser = document.querySelector('#media_modal .modal-closer');
    modalMediaCloser.addEventListener('click',(e) =>{

      e.preventDefault();

      closeModal('#media_modal');
    
    });


    modalMediaCloser.addEventListener('keydown',(e) => {

    console.log(e.keycode, e.key)

      if (e.key === "Enter") {

         e.preventDefault();
         
         // closeModal('#media_modal');
         console.log('*** Close modal by keyboard');

      }

    });

 }


 




    



