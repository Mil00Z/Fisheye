export class MediaFactory {

    constructor(type,src,title) {

        this.type = type
        this.src = src
        this.title = title

    }

    createCard() {

        


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

            //Create Subs context
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

               // ADD media Video Specials
               mediaAsset.append(sourceVideo,subtitles);

        } else {

            mediaAsset = document.createElement('img');
            mediaAsset.setAttribute('src',`${assetPath}/${this.src}`);
            mediaAsset.setAttribute('alt',`Photographie appelée - ${this.title}`);

        }
        
        return mediaAsset
    }

}