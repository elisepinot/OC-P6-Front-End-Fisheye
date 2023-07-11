/*
 * Dans cette fonction, les propriétés name, portrait, etc. sont extraites de l'objet data (passé en argument) à l'aide de la déstructuration
 * La fonction getUserCardDOM crée un élément article qui contient une image, un titre, etc.
 * L'objet est retourné à partir de la fonction "photographerFactory", contenant les propriétés "name" et "picture", ainsi que la fonction "getUserCardDOM".
 */

function photographerFactory(data) {
  // On extrait les valeurs name, portrait, etc. de l'objet data et on les assigne aux variables "name", "portrait", etc. pour accéder directement à ces valeurs
  const { name, portrait, city, country, tagline, price, id } = data;

  // console.log(data); // retourne 6 objets (1 objet = 1 photographe)

  const picture = `././assets/photographers/Photographers_ID_Photos/${portrait}`;
  const link = `./photographer.html?id=${id}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("class", "id-photo");
    const photographerName = document.createElement("h2");
    photographerName.textContent = name;

    const place = document.createElement("p");
    place.setAttribute("class", "place");
    place.textContent = country + ", " + city;

    const motto = document.createElement("p");
    motto.setAttribute("class", "tagline");
    motto.textContent = tagline;

    const cost = document.createElement("p");
    cost.setAttribute("class", "price");
    cost.textContent = price + "€/jour";

    //code ajouté Etape 4 + article.appendChild(img) mis en commentaire
    const linkToPhotographerPage = document.createElement("a");
    linkToPhotographerPage.setAttribute("href", link);
    linkToPhotographerPage.appendChild(img);
    article.appendChild(linkToPhotographerPage);

    // article.appendChild(img);
    article.appendChild(photographerName);
    article.appendChild(place);
    article.appendChild(motto);
    article.appendChild(cost);

    return article;
  }

  function getPhotographerDOM() {
    const photographerHeader = document.querySelector(".photograph-header");

    /******** Div created for photographer details - Name, place & motto */
    const detailsContainer = document.createElement("div");
    detailsContainer.setAttribute("class", "details_container");
    // photographerHeader.appendChild(detailsContainer) //Pas besoin d'écrire cette ligne puisqu'on précise plus bas qu'on veut ajouter cette élément avant le bouton

    const photographerName = document.createElement("h2");
    photographerName.textContent = name;

    const place = document.createElement("p");
    place.setAttribute("class", "place");
    place.textContent = city + ", " + country;

    const motto = document.createElement("p");
    motto.setAttribute("class", "tagline");
    motto.textContent = tagline;

    detailsContainer.appendChild(photographerName);
    detailsContainer.appendChild(place);
    detailsContainer.appendChild(motto);

    const imageContainer = document.createElement("div");
    imageContainer.setAttribute("class", "image_container");

    /******** Div created for containing the photographer's picture *******/
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("class", "id-photo");

    photographerHeader.appendChild(imageContainer);
    imageContainer.appendChild(img);

    //*********** Defining where to insert the new DOM elements created : before and after the button */
    const button = document.querySelector(".contact_button");
    button.parentNode.insertBefore(detailsContainer, button);
    button.insertAdjacentElement("afterend", imageContainer);

    const fixedBox = document.querySelector(".fixed-box");
    const priceFixedBox = document.createElement("p");
    fixedBox.appendChild(priceFixedBox);
    priceFixedBox.textContent = price + "€ / jour";
  }

  // return { name, picture, getUserCardDOM, city, country, tagline, price, getPhotographerDOM}
  return { getUserCardDOM, getPhotographerDOM };
}
