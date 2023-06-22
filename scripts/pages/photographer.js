/********** PHOTOGRAPHER PAGE **********/

/********** Get the value of the ID parameter of the URL **********/
const urlParams = new URLSearchParams(window.location.search);
const photographerIdURL = parseInt(urlParams.get("id"));

/********** Get the data of the JSON file - both photographers and media  */
async function getAllData() {
  try {
    const response = await fetch("./data/photographers.json");
    if (!response.ok) {
      throw new Error(
        "Erreur lors de la récupération des données des photographes."
      );
    }
    const data = await response.json();
    //data : [object Object]
    //data.photographers : [object Object] x6
    //data.photographers[0].name = Mimi Keel
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

/********** DISPLAY OF THE PHOTOGRAPHER HEADER **********/

/********** Get the photographer with the same ID as in the URL **********/
async function findingPhotographId() {
  const data = await getAllData();
  // data : [object Object]

  const photographer = data.photographers.find(
    (p) => p.id === photographerIdURL
  );
  //photographer = [object Object]
  //photographer.id = id of the photographer of the page (ex : 527)
  return photographer;
}

/********** Display the photographer information in the photographer header **********/
async function displayPhotographer(photographer) {
  const photographerModel = photographerFactory(photographer);
  //photographerModel = [object Object]
  photographerModel.getPhotographerDOM();
  //[object HTMLDivElement]
}

/********** Call of the functions to display data in the photographer header  **********/

async function headerInit() {
  try {
    const photographerToDisplay = await findingPhotographId();
    //photographerToDisplay = [object Object]
    //photographerToDisplay.name : nom du photographe de la page (ex : Ellie-Rose Wilkens)
    displayPhotographer(photographerToDisplay);
  } catch (error) {
    console.error(error);
  }
}

headerInit();

//************ DISPLAY OF THE MEDIA SECTION ************* */

/********** Getting the media **********/

async function getMedia() {
  const photographerObjet = await findingPhotographId(); //Return the photographer object
  const selectedPhotographer = photographerObjet.id; //Return the id of the photographer of the page

  const data = await getAllData(); //Return all data (photographers + media) --> data : [object Object]

  const photographerMedia = data.media.filter(
    (item) => item.photographerId === selectedPhotographer
  ); //Filter on the media with the photographerId property which is the same as the one in the URL

  return photographerMedia;
  //photographerMedia = points at several [object Object] which are all media created by the selected photographer
}

/********** Display the media **********/

async function displayMedia(media) {
  const mediaSection = document.querySelector(".media-section");

  for (const mediaItem of media) {
    const mediaModel = await mediaFactory(mediaItem);
    const mediaCardDOM = await mediaModel.getMediaCardDom();
    mediaSection.appendChild(mediaCardDOM);
  }
}

/*********** Initialize the media section **********/

async function mediaInit() {
  try {
    const media = await getMedia();
    // media: stocke tous les medias du photographe de la page
    displayMedia(media);
  } catch (error) {
    console.error(error);
  }
}

mediaInit();

/********** DISPLAY OF THE BOX ON THE BOTTOM RIGHT: PRICE + LIKES ***********/
