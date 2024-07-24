export function photographerCardTemplate(data) {

    const {name,id,portrait,city,country,tagline, price } = data;

    // console.log(data);

    const picturePath = `./assets/photographers/${portrait}`;

    function getUserCardDOM() {

        const article = document.createElement( 'a' );
        article.classList.add('card','card-photographer');
        article.setAttribute('href',`./photographer.html?id=${id}`);
        article.setAttribute('aria-label',`Lien vers la page du photographe ${name}`);

        const img = document.createElement( 'img' );
        img.classList.add('photographer-thumbnail');
        img.setAttribute("src", picturePath);
        img.setAttribute("alt", `Photographie de ${name}`);

        const proName = document.createElement( 'h2' );
        proName.classList.add('photographer-name')
        proName.textContent = `${name}`;
        
        const proCity = document.createElement('span');
        proCity.classList.add('photographer-city');
        proCity.textContent = `${city} , ${country} `;


        const proTagline = document.createElement('span');
        proTagline.classList.add('photographer-tagline');
        proTagline.textContent = `${tagline}`;

        const proPricing = document.createElement('p');
        proPricing.classList.add('photographer-pricing');
        proPricing.textContent = `${price} euros / jour`;

        article.append(img,proName,proCity,proTagline,proPricing);

        return (article);
    }

    return { data, getUserCardDOM }
}
