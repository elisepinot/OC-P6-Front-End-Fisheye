/********** Get the data of the JSON file - photographers only ***********/

async function getPhotographers() {
  try {
    const response = await fetch("/data/photographers.json");
    if (!response.ok) {
      throw new Error(
        "Erreur lors de la récupération des données des photographes."
      );
    }
    const data = await response.json(); // Convert the response into JSON format
    return data.photographers; // Return the photographers objects only
  } catch (error) {
    console.error(error); // Display the error in the console in case of failure
    return []; // Return an empty array in case of error
  }
}

/********** Display photographers ***********/

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  //Each photographer is sent to the photographerFactory: an instance is created, then added to the photographer section
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    // photographerModel : [object Object]
    const userCardDOM = photographerModel.getUserCardDOM();
    // userCardDom : [object HTMLElement]
    photographersSection.appendChild(userCardDOM);
  });
}

/********** Initialize the photographer section **********/

async function init() {
  try {
    // Récupère les datas des photographes
    // Code au départ :
    // const { photographers } = await getPhotographers();
    // Modifié car fonction getPhotographers() ne renvoie pas un objet avec une propriété "photographers", mais renvoie directement l'objet qui contient les 6 photographes
    const photographers = await getPhotographers();
    console.log("La variable photographers stocke : " + photographers);
    displayData(photographers);
  } catch (error) {
    console.error(error);
  }
}

init();
