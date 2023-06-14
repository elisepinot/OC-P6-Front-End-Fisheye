//Mettre le code JavaScript lié à la page photographer.html



// Récupère les paramètres de l'URL 
// La propriété search de window.location renvoie la chaîne de requête de l'URL = partie de l'URL qui suit le "?"
//URLSearchParams est un constructeur d'objet JavaScript qui permet de manipuler facilement les paramètres d'URL.
const urlParams = new URLSearchParams(window.location.search);

// Récupère la valeur de l'ID du photographe (la méthode 'get' de l'objet URLSearchParams est utilisée pour récupérer la valeur d'un paramètre spécifique)
//parseInt pour transformer un string en number --> pour vérifier que photographerIdURL === photographerIdJSON plus tard - doivent être du même type
const photographerIdURL = parseInt(urlParams.get("id"));

console.log("La constante photographerIdURL récupère l'ID suivant : " + photographerIdURL)
console.log("La constante photographerIdURL est de type : " + typeof photographerIdURL)
//Retourne les données liées aux media

// async function getPhotographerById(idInURL)

async function getPhotographerById() {

    try {
        const response = await fetch('/data/photographers.json');
        if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données des photographes.'); // Gestion des erreurs si la requête échoue
        }
        const data = await response.json(); // Conversion de la réponse en format JSON
        const photographer = data.photographers.find((p) => p.id === photographerIdURL);
        console.log(photographer)
        return photographer
    } catch (error) {
        console.error(error); // Affiche l'erreur dans la console en cas d'échec de la requête
        return []; // Retourne un tableau vide en cas d'échec
    }
    
}

async function displayPhotographer(photographer){

    // const photographerHeader = document.querySelector(".photograph-header"); 
    
    const photographerModel = photographerFactory(photographer);
    console.log("La variable photographerModel stocke : " + photographerModel)

    const photographerCardDOM = photographerModel.getPhotographerDOM(); 
    console.log("La variable photographerCardDOM stocke : " + photographerCardDOM)

    // photographerHeader.appendChild(photographerCardDOM);

}

async function init() {
    try{
        const photographerToDisplay = await getPhotographerById();
        console.log("La variable photographerToDisplay stocke : " + photographerToDisplay)
        console.log("J'accède à la propriété 'name' de l'objet stocké dans photographerToDisplay : " + photographerToDisplay.name)
        displayPhotographer(photographerToDisplay);
    } catch (error){
        console.error(error); //Affiche l'erreur dans la console en cas d'echec
    }
};

/* La fonction init est appelée pour démarrer le projet */

init();





// Retrouver le nom du photographe, pour l'intégrer dans l'URL pour aller rechercher les images
async function getPhotographersName(){

    const { photographers } = await getAllData();

    for (let i = 0 ; i < photographers.length ; i++){
        const photographerName = photographers[i].name;
        const photographerIdJSON = photographers[i].id;


        if(photographerIdJSON === photographerIdURL){

            console.log("photographerName dans la fonction getPhotographersName :" + photographerName)
            console.log("Type of de photographerName dans la fonction getPhotographersName :" + typeof photographerName) // String
           
                return photographerName;
            } 
        
    };
};

getPhotographersName()


// Définition d'une fonction asynchrone pour envelopper votre code
// async function removingSpace () {
//     // Utilisation de la fonction et stockage du résultat dans une variable
//     const photographerNameWithSpace = await getPhotographersName();
//     const photographerNameWithoutSpace = photographerNameWithSpace.replace(/ /g, "_");
//     return photographerNameWithoutSpace
// }

// // Appel de la fonction principale
// removingSpace();



// async function displayMedia(media) {

//     const mediaSection = document.querySelector(".media_section");

//     media.forEach((medium) => {
    
//         const mediumModel = mediaFactory(medium);
//         const mediumCardDOM = mediumModel.getMediaCardDOM();

//         mediaSection.appendChild(mediumCardDOM);
//     });


// };

// async function photographerPageInit() {
//     try{
//         const { media } = await getAllData();
//         displayMedia(media);
//     } catch (error) {
//         console.error(error);
//     }
// }

// photographerPageInit();


