


// Fonction pour afficher la lightbox avec une image spécifique
function Lightbox(photo_id) {
    const lightbox = document.querySelector('.lightbox');
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';



    const images = lightbox.querySelectorAll('.thumbnail-lightbox');

    console.log(images);
    images.forEach(image => {
        image.style.display = 'none';
        image.classList.remove('active');
    });

    const image = lightbox.querySelector(`.thumbnail-lightbox[data-id="${photo_id}"]`);
    image.style.display = 'block';
    image.classList.add('active');
}

// Fonction pour cacher la lightbox
function CacherLightbox() {
    const lightbox = document.querySelector('.lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Fonction pour naviguer dans les images de la lightbox
function changeImage(direction) {
    const activeImage = document.querySelector('.thumbnail-lightbox.active');
    let newImage;

    if (direction === 'next') {
        newImage = activeImage.nextElementSibling || document.querySelector('.thumbnail-lightbox:first-of-type');
    } else {
        newImage = activeImage.previousElementSibling || document.querySelector('.thumbnail-lightbox:last-of-type');
    }

    activeImage.classList.remove('active');
    newImage.classList.add('active');
    Lightbox(newImage.dataset.id);
}

// Ajout des écouteurs d'événements pour les images miniatures
function addHoverEventListeners() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('mouseenter', () => thumbnail.classList.add('is-hovered'));
        thumbnail.addEventListener('mouseleave', () => thumbnail.classList.remove('is-hovered'));
    });
}

// Ajout des écouteurs d'événements pour les icônes d'agrandissement
function addExpandIconsListeners() {
    const expandIcons = document.querySelectorAll('.thumbnail-hover__expand');
    expandIcons.forEach(expandIcon => {
        expandIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            const photoId = expandIcon.closest('.thumbnail').dataset.id;
            Lightbox(photoId);
        });
    });
}

// Initialisation des écouteurs d'événements au chargement du DOM
document.addEventListener('DOMContentLoaded', function () {
    attachEvent('.lightbox__close', 'click', CacherLightbox);
    attachEvent('.lightbox__next', 'click', () => changeImage('next'));
    attachEvent('.lightbox__prev', 'click', () => changeImage('prev'));
    addHoverEventListeners();
    addExpandIconsListeners();
});

function attachEvent(selector, eventType, callback) {
    const element = document.querySelector(selector);
    if (element) {
        element.addEventListener(eventType, callback);
    }
}


// Fonction pour attacher les écouteurs d'événements
document.addEventListener('DOMContentLoaded', function () {

    function attachEvent(selector, eventType, callback) {
        const element = document.querySelector(selector);
        if (element) {
            element.addEventListener(eventType, callback);
        }
    }


    attachEvent('.lightbox__close', 'click', CacherLightbox);
    // attachEvent('.lightbox__next', 'click', Imgsuivante);
    // attachEvent('.lightbox__prev', 'click', Imgprécédente);
});




