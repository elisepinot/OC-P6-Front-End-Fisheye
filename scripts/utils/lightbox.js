/********** Open the lightbox ***********/

/** openLightbox is called in the displayMedia function - addEventListener when clicking on a media */

function openLightbox(mediaId) {
  const lightboxModal = document.querySelector("#lightbox-modal");
  lightboxModal.style.display = "flex";

  const lightboxContainers = document.querySelectorAll(".lightbox-container");
  const lightboxContainersArray = Array.from(lightboxContainers);

  lightboxContainersArray.forEach(function (container) {
    const imgElement = container.querySelector("img");
    const videoElement = container.querySelector("video");

    if (imgElement && parseInt(imgElement.dataset.id) === mediaId) {
      container.style.display = "flex";
    } else if (videoElement && parseInt(videoElement.dataset.id) === mediaId) {
      container.style.display = "flex";
    } else {
      container.style.display = "none";
    }
  });
}

/********** Navigate among media ***********/

function navigateMedia(direction) {
  const lightboxContainers = document.querySelectorAll(".lightbox-container");
  const lightboxContainersArray = Array.from(lightboxContainers);

  const currentIndex = lightboxContainersArray.findIndex(function (container) {
    return container.style.display === "flex";
  });

  let nextIndex;

  if (direction === "prev") {
    nextIndex = currentIndex - 1;
    if (nextIndex < 0) {
      nextIndex = lightboxContainersArray.length - 1;
    }
  } else if (direction === "next") {
    nextIndex = currentIndex + 1;
    if (nextIndex >= lightboxContainersArray.length) {
      nextIndex = 0;
    }
  }

  lightboxContainersArray.forEach(function (container, index) {
    if (index === nextIndex) {
      container.style.display = "flex"; // Afficher le média suivant ou précédent
    } else {
      container.style.display = "none"; // Masquer les autres médias
    }
  });
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    navigateMedia("prev");
  } else if (event.key === "ArrowRight") {
    navigateMedia("next");
  }
});

/********** Close contact form and remove the filter on the body ***********/

function closeLightbox() {
  const lightbox = document.getElementById("lightbox-modal");
  lightbox.style.display = "none";
}

/************ ANCIEN CODE POUR AFFICHER LA LIGHTBOX */

// function openLightbox(mediaId) {
//   //Display of the lightbox
//   const lightboxModal = document.querySelector("#lightbox-modal");
//   lightboxModal.style.display = "block";

//   const lightboxContainers = document.querySelectorAll(".lightbox-container");
//   const lightboxContainersArray = Array.from(lightboxContainers);

//   lightboxContainersArray.forEach(function (container, index) {
//     const imgElement = container.querySelector("img");
//     const videoElement = container.querySelector("video");

//     if (imgElement && parseInt(imgElement.dataset.id) === mediaId) {
//       container.style.display = "flex";
//       // navigateMedia(index);
//       // Appel de la fonction pour naviguer vers l'index actuel
//     } else if (videoElement && parseInt(videoElement.dataset.id) === mediaId) {
//       container.style.display = "flex";
//       // navigateMedia(index);
//       // Appel de la fonction pour naviguer vers l'index actuel
//     } else {
//       container.style.display = "none"; // Masque les autres divs
//     }
//   });

//   function navigateMedia(direction) {
//     // Code pour naviguer vers l'élément à l'index spécifié
//     // Vous pouvez implémenter votre logique de navigation ici

//     console.log("Navigating to index:", direction);
//   }

//   navigateMedia(index); // Appel initial pour naviguer vers l'index trouvé
// }
