/********** Open the lightbox ***********/

/** openLightbox is called in the displayMedia function - addEventListener when clicking on a media */

function openLightbox(mediaId) {
  const lightboxModal = document.querySelector("#lightbox-modal");
  lightboxModal.style.display = "flex";

  addAriaHidden();
  prevTabIndex();

  lightboxModal.focus();

  const lightboxContainers = document.querySelectorAll(".lightbox-container");
  const lightboxContainersArray = Array.from(lightboxContainers);

  lightboxContainersArray.forEach(function (container) {
    const imgElement = container.querySelector("img");
    const videoElement = container.querySelector("video");

    if (imgElement && parseInt(imgElement.dataset.id) === mediaId) {
      container.style.display = "flex";
      container.setAttribute("tabindex", "2");
    } else if (videoElement && parseInt(videoElement.dataset.id) === mediaId) {
      container.style.display = "flex";
      container.setAttribute("tabindex", "2");
    } else {
      container.style.display = "none";
      container.setAttribute("tabindex", "2");
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
  removeAriaHidden();
  restoreTabindex();

  const firstChildOfMediaSection = document.querySelector(
    ".media-section :first-child"
  );
  firstChildOfMediaSection.focus();
}

document.addEventListener("keyup", function (event) {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

/*********** Set the previous value of tabindex ***********/

function prevTabIndex() {
  const elementsWithTabindex = document.querySelectorAll(
    "header [tabindex], main [tabindex]"
  );
  elementsWithTabindex.forEach((element) => {
    element.dataset.prevTabindex = element.getAttribute("tabindex");
    element.setAttribute("tabindex", "-1");
  });
}

function restoreTabindex() {
  const elementsWithTabindex = document.querySelectorAll(
    "header [tabindex], main [tabindex]"
  );
  elementsWithTabindex.forEach((element) => {
    const prevTabindex = element.dataset.prevTabindex;
    if (prevTabindex !== null) {
      element.setAttribute("tabindex", prevTabindex);
    } else {
      element.removeAttribute("tabindex");
    }
  });
}

/********** Add aria-hidden attribute to the background elements when a modal is opened ***********/

function addAriaHidden() {
  const backgroundElements = document.querySelectorAll("main, header");
  backgroundElements.forEach((element) => {
    element.setAttribute("aria-hidden", "true");
  });
}

function removeAriaHidden() {
  const backgroundElements = document.querySelectorAll("main, header");
  backgroundElements.forEach((element) => {
    element.removeAttribute("aria-hidden");
  });
}
