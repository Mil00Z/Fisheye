import {displayModal,closeModal} from "../utils/contactForm.js";

//Checking if closer is defined before Event 
    if(document.querySelector('#media_modal .modal-closer')) {
   
    let modalMediaCloser = document.querySelector('#media_modal .modal-closer');
    modalMediaCloser.addEventListener('click',() =>{

       closeModal('#media_modal');
       
    });

 }





    



