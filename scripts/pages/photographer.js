/********** Get the value of the ID parameter of the URL **********/
const urlParams = new URLSearchParams(window.location.search);
const photographerIdURL = parseInt(urlParams.get("id"));


/********** Get the Photographer in the JSON file that corresponds to the ID in the URL **********/

/********** Get the data of the JSON file - both photographers and media  */
async function getAllData() {

    try {
        const response = await fetch('/data/photographers.json');
        if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données des photographes.'); 
        }
        const data = await response.json(); 
        //data : [object Object]
        //data.photographers : [object Object] x6
        //data.photographers[0].name = Mimi Keel
        return data
    } catch (error) {
        console.error(error); 
        return []; 
    
    }
}

/********** Get the photographer with the same ID as in the URL **********/
async function findingPhotographId(){
    const data = await getAllData()
    // data : [object Object]

    const photographer = data.photographers.find((p) => p.id === photographerIdURL);
    //photographer = [object Object]
    //photographer.id = id of the photographer of the page (ex : 527)
    return photographer
}

    

/********** Display the photographer information in the photographer header **********/
async function displayPhotographer(photographer){

    const photographerModel = photographerFactory(photographer);
    //photographerModel = [object Object]
    const photographerCardDOM = photographerModel.getPhotographerDOM(); 
    //photographerCardDOM = [object HTMLDivElement]
    return photographerCardDOM

}

/********** Call of the functions to display data in the photographer header  **********/

async function headerInit() {
    try{
        const photographerToDisplay = await findingPhotographId();
        //photographerToDisplay = [object Object]
        //photographerToDisplay.name : nom du photographe de la page (ex : Ellie-Rose Wilkens)
        displayPhotographer(photographerToDisplay); 
    } catch (error){
        console.error(error);
    }
};

headerInit();


//************ DISPLAYING MEDIA************* */

//******* Generating the URL where to find the photographer's assets */

async function getPhotographNameForURL(){
    const photographerData = await findingPhotographId();
    const photographerName = photographerData.name.replace(/ /g, "%20");
    //console.log(photographerName)
    return photographerName
}

async function mediaURL(){
    const photographerName = await getPhotographNameForURL();
    //URL A MODIFIER
    const mediaURL = `../assets/photographers/${photographerName}/Architecture_Connected_Curves.jpg`
    //console.log(mediaURL)
    return mediaURL

}

    //******** Simplification des 2 fonctions ci-dessus en une seule */

    


    /********* Using the photographer ID to filter on corresponding media */

    /********** Getting the media **********/
    async function getMedia(){
        
        //1. Je vais chercher le tableau du photographe correspondant, et je stocke son id dans une variable 
        const photographerObjet = await findingPhotographId();
        const selectedPhotographer = photographerObjet.id;

        //2. Je vais chercher le tableau de tous les media, et je filtre sur l'ID du photographe

        const data = await getAllData()
        // data : [object Object]
            //2.1. Je crée un tableau qui contient les éléments filtrés du tableau media

        const photographerMedia = data.media.filter((item) => item.photographerId === selectedPhotographer);
        //photographerMedia = stocke plusieurs [object Object]
        return photographerMedia
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
            console.log("La variable mediaModel stocke : " + mediaModel)

            // A REACTIVER QUAND J'AURAI REVU LA FONCTION FACTORY
            const mediaCardDOM = await mediaModel.getMediaCardDom;
            console.log("La variable mediaCardDOM stocke : " + mediaCardDOM)
            
            const mediaSection = document.querySelector(".media_section");
            mediaSection.appendChild(mediaCardDOM);

            // CODE CHATGPT POUR TEST
            // Appeler la fonction factory pour créer l'élément média
            // const mediaElement = createMediaElement(mediaItem);
            
            // Ajouter le média à la page
            // const mediaSection = document.querySelector(".media_section");
            // mediaSection.appendChild(mediaElement);
        });


    };


    async function displayMedia(media) {
        const mediaSection = document.querySelector(".media_section");
      
        for (const mediaItem of media) {
          const mediaModel = await mediaFactory(mediaItem);
          const mediaCardDOM = await mediaModel.getMediaCardDom();
          mediaSection.appendChild(mediaCardDOM);
        }
      }


async function mediaInit() {
    try{
        const media = await getMedia();
        // media: stocke tous les medias du photographe de la page
        displayMedia(media);
    } catch (error) {
        console.error(error);
    }
}

mediaInit();



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
//         const response = await fetch('/data/photographers.json');
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