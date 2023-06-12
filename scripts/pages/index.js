    // async function getPhotographers() {
    //     // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
    //     // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
    //     let photographers = [
    //         {
    //             "name": "Ma data test",
    //             "id": 1,
    //             "city": "Paris",
    //             "country": "France",
    //             "tagline": "Ceci est ma data test",
    //             "price": 400,
    //             "portrait": "account.png"
    //         },
    //         {
    //             "name": "Autre data test",
    //             "id": 2,
    //             "city": "Londres",
    //             "country": "UK",
    //             "tagline": "Ceci est ma data test 2",
    //             "price": 500,
    //             "portrait": "account.png"
    //         },
    //     ]
    //     // et bien retourner le tableau photographers seulement une fois récupéré
    //     return ({
    //         photographers: [...photographers, ...photographers, ...photographers]})
    // }

    async function getPhotographers() {

        try {
            const response = await fetch('/data/photographers.json');
            if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données des photographes.'); // Gestion des erreurs si la requête échoue
            }
            const data = await response.json(); // Conversion de la réponse en format JSON
            console.log(data.photographers[0])
            return data.photographers; // Retourne les données des photographes
        } catch (error) {
            console.error(error); // Affiche l'erreur dans la console en cas d'échec de la requête
            return []; // Retourne un tableau vide en cas d'échec
        }
        
    }
          

    /* 
    * displayData prend en paramètre le tableau des photographes récupérés.
    * Rôles : 
    * 1. parcourir le tableau des photographes
    * 2. créer une instance de photographe à l'aide du photographerFactory
    * 3. afficher  la carte du photographe dans la section appropriée du HTML
    * */


    async function displayData(photographers) {
        //photographers : simplement le paramètre de la fonction, n'a rien à voir avec la fonction précédente
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            //pour chaque photographe, j'envoie le photographe au photogrpaherFactory, je stocke dans photogra^her Model
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });


    };

  


    /* 
    * Fonction responsable de l'initialisation du projet
    * Elle appelle getPhotographers pour obtenir les données des photographes
    * Puis elle appelle displayData pour afficher les données dans l'interface utilisateur */
    
    async function init() {
        try{
            // Récupère les datas des photographes
            // Code au départ : 
            // const { photographers } = await getPhotographers();
            // Modifié car fonction getPhotographers() ne renvoie pas un objet avec une propriété "photographers", mais renvoie directement l'objet qui contient les 6 photographes
            const photographers = await getPhotographers();
            displayData(photographers);
        } catch (error){
            console.error(error); //Affiche l'erreur dans la console en cas d'echec
        }
    };

    /* La fonction init est appelée pour démarrer le projet */
    
    init();


       


