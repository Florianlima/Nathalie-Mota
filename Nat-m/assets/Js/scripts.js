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