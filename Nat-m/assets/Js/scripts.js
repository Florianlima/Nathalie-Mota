// Permet de déclarer une variable pour stocker la référence à la modale//
const modalContainer = document.querySelector(".modal-container");

// Événement lors du chargement du DOM pour les fonctionnalités liées à la modale de contact dans le menu principal//
document.addEventListener("DOMContentLoaded", function () {
    // Sélectionne des éléments DOM importants//
    const overlay = document.querySelector(".overlay");
    const modal = document.querySelector(".modal");
    const contactTrigger = document.querySelector(".menu-item-18 > a");

    // Ajoute une classe "modal-trigger" au bouton de contact dans le menu principal//
    contactTrigger.classList.add("modal-trigger");

    // Ajoute des écouteurs d'événements pour le bouton de contact et les éléments de la modale//
    contactTrigger.addEventListener("click", function (event) {
        event.preventDefault();
        // Appel la fonction pour basculer l'état actif de la modale//
        toggleModal();
    });

    overlay.addEventListener("click", function (event) {
        event.preventDefault();
        // Appel la fonction pour basculer l'état actif de la modale//
        toggleModal();
    });

    modal.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    // Fonction pour basculer l'état actif de la modale//
    function toggleModal() {
        modalContainer.classList.toggle("active");
    }
});

// Relie la modale de contact au bouton sur le post ACF//
document.addEventListener("DOMContentLoaded", function () {
    const contactTriggerCPT = document.querySelector(".contact-button");

    // Ajoute un écouteur d'événements pour le bouton de contact sur le post ACF//
    if (contactTriggerCPT) {
        contactTriggerCPT.addEventListener("click", toggleModalCPT);
    }
});

// Fonction pour le bouton de contact sur le post ACF//
function toggleModalCPT() {
    // permet d'afficher ou cacher la modale de contact//
    modalContainer.classList.toggle("active");
    console.log("Bouton contact cliqué !");
}

// Pour que les titres de plusieurs mots aillent à la ligne//
const lineBreakTitles = document.querySelectorAll(".line-break-title");
lineBreakTitles.forEach(function(title) {
    const words = title.textContent.split(" ");
    // Remplacer les espaces par des sauts de ligne dans le titre//
    title.innerHTML = words.join("<br>");
});

// Permet de préremplir automatiquement le champ REF.PHOTO dans la modale de contact//
const contactButton = document.querySelector('.contact-button');
const modalRefField = document.querySelector('input[name="your-subject"]'); 

if (contactButton && modalRefField) {
    contactButton.addEventListener('click', function (event) {
        event.preventDefault();

        // Récupére la référence de la photo depuis l'élément post-reference//
        const referenceElement = document.querySelector('.post-reference');
        const reference = referenceElement ? referenceElement.textContent.trim().replace('Référence : ', '') : '';

        // Permet de préremplir le champ REF.PHOTO dans la modale de contact//
        modalRefField.value = reference;
    });
}