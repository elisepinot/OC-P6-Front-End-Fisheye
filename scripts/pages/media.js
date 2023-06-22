//**** ANCIEN CODE - A SUPPRIMER SI TOUT FONCTIONNE */

//******* Generate the URL pointing out to the photographer's assets */

async function getPhotographNameForURL() {
  const photographerData = await findingPhotographId();
  const photographerName = photographerData.name.replace(/ /g, "%20");
  //console.log(photographerName)
  return photographerName;
}

async function mediaURL() {
  const photographerName = await getPhotographNameForURL();
  //URL A MODIFIER
  const mediaURL = `./assets/photographers/${photographerName}/Architecture_Connected_Curves.jpg`;
  //console.log(mediaURL)
  return mediaURL;
}

/********** Display the media **********/

// Itérer sur le tableau "photographerMedia" pour afficher les médias

//  async function displayMediaOLD(){

//     const photographerMedia = await getMedia()
//     //photographerMedia : stocke tous les objets Media qui ont le même ID que le photographe
//     //photographerMedia[0].title si sur page d'Ellie-Rose : Tricks in the air

//     //Je prends chaque objet du tableau de media, et je le passe dans la factory

//     for (let i = 0; i < photographerMedia.length; i++) {
//         const mediaItem = photographerMedia[i];

//         // Appeler la fonction factory pour créer l'élément média
//         const mediaModel = createMediaElement(mediaItem);
//         const mediaCardDOM = mediaModel.getMediaCardDOM();

//         // Ajouter le média à la page
//         const mediaSection = document.querySelector(".media_section");
//         mediaSection.appendChild(mediaCardDOM);
//     }

// }

async function displayMediaOLD(media) {
  media.forEach(async (mediaItem) => {
    // pour chaque photographe, j'envoie le photographe au photographerFactory, je stocke dans photographer Model
    const mediaModel = mediaFactory(mediaItem);
    console.log("La variable mediaModel stocke : " + mediaModel);

    // A REACTIVER QUAND J'AURAI REVU LA FONCTION FACTORY
    const mediaCardDOM = await mediaModel.getMediaCardDom;
    console.log("La variable mediaCardDOM stocke : " + mediaCardDOM);

    const mediaSection = document.querySelector(".media_section");
    mediaSection.appendChild(mediaCardDOM);

    // CODE CHATGPT POUR TEST
    // Appeler la fonction factory pour créer l'élément média
    // const mediaElement = createMediaElement(mediaItem);

    // Ajouter le média à la page
    // const mediaSection = document.querySelector(".media_section");
    // mediaSection.appendChild(mediaElement);
  });
}

//************** OLD CODE *********/

// async function testDisplayMedia(){
//     const mediaLink = await mediaURL()

//     const mediaSection = document.querySelector(".media_section")
//     const img = document.createElement('img')
//     img.setAttribute("src", mediaLink)

//     mediaSection.appendChild(img);

// }

// testDisplayMedia()

// Retrouver le nom du photographe, pour l'intégrer dans l'URL pour aller rechercher les images
//Fonction fonctionne mais j'ai trouvé comment faire plus rapide

// async function getPhotographersName(){

//     const { photographers } = await getAllData();

//     for (let i = 0 ; i < photographers.length ; i++){
//         const photographerName = photographers[i].name;
//         const photographerIdJSON = photographers[i].id;

//         if(photographerIdJSON === photographerIdURL){

//             console.log("photographerName dans la fonction getPhotographersName :" + photographerName)
//             console.log("Type of de photographerName dans la fonction getPhotographersName :" + typeof photographerName) // String

//                 return photographerName;
//             }

//     };
// };

/********** OLD CODE - NON USED **********/

/********** First function created in the "Getting the Photographer in the JSON file etc." but I changed it so that it returns all data to avoid repetition **********/
// async function getPhotographerById() {

//     try {
//         const response = await fetch('./data/photographers.json');
//         if (!response.ok) {
//         throw new Error('Erreur lors de la récupération des données des photographes.'); // Gestion des erreurs si la requête échoue
//         }
//         const data = await response.json(); // Conversion de la réponse en format JSON
//         const photographer = data.photographers.find((p) => p.id === photographerIdURL);
//             //photographer = [object Object]
//             //photographer.id = id du photographe (ex : 527)
//         return photographer
//     } catch (error) {
//         console.error(error); // Affiche l'erreur dans la console en cas d'échec de la requête
//         return []; // Retourne un tableau vide en cas d'échec
//     }

