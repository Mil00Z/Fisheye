export function photographerMediaTemplate(data) {

    const { id, title, price, video, date, likes } = data;

    const videoPath = `../assets/photographers/${video}`;

    function getMediaCardDOM() {

        const article = document.createElement( 'a' );
        article.classList.add('card','card-media-photographer');
        // article.setAttribute('href',`./photographer.html?id=${id}`);
        article.setAttribute('aria-label',`Lien vers la page du média ${title}`);
        article.dataset.mediaId = `${id}`;

        const mediaVideo = document.createElement( 'video' );
        mediaVideo.classList.add('photographer-media-video');
        mediaVideo.setAttribute("src", videoPath);

        const mediaTitle = document.createElement( 'h2' );
        mediaTitle.classList.add('photographer-media-title')
        mediaTitle.textContent = `${title}`;
        
        const mediaLikes = document.createElement('span');
        mediaLikes.classList.add('photographer-media-likes');
        mediaLikes.textContent = `${likes} personnes ont ❤`;

        const mediaDate = document.createElement('span');
        mediaDate.classList.add('photographer-media-date');
        mediaDate.textContent = `${date}`;

        const mediaPricing = document.createElement('p');
        mediaPricing.classList.add('photographer-pricing');
        mediaPricing.textContent = `${price} euros`;

        article.append(mediaVideo,mediaTitle,mediaDate,mediaPricing,mediaLikes,);

        return (article);
    }

    return { data, getMediaCardDOM }
}
