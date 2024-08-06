import {displayModal,closeModal} from "../utils/contactForm.js";

//Checking if closer is defined before Event  
if(document.querySelector('#media_modal .modal-closer')) {
   
    let modalMediaCloser = document.querySelector('#media_modal .modal-closer');
    modalMediaCloser.addEventListener('click',(e) =>{

      e.preventDefault();

      closeModal('#media_modal');
    
    });


    modalMediaCloser.addEventListener('keydown',(e) => {

      if (e.key === "Enter") {

         e.preventDefault();
         
         console.log('*** Close modal by keyboard',e.keycode);

      }

    });

 }


 




    



