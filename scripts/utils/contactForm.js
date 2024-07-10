if(document.querySelector('.modal-closer')) {

        let closer = document.querySelector('.modal-closer');

        closer.addEventListener('click',() => {

            closeModal('#contact_modal');

            console.log('Close Modal');

        });
}


// Modal Testing Get Datas
const submitModal = 'button.submit';
document.querySelector(`${submitModal}`).addEventListener('click',(e) => {

    e.preventDefault();

    formModalDatas('.modal-content');

})


// Functions
export function displayModal(target) {
    const modal = document.querySelector(`${target}`);
	modal.style.setProperty('display','flex');
    // console.log('modal IN');
}


export function closeModal(target) {
    const modal = document.querySelector(`${target}`);
    modal.style.setProperty('display','none');
    // console.log('modal OUT');
}


function formModalDatas(formTarget) {

    const formDatas = new FormData(document.querySelector(`${formTarget}`));

    console.log('Données du Form',formDatas);
}

export function dataInContactModal(dataPhotographer) {

    document.querySelector('.modal-photographer-name').textContent = dataPhotographer.name; 

}