// }

//********** First function created in the "Call of the functions to display data in the photogrpaher header" when calling the getPhotographerById() function - which was modified to get all data */
// async function init() {
//     try{
//         const photographerToDisplay = await getPhotographerById();
//         console.log("La variable photographerToDisplay stocke : " + photographerToDisplay)
//         console.log("J'accède à la propriété 'name' de l'objet stocké dans photographerToDisplay : " + photographerToDisplay.name)
//         displayPhotographer(photographerToDisplay);
//     } catch (error){
//         console.error(error); //Affiche l'erreur dans la console en cas d'echec
//     }
// }}

//ANCIEN CODE DANS FACTORIES/MEDIA

// function mediaFactoryOLD(mediaItem) {
//   // Store properties of the mediaItem in parameter into variables
//   const { id, photographerId, title, image, video, likes, date, price, name } =
//     mediaItem;

//   // J'ai besoin de générer le lien de l'image

//   const mediaElement = document.createElement("article");
//   mediaElement.setAttribute("class", "media-item");

//   async function getPhotographerNameForLink() {
//     const photographerData = await findingPhotographId();
//     //photographerData : [object Object]

//     const photographerName = photographerData.name.replace(/ /g, "%20");
//     //photographerName : Ellie-Rose%20Wilkens (ex)

//     return photographerName;
//   }

//   // function getPhotographerNameForLink() {
//   //   return findingPhotographId().then((photographerData) => {
//   //     const photographerName = photographerData.name.replace(/ /g, "%20");
//   //     return photographerName;
//   //   });
//   // }

//   async function getMediaCardDom() {
//     const photographerName = await getPhotographerNameForLink();

//     if (mediaItem.image) {
//       const mediaURL = `./assets/photographers/${photographerName}/${image}`;
//       // console.log("La variable mediaURL stocke: " + mediaURL)

//       const imageElement = document.createElement("img");

//       imageElement.setAttribute("src", mediaURL);
//       imageElement.alt = mediaItem.title;
//       mediaElement.appendChild(imageElement);
//     } else if (mediaItem.video) {
//       const mediaURL = `./assets/photographers/${photographerName}/${video}`;

//       const videoElement = document.createElement("video");
//       videoElement.setAttribute("src", mediaURL);
//       videoElement.controls = true;
//       mediaElement.appendChild(videoElement);
//     }

//     return mediaElement;
//   }

//   return { getMediaCardDom };
// }

/********RETRAVAILLER LES FONCTIONS CI-DESSOUS POUR REUSSIR A GENERER LE LIEN DU MEDIA */

// async function getMediaName() {
//   const data = await getAllData();
//   // data : [object Object]
//   const mediaName = data.media.image;
//   console.log("La variable mediaName stocke: " + mediaName);

//   return mediaName;
// }

// async function getMediaURL() {
//   const photographerData = await findingPhotographId();
//   //photographerData : [object Object]

//   const photographerName = photographerData.name.replace(/ /g, "%20");
//   //photographerName : Ellie-Rose%20Wilkens (ex)

//   const mediaName = getMediaName();
//   //mediaName : [object Promise]

//   const mediaURL = url(
//     `../assets/photographers/${photographerName}/${mediaName}`
//   );
//   console.log("La variable mediaURL stocke: " + mediaURL);

//   return mediaURL;
// }

// /****** Proposition chatGPT */

// function createMediaElement(mediaItem) {
//   const mediaElement = document.createElement("div");
//   mediaElement.className = "media-item";

//   if (mediaItem.image) {
//     const imageElement = document.createElement("img");
//     const url = "../assets/photographers/Mimi%20Keel/Animals_Rainbow.jpg";
//     imageElement.setAttribute("src", url);
//     imageElement.alt = mediaItem.title;
//     mediaElement.appendChild(imageElement);
//   } else if (mediaItem.video) {
//     const videoElement = document.createElement("video");
//     videoElement.src = mediaItem.video;
//     videoElement.controls = true;
//     mediaElement.appendChild(videoElement);
//   }

//   return mediaElement;
// }
