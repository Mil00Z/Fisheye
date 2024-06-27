export function photographerTemplate(data) {

    const { name, portrait, city, tagline,price } = data;

    // console.log(data);

    const picturePath = `../assets/photographers/${portrait}`;

    function getUserCardDOM() {

        const article = document.createElement( 'article' );
        article.classList.add('card','card-photographer');

        const img = document.createElement( 'img' );
        img.classList.add('thumbnail-photographer');
        img.setAttribute("src", picturePath);

        const h2 = document.createElement( 'h2' );
        h2.classList.add('title-photographer')
        h2.textContent = `${name}`;
        
        const cityName = document.createElement('span');
        cityName.classList.add('photographer-city');
        cityName.textContent = `${city}`;


        const taglineText = document.createElement('span');
        taglineText.classList.add('photographer-tagline');
         taglineText.textContent = ` 👉 ${tagline}`;

         const pricingRange = document.createElement('p');
         pricingRange .classList.add('photographer-pricing');
        pricingRange .textContent = `${price} euros`;

        article.append(img,h2,pricingRange,cityName,taglineText,);

        return (article);
    }

    return { data, getUserCardDOM }
}
