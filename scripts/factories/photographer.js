/* 
* photographer.js = module JS qui exporte une fonction appelée photographerFactory
* Cette fonction prend un objet data en argument
* Dans cette fonction, les propriétés name et portrait sont extraites de l'objet data à l'aide de la déstructuration
* La fonction getUserCardDOM crée un élément article et un élément img
* L'attribut "src" de l'élément "img" est défini avec la valeur de la variable "picture". 
* Les éléments "img" et "h2" sont ajoutés comme enfants de l'élément "article". 
* L'objet est retourné à partir de la fonction "photographerFactory", contenant les propriétés "name" et "picture", ainsi que la fonction "getUserCardDOM".
* En résumé : ce fichier permet de créer une instance de photographe avec les propriétés extraites de l'objet "data" et fournit une fonction getUserCardDOM qui génère un élément DOM représentant une carte pour un photographe
Questions :
A quoi correspond un objet data ? 
* L'objet data fait référence à un élément JS qui contient les données nécessaires pour créer une instance de photographe.
* Dans ce code, l'objet data doit avoir deux propriétés : name et portrait
Qu'est-ce que la destructuration ?
* Permet d'extraire des valeurs d'un objet ou d'un tableau et de les assigner à des variables distinctes
* Objectif : accéder facilement aux valeurs d'un objet ou d'un tableau sans avoir à accéder à chaque propriété ou élément individuellement
*/

function photographerFactory(data) {
    // On extrait les valeurs name et portrait de l'objet data et on les assigne aux variables "name" et "portrait" pour accéder directement à ces valeurs
    const { name, portrait, city, country, tagline, price } = data;

    // console.log(data); // retourne 6 objets (1 objet = 1 photographe)

    const picture = `../assets/photographers/Photographers_ID_Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("class", "id-photo")
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        
        const place = document.createElement( 'p');
        place.setAttribute("class","place");
        place.textContent = country + ", " + city;
        
        const motto = document.createElement('p');
        motto.setAttribute("class", "tagline");
        motto.textContent = tagline;

        const cost = document.createElement('p');
        cost.setAttribute("class", "price");
        cost.textContent = price + "€/jour";

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(place);
        article.appendChild(motto);
        article.appendChild(cost);
        return (article);
    }
    // return { name, picture, getUserCardDOM, city, country, tagline, price }
    return { getUserCardDOM }

}

