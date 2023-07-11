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

    //Create a div .media-caption to include the media title, the heart icon and the likes counter
    const mediaCaption = document.createElement("div");
    mediaCaption.classList.add("media-caption");
    mediaElement.appendChild(mediaCaption);

    const mediaTitle = document.createElement("p");
    mediaTitle.innerHTML = title;
    mediaCaption.appendChild(mediaTitle);

    //Create a div .like-content inside the .media-caption div, to include the heart icon and the likes counter
    const likeContent = document.createElement("div");
    mediaCaption.appendChild(likeContent);
    likeContent.classList.add("like-content");

    likeContent.innerHTML = `<span class="individual-nb-likes">${likes}</span><svg class="heart-icon" xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none">
    <g transform="translate(3 3)"><path class="heart-not-liked" d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z"/>
    <path class="heart-liked" d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z"/>
    </g></svg>`;

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
