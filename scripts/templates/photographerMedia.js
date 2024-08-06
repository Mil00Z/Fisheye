export class CardMedia {

     constructor(index,type,src,title,likes,date) {

        this.index = index
        this.type = type 
        this.src = src 
        this.title = title 
        this.likes = likes 
        this.date = date 
        this.layout = 'photographer';
     }

     createCard(mediaItem) {
   
        let article = document.createElement( 'media-element' );
            article.classList.add('card',`card-media-${this.layout}`);
            article.setAttribute('aria-label','Element média du photographe')
            article.dataset.mediaIndex = `${this.index}`;
            article.dataset.mediaRelease = `${this.date}`;

                //Create Texts and url Datas for Media
                const mediaTexts = document.createElement('div');
                mediaTexts.classList.add(`${
                    this.layout}-media-bottom`);
                
                const mediaTitle = document.createElement( 'a' );
                mediaTitle.classList.add(`${this.layout}-media-title`);
                mediaTitle.setAttribute('aria-label',`Lien vers la page du média ${this.title}`);
                mediaTitle.setAttribute('href','#');
                mediaTitle.textContent = `${this.title}`;
                
                const mediaLikes = document.createElement('div');
                mediaLikes.classList.add(`${this.layout}-media-likes`);
				mediaLikes.innerHTML = `<span class="likes-count">${this.likes}</span><i class="fa-solid fa-heart" aria-hidden="true" title="nombre de likes du projet"></i>`;

                mediaLikes.addEventListener('click',() =>{

					this.likes ++;
                    mediaLikes.firstChild.textContent = `${this.likes}`;
                    

                },{once:true}); 

            //Push Datas
             mediaTexts.append(mediaTitle,mediaLikes);

            //Push All datas in Target Element
            article.append(mediaItem,mediaTexts);

        
            return article;
     }


     createMedia() {

        let mediaAsset;
        const assetPath = `./assets/photographers`;

        if (this.type === 'video') {
            mediaAsset = document.createElement('video');
            mediaAsset.setAttribute('controls','');
            mediaAsset.setAttribute('aria-label',`video appelée - ${this.title}`);

            let sourceVideo = document.createElement('source');
            sourceVideo.setAttribute('src',`${assetPath}/${this.src}`);

            //Create Subtitles Context
            let subtitles = document.createElement('track');

            const titlesAttributs = {
                "src":`${assetPath}/template-subs.vtt`,
                "kind":"subtitles",
                "srclang":`${document.documentElement.lang}`,
                "label":`Sous titres en ${document.documentElement.lang}`,
                "data-subtitles":"One Fake Subtitles for all the video"
            }

             //Push Attributs Object on Element
             for (const attribut in titlesAttributs) {
                subtitles.setAttribute(attribut, titlesAttributs[attribut]);
              }

            // Add Media Video Specials Attributs
            mediaAsset.append(sourceVideo,subtitles);

        } else {

            mediaAsset = document.createElement('img');
            mediaAsset.setAttribute('src',`${assetPath}/${this.src}`);
            mediaAsset.setAttribute('alt',`Photographie appelée - ${this.title}`);

        }

        mediaAsset.classList.add(`${this.layout}-media-assets`);

        
        return mediaAsset;
     }

}


export class ModalItem extends CardMedia {

    constructor(index,type,src,title) {

        super(index,type,src,title);
        this.layout = 'modal';

    }


    createItem(mediaItem) {

        const targetItem =  document.querySelector(`.${this.layout}-item`);
        targetItem .setAttribute('data-index',`${this.index}`);
        targetItem .setAttribute('data-layout',`${this.layout}`);

        let mediaTitle = document.createElement('h3');
        mediaTitle.classList.add(`${this.layout}-item-title`);
        mediaTitle.textContent = `${this.title}`;

        //Push Elements on DOM
        targetItem.innerHTML = '';
        targetItem.append(mediaItem,mediaTitle);

    }

}