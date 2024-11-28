


function Lightbox(photo_id) {

    const lightbox = document.querySelector('.lightbox');
    lightbox.style.display = 'block';


    document.body.style.overflow = 'hidden';


    const images = lightbox.querySelectorAll(".thumbnail-lightbox");
    images.forEach(image => {
        image.style.display = "none";
        image.classList.remove("active");
    });


    const image = lightbox.querySelector(`.thumbnail-lightbox[data-id="${photo_id}"]`);
    image.style.display = "block";
    image.classList.add("active");
}

// Fonction pour masquer la lightbox//
function CacherLightbox() {

    const lightbox = document.querySelector('.lightbox');
    lightbox.style.display = 'none';

    
    document.body.style.overflow = 'auto';
}

// Fonction pour afficher l'image suivante dans la lightbox//
function Imgsuivante() {

    const activeImage = document.querySelector('.thumbnail-lightbox.active');


    let nextImage = activeImage.nextElementSibling;
    if (!nextImage) {
        nextImage = document.querySelector('.thumbnail-lightbox:first-of-type');
    }

    // Désactive l'image actuelle et active l'image suivante//
    activeImage.classList.remove('active');
    nextImage.classList.add('active');
    Lightbox(nextImage.dataset.id);
}

// Fonction pour afficher l'image précédente dans la lightbox//
function Imgprécédente() {
    const activeImage = document.querySelector('.thumbnail-lightbox.active');

    let previousImage = activeImage.previousElementSibling;
    if (!previousImage) {
        previousImage = document.querySelector('.thumbnail-lightbox:last-of-type');
    }


    activeImage.classList.remove('active');
    previousImage.classList.add('active');


    Lightbox(previousImage.dataset.id);
}


function addHoverEventListeners() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('mouseenter', function () {
            thumbnail.classList.add('is-hovered');
        });

        thumbnail.addEventListener('mouseleave', function () {
            thumbnail.classList.remove('is-hovered');
        });
    });
}

// ouvrir la lightbox au clic sur l'icône d'agrandissement
const expandIcons = document.querySelectorAll('.thumbnail-hover__expand');
expandIcons.forEach(expandIcon => {
    expandIcon.addEventListener('click', function (event) {
        event.stopPropagation();
        const photoId = expandIcon.closest('.thumbnail').dataset.id;
        Lightbox(photoId);
    });
});

// Déclenche la fonction pour attacher les événements de hover au chargement initial//
addHoverEventListeners();


document.addEventListener('DOMContentLoaded', function () {

    const closeButton = document.querySelector('.lightbox__close');
    if (closeButton) {
        closeButton.addEventListener('click', function () {
            CacherLightbox();
        });
    }

    // Sélectionne du bouton suivant dans la lightbox//
    const nextButton = document.querySelector('.lightbox__next');
    if (nextButton) {
        nextButton.addEventListener('click', function () {
            Imgsuivante();
        });
    }

    // Sélectionn du bouton précédent dans la lightbox//
    const prevButton = document.querySelector('.lightbox__prev');
    if (prevButton) {
        prevButton.addEventListener('click', function () {
            Imgprécédente();
        });
    }
});



