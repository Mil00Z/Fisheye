import { getPhotographerId } from "../pages/photographer.js";

if(document.querySelector('.modal-closer')) {

        let closer = document.querySelector('.modal-closer');

        closer.addEventListener('click',() => {

            closeModal('#contact_modal');
            // console.log('Close Modal');

        });

        closer.addEventListener('keydown',(e) => {

            if(e.key === 'Enter') {

            closeModal('#contact_modal');

            // console.log('Close Modal');

            }

        });
    
}


// Close Modal when press Escape on body with True return function
document.querySelector('body').addEventListener('keydown',(e) => {

        if (e.key === "Escape") {

            console.log(`modal condition is '${displayModal('#contact_modal')}' and '${e.key}' is pressing now MF`);

            closeModal('#contact_modal');
        }

      
});



// Modal Testing Get Datas
const submitModal = 'button.submit';
document.querySelector(`${submitModal}`).addEventListener('click',(e) => {

    e.preventDefault();

    console.log('***** Click Cross Button');

    formModalDatas('#the-form');

    closeModal('#contact_modal');
});

document.querySelector(`${submitModal}`).addEventListener('keydown',(e) => {

    if(e.key === 'Enter') {

        e.preventDefault();

        console.log('***Keydown Submit Button');

        formModalDatas('.modal-content');

        closeModal('#contact_modal');

    }

});



// Functions
export function displayModal(target) {

    const modal = document.querySelector(`${target}`);
	modal.style.setProperty('display','flex');
    
    // console.log('modal IN');

    return true;
}


export function closeModal(target) {

    const modal = document.querySelector(`${target}`);
    modal.style.setProperty('display','none');

    // window.location.reload();
    // console.log('modal OUT');

    
}

 // Getter Fonction for FormData
function formModalDatas(formTarget) {

    const formDatas = new FormData(document.querySelector(`${formTarget}`));

    // console.log('Données du Form', formDatas);

    let cloneDatas = Object.fromEntries(formDatas);
    let formDataId = getPhotographerId();

    localStorage.setItem(`form-from-photographer-${formDataId}`,JSON.stringify(cloneDatas));

    console.log('Clones Datas from Form',cloneDatas);

}

export function dataInContactModal(dataPhotographer) {

    document.querySelector('.modal-photographer-name').textContent = dataPhotographer.name; 

}
