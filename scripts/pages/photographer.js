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

/********** Display the media in the galery and in the lightbox **********/

async function displayMedia(media) {
  const mediaSection = document.querySelector(".media-section");
  let totalLikes = 0;

  const sortBy = urlParams.get("sortby");
  const sortedMedia = getSortedMedia(media, sortBy);

  for (const mediaItem of sortedMedia) {
    const mediaModel = await mediaFactory(mediaItem);
    const mediaCardDOM = await mediaModel.getMediaCardDom();
    mediaSection.appendChild(mediaCardDOM);

    const likeContentDiv = mediaCardDOM.querySelector(".like-content");

    setupLikeButton(likeContentDiv);
    setupLightboxTrigger(mediaCardDOM, mediaItem.id);

    await mediaModel.getMediaLightbox(); //Creation of the media in the lightbox
    const likeCounterSpan = mediaCardDOM.querySelector(".individual-nb-likes");
    const likes = parseInt(likeCounterSpan.textContent);
    if (!isNaN(likes)) {
      totalLikes += likes;
    }
  }

  displayTotalLikes(totalLikes);
}

//Open Lightbox except if the clicked element is part of the .like-content div
function setupLightboxTrigger(mediaCardDOM, mediaId) {
  mediaCardDOM.addEventListener("click", function (event) {
    const clickedElement = event.target;
    if (!isLikeContentElement(clickedElement)) {
      openLightbox(mediaId);
    }
  });

  mediaCardDOM.addEventListener("keyup", function (event) {
    if (event.key === "Enter" && !isLikeContentElement(event.target)) {
      openLightbox(mediaId);
    }
  });
}

function isLikeContentElement(element) {
  //element is the clicked element: we want to check it is not part of the like-content div
  return (
    //closest() checks if 'element' has an ancestor with the like-content class
    element.classList.contains("like-content") ||
    element.closest(".like-content") !== null
  );
  //Boolean: return 'true' or 'false'
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

/********** LIKES COUNTER ***********/

/*********** Likes counter for each media ***********/

const likeContentDivs = document.querySelectorAll(".like-content");

likeContentDivs.forEach(function (likeContentDiv) {
  setupLikeButton(likeContentDiv);
});

//Add +1 or remove -1 for each media when users click on the like button

function setupLikeButton(likeContentDiv) {
  likeContentDiv.addEventListener("click", function () {
    toggleLike(likeContentDiv);
  });

  likeContentDiv.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      toggleLike(likeContentDiv);
    }
  });
}

function toggleLike(likeContentDiv) {
  const likeCountSpan = likeContentDiv.querySelector("span");
  const currentLikes = parseInt(likeCountSpan.textContent);

  if (likeContentDiv.classList.contains("liked")) {
    likeContentDiv.classList.remove("liked");
    likeCountSpan.textContent = currentLikes - 1;
    likeCountSpan.classList.remove("liked");
  } else {
    likeContentDiv.classList.add("liked");
    likeCountSpan.textContent = currentLikes + 1;
    likeCountSpan.classList.add("liked");
  }
  const totalLikes = calculateNewTotalLikes();
  updateTotalLikes(totalLikes);
}

// function setupLikeButton(likeContentDiv) {
//   likeContentDiv.addEventListener("click", function (event) {
//     // event.stopPropagation();
//     const likeCountSpan = likeContentDiv.querySelector("span");
//     const currentLikes = parseInt(likeCountSpan.textContent);

//     if (likeContentDiv.classList.contains("liked")) {
//       likeContentDiv.classList.remove("liked");
//       likeCountSpan.textContent = currentLikes - 1;
//       likeCountSpan.classList.remove("liked");
//     } else {
//       likeContentDiv.classList.add("liked");
//       likeCountSpan.textContent = currentLikes + 1;
//       likeCountSpan.classList.add("liked");
//     }
//     const totalLikes = calculateNewTotalLikes();
//     updateTotalLikes(totalLikes);
//   });
// }

/*********** Likes counter: total number of likes ***********/

//The price is generated in the Factory Function
//displayTotalLikes is called in displayMedia

function displayTotalLikes(totalLikes) {
  const fixedBox = document.querySelector(".fixed-box");
  fixedBox.setAttribute("tabindex", "2");
  const heartIcon = document.createElement("div");
  heartIcon.classList.add("likes-total-counter");
  const priceParagraph = fixedBox.querySelector("p");
  fixedBox.insertBefore(heartIcon, priceParagraph);
  heartIcon.innerHTML = `<span class="likes-total">${totalLikes}</span><svg class="heart-icon" xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 23 23">
  <g transform="translate (3 5)"><path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z" fill="#000000"/>
  </g></svg>`;
}

//Calculate the new number of total likes when users add a 'like' to a media
function calculateNewTotalLikes() {
  const likeCountSpans = document.querySelectorAll(".individual-nb-likes");
  let totalLikes = 0;

  for (const likeCountSpan of likeCountSpans) {
    const likes = parseInt(likeCountSpan.textContent);
    if (!isNaN(likes)) {
      totalLikes += likes;
    }
  }
  return totalLikes;
}

function updateTotalLikes(totalLikes) {
  const likesTotalSpan = document.querySelector(".likes-total");
  likesTotalSpan.textContent = totalLikes.toString();
}

/*********** Go to homepage */

function goToHomepage() {
  window.location.href = "index.html";
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    goToHomepage();
  }
}

/********** Edit the URL adding a new parameter 'sortby' */
const filterSelect = document.getElementById("filter-select");
filterSelect.addEventListener("change", updateURL);

function addSortByParam() {
  let sortBy = urlParams.get("sortby");
  if (!sortBy) {
    sortBy = "popularity";
    urlParams.set("sortby", sortBy);
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    filterSelect.value = "popularity";
    history.replaceState(null, null, newUrl);
  } else {
    filterSelect.value = sortBy;
  }
}

addSortByParam();

function updateURL() {
  const selectedValue = filterSelect.value;
  // const urlParams = new URLSearchParams(window.location.search);
  urlParams.set("sortby", selectedValue);
  const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
  // history.replaceState(null, null, newUrl); // Mettre à jour l'URL sans rafraîchir la page
  // location.reload();

  window.location.replace(newUrl);
}

function getSortedMedia(media, sortBy) {
  switch (sortBy) {
    case "popularity":
      return media.sort((a, b) => b.likes - a.likes);
    case "date":
      return media.sort((a, b) => new Date(b.date) - new Date(a.date));
    case "title":
      return media.sort((a, b) => a.title.localeCompare(b.title));
  }
}
