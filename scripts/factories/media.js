async function mediaFactory(mediaItem) {
  const { id, photographerId, title, image, video, likes, date, price, name } =
    mediaItem;

  const mediaElement = document.createElement("article");
  mediaElement.className = "media-item";

  //Generate the name of the photographer without spaces to create the media URL
  async function getPhotographerNameForLink() {
    const photographerData = await findingPhotographId();
    const photographerName = photographerData.name.replace(/ /g, "%20");
    return photographerName;
  }

  async function getMediaCardDom() {
    const photographerName = await getPhotographerNameForLink();

    if (mediaItem.image) {
      const mediaURL = `././assets/photographers/${photographerName}/${image}`;

      const imageElement = document.createElement("img");
      imageElement.classList.add("media-diaplayed", `id-${mediaItem.id}`);
      imageElement.setAttribute("data-id", mediaItem.id);
      imageElement.setAttribute("src", mediaURL);
      imageElement.alt = mediaItem.title;
      mediaElement.appendChild(imageElement);
    } else if (mediaItem.video) {
      const mediaURL = `././assets/photographers/${photographerName}/${video}`;

      const videoElement = document.createElement("video");
      videoElement.classList.add("media-displayed", `id-${mediaItem.id}`);
      videoElement.setAttribute("data-id", mediaItem.id);

      videoElement.setAttribute("src", mediaURL);
      videoElement.controls = true;
      mediaElement.appendChild(videoElement);
    }

    const mediaTitle = document.createElement("p");
    mediaTitle.innerHTML = title;
    mediaElement.appendChild(mediaTitle);

    return mediaElement;
  }

  async function getMediaLightbox() {
    const photographerName = await getPhotographerNameForLink();
    const lightboxContainer = document.createElement("div");
    lightboxContainer.setAttribute("class", "lightbox-container");
    const lightboxModal = document.querySelector("#lightbox-modal");
    lightboxModal.appendChild(lightboxContainer);

    const btnNext = document.querySelector(".lightbox-btn-next");
    lightboxModal.insertBefore(lightboxContainer, btnNext);

    if (mediaItem.image) {
      const mediaURL = `././assets/photographers/${photographerName}/${image}`;

      const imageElement = document.createElement("img");
      imageElement.classList.add("media-lightbox", `id-${mediaItem.id}`);
      imageElement.setAttribute("data-id", mediaItem.id);

      imageElement.setAttribute("src", mediaURL);
      imageElement.alt = mediaItem.title;
      lightboxContainer.appendChild(imageElement);
    } else if (mediaItem.video) {
      const mediaURL = `././assets/photographers/${photographerName}/${video}`;

      const videoElement = document.createElement("video");
      videoElement.classList.add("media-lightbox", `id-${mediaItem.id}`);
      videoElement.setAttribute("data-id", mediaItem.id);

      videoElement.setAttribute("src", mediaURL);
      videoElement.controls = true;
      lightboxContainer.appendChild(videoElement);
    }

    const mediaTitle = document.createElement("p");
    mediaTitle.innerHTML = title;
    lightboxContainer.appendChild(mediaTitle);

    return lightboxContainer;
  }

  return { getMediaCardDom, getMediaLightbox };
}
