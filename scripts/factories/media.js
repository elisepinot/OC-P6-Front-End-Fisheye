async function mediaFactory(mediaItem) {
  const { id, photographerId, title, image, video, likes, date, price, name } =
    mediaItem;

  const mediaElement = document.createElement("article");
  mediaElement.className = "media-item";

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
      imageElement.setAttribute("src", mediaURL);
      imageElement.alt = mediaItem.title;
      mediaElement.appendChild(imageElement);
    } else if (mediaItem.video) {
      const mediaURL = `././assets/photographers/${photographerName}/${video}`;

      const videoElement = document.createElement("video");
      videoElement.setAttribute("src", mediaURL);
      videoElement.controls = true;
      mediaElement.appendChild(videoElement);
    }

    const mediaTitle = document.createElement("p");
    mediaTitle.innerHTML = title;
    mediaElement.appendChild(mediaTitle);

    return mediaElement;
  }

  return { getMediaCardDom };
}
