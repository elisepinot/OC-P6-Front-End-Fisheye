function mediaFactoryOLD(mediaItem){

    //Je stocke dans des variables les propriétés de l'objet media passé en argument
    const { id, photographerId, title, image, video, likes, date, price, name } = mediaItem;

    // J'ai besoin de générer le lien de l'image


    const mediaElement = document.createElement("article");
    mediaElement.className = "media-item";

    const mediaTitle = document.createElement('p');
    mediaTitle.innerHTML = title;
    mediaElement.appendChild(mediaTitle);


      async function getPhotographerNameForLink(){
          const photographerData = await findingPhotographId();
          //photographerData : [object Object]
      
          const photographerName = photographerData.name.replace(/ /g, "%20");
          //photographerName : Ellie-Rose%20Wilkens (ex)
      
          return photographerName
      }


      // function getPhotographerNameForLink() {
      //   return findingPhotographId().then((photographerData) => {
      //     const photographerName = photographerData.name.replace(/ /g, "%20");
      //     return photographerName;
      //   });
      // }


    async function getMediaCardDom(){
    

      const photographerName = await getPhotographerNameForLink()

  
      if (mediaItem.image) {

          const mediaURL = `../assets/photographers/${photographerName}/${image}`
          // console.log("La variable mediaURL stocke: " + mediaURL)

          const imageElement = document.createElement("img");
          
          imageElement.setAttribute("src", mediaURL)
          imageElement.alt = mediaItem.title;
          mediaElement.appendChild(imageElement);

        } else if (mediaItem.video) {
          const mediaURL = `../assets/photographers/${photographerName}/${video}`

          const videoElement = document.createElement("video");
          videoElement.setAttribute("src", mediaURL)
          videoElement.controls = true;
          mediaElement.appendChild(videoElement);
        }
      
        return (mediaElement)
    }

    return { getMediaCardDom }
        
}


/******* Proposition chat GPT */

async function mediaFactory(mediaItem) {
  const { id, photographerId, title, image, video, likes, date, price, name } = mediaItem;

  const mediaElement = document.createElement("article");
  mediaElement.className = "media-item";

  const mediaTitle = document.createElement("p");
  mediaTitle.innerHTML = title;
  mediaElement.appendChild(mediaTitle);

  async function getPhotographerNameForLink() {
    const photographerData = await findingPhotographId();
    const photographerName = photographerData.name.replace(/ /g, "%20");
    return photographerName;
  }

  async function getMediaCardDom() {
    const photographerName = await getPhotographerNameForLink();

    if (mediaItem.image) {
      const mediaURL = `../assets/photographers/${photographerName}/${image}`;

      const imageElement = document.createElement("img");
      imageElement.setAttribute("src", mediaURL);
      imageElement.alt = mediaItem.title;
      mediaElement.appendChild(imageElement);
    } else if (mediaItem.video) {
      const mediaURL = `../assets/photographers/${photographerName}/${video}`;

      const videoElement = document.createElement("video");
      videoElement.setAttribute("src", mediaURL);
      videoElement.controls = true;
      mediaElement.appendChild(videoElement);
    }

    return mediaElement;
  }

  return { getMediaCardDom };
}

    





/********RETRAVAILLER LES FONCTIONS CI-DESSOUS POUR REUSSIR A GENERER LE LIEN DU MEDIA */

async function getMediaName(){
    const data = await getAllData()
    // data : [object Object]
    const mediaName = data.media.image;
    console.log("La variable mediaName stocke: " + mediaName)

    return mediaName
}

async function getMediaURL(){
    const photographerData = await findingPhotographId();
    //photographerData : [object Object]

    const photographerName = photographerData.name.replace(/ /g, "%20");
    //photographerName : Ellie-Rose%20Wilkens (ex)

    const mediaName = getMediaName()
    //mediaName : [object Promise]

    const mediaURL = url(`../assets/photographers/${photographerName}/${mediaName}`)
    console.log("La variable mediaURL stocke: " + mediaURL)

    return mediaURL
}



/****** Proposition chatGPT */

function createMediaElement(mediaItem) {

    const mediaElement = document.createElement("div");
    mediaElement.className = "media-item";
  
    if (mediaItem.image) {
      const imageElement = document.createElement("img");
      const url = '../assets/photographers/Mimi%20Keel/Animals_Rainbow.jpg'
      imageElement.setAttribute("src", url)
      imageElement.alt = mediaItem.title;
      mediaElement.appendChild(imageElement);

    } else if (mediaItem.video) {
      const videoElement = document.createElement("video");
      videoElement.src = mediaItem.video;
      videoElement.controls = true;
      mediaElement.appendChild(videoElement);
    }
  
    return mediaElement;
  }
  
 