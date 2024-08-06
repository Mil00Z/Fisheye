import {photographerCardTemplate} from "../templates/photographerCard.js";
    
   async function getPhotographers() {

    try{

        const response = await fetch('./data/photographers.json');
        const datas = await response.json();

        console.log(datas);

        return datas.photographers ;

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

    async function displayData(photographers) {

        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {

            const photographerModel = photographerCardTemplate(photographer);

            const userCardDOM = photographerModel.getUserCardDOM();

            photographersSection.append(userCardDOM);
            
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const photographers  = await getPhotographers();
        displayData(photographers);
    }
    
    //Getting Datas and Display
    init();
    
