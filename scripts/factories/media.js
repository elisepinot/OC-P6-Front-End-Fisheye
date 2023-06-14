function mediaFactory(data){
    
    const { id, photographerId, title, image, likes, date, price } = data
    const picture = url(`../assets/photographers`)

    function getMediaCardDOM(){

        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture)

        //Code à écrire

        return (article)
    }

    return { getMediaCardDom }

}