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

            console.log(`modal condition is '${displayModal('#contact_modal')}' and '${e.key}' is pressing now`);

            closeModal('#contact_modal');
            closeModal('#media_modal');
        }

      
});



// Modal Submit, Get Datas & interact with event Output

const submitForm = '#the-form';

document.querySelector(`${submitForm}`).addEventListener('submit',(e) => {

    e.preventDefault();

    formModalDatas('#the-form');

    closeModal('#contact_modal');

});


const submitBtn = 'button.submit';
document.querySelector(`${submitBtn}`).addEventListener('click',() => {

    // e.preventDefault();

    console.log('***** Click Submit Button');

    // formModalDatas('#the-form');

    // closeModal('#contact_modal');
});


document.querySelector(`${submitBtn}`).addEventListener('keydown',(e) => {

    if(e.key === 'Enter') {

        // e.preventDefault();

        console.log('***Keydown Submit Button');

        // formModalDatas('.modal-content');

        // closeModal('#contact_modal');

    }

});





// Functions
export function displayModal(target) {

    const modal = document.querySelector(`${target}`);
	modal.style.setProperty('display','flex');
    modal.setAttribute('aria-hidden',false);
    modal.focus();

    document.querySelector('#main').setAttribute('aria-hidden', true);
    
    return true;
}


export function closeModal(target) {

    const modal = document.querySelector(`${target}`);
    modal.style.setProperty('display','none');
    modal.setAttribute('aria-hidden',true);
    

    document.querySelector('#main').setAttribute('aria-hidden', false);

    //clear HTML Datas Media
    if (`${target}` === '#media_modal') {

        

        // document.querySelector(`${target} .modal-item`).children.forEach((item) =>{

        //     console.log(item);

        //     item.remove();

        // });
        
        console.log('XXX clean media modal');
    }

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
