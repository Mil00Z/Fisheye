if(document.querySelector('.modal-closer')) {

        let closer = document.querySelector('.modal-closer');

        closer.addEventListener('click',() => {

            closeModal();

            console.log('allo Close');

        });
}


if (document.querySelector('.modal-trig-button')) {

    let opener = document.querySelector('.modal-trig-button');

    opener.addEventListener('click',()=> {

        displayModal();

        console.log('allo Display');

    });
}

// Modal Testing Get Datas
const submitModal = 'button.submit';
document.querySelector(`${submitModal}`).addEventListener('click',(e) => {

    e.preventDefault();

    formModalDatas('.modal-content');

})





// Functions
function displayModal() {
    const modal = document.querySelector("#contact_modal");
	modal.style.setProperty('display','flex');
}


function closeModal() {
    const modal = document.querySelector("#contact_modal");
    modal.style.setProperty('display','none');
}

function formModalDatas(formTarget) {

    const formDatas = new FormData(document.querySelector(`${formTarget}`));

    console.log('Données du Form',formDatas);
}

export function dataInModal(dataPhotographer) {

    //MODAL Treatment
    document.querySelector('.modal-photographer-name').textContent = dataPhotographer.name; 

}
