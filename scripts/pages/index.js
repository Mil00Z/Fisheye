    async function getPhotographers() {

    
        const response = await fetch('./data/photographers.json');
        const datas = await response.json();

        
        console.log(datas);

        return datas.photographers ;
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {

            const photographerModel = photographerTemplate(photographer);

            const userCardDOM = photographerModel.getUserCardDOM();

            photographersSection.append(userCardDOM);
            
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const photographers  = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
