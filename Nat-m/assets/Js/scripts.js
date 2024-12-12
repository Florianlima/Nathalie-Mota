
const modalContainer = document.querySelector(".modal-container");


document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.querySelector(".overlay");
    const modal = document.querySelector(".modal");
     const contactTrigger = document.querySelectorAll(".menu-item-18 > a");
     contactTrigger.forEach(contact => {
        contact.addEventListener("click", function (event) {
            event.preventDefault();
            console.log('aurevoir')
            toggleModal();
        });
        contact.classList.add("modal-trigger");
    });

    


    

    overlay.addEventListener("click", function (event) {
        event.preventDefault();

        toggleModal();
    });

    modal.addEventListener("click", function (event) {
        event.stopPropagation();
    });


    function toggleModal() {
        modalContainer.classList.toggle("active");
        
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const contactTriggerCPT = document.querySelector(".contact-button");


    if (contactTriggerCPT) {
        contactTriggerCPT.addEventListener("click", toggleModalCPT);
    }
});


function toggleModalCPT() {
    modalContainer.classList.toggle("active");
    console.log("Bouton contact cliqué !");
}


const lineBreakTitles = document.querySelectorAll(".line-break-title");
lineBreakTitles.forEach(function (title) {
    const words = title.textContent.split(" ");
    title.innerHTML = words.join("<br>");
});


const contactButton = document.querySelector('.contact-button');
const modalRefField = document.querySelector('input[name="your-subject"]');

if (contactButton && modalRefField) {
    contactButton.addEventListener('click', function (event) {
        event.preventDefault();


        const referenceElement = document.querySelector('.post-reference');
        const reference = referenceElement ? referenceElement.textContent.trim().replace('Référence : ', '') : '';


        modalRefField.value = reference;
    });
}


//---------------------- Requete AJAX ------------------------------//



document.addEventListener('DOMContentLoaded', function () {
    let currentPage = 2;

    document.querySelectorAll('.sel .label').forEach(label => {
        label.addEventListener('click', function (e) {
            e.stopPropagation();
            const wrapper = label.parentElement;
            toggleOptions(wrapper.id);
        });
    });

    document.body.addEventListener('click', function (e) {
        document.querySelectorAll('.sel').forEach(wrapper => {
            wrapper.classList.remove('open');
        });
    });

    function toggleOptions(wrapperId) {
        const wrapper = document.getElementById(wrapperId);
        document.querySelectorAll('.sel').forEach(wrapper => {
            if (wrapper.id !== wrapperId) {
                wrapper.classList.remove('open');
            }
        });
        wrapper.classList.toggle('open');
    }
    

    selectOption = function (wrapperId, value) {
        const wrapper = document.getElementById(wrapperId);
        const label = wrapper.querySelector('.label');
        const options = wrapper.querySelectorAll('.option');

        const defaultLabels = { 
            'photo-category-wrapper': 'Catégories',
             'format-wrapper': 'Formats',
             };

        options.forEach(option => {
            if (option.dataset.value === value) {
                option.classList.add('selected');
                label.innerHTML = option.textContent+'<i class="fas fa-chevron-down"></i>';
            } else {
                option.classList.remove('selected');
            }
        });

        const input = document.getElementById(wrapperId.replace('-wrapper', ''));
        input.value = value;
        if (!value) {
             label.innerHTML = defaultLabels[wrapperId] + '<i class="fas fa-chevron-down"></i>';
        }
        wrapper.classList.remove('open');
        updateFilters();
    }

    function updateFilters() {
        const category = document.getElementById('photo-category').value;
        const format = document.getElementById('format').value;
        const order = document.getElementById('sort-by').value;
        currentPage = 1;
        fetchPhotos(category, format, order, true);
    }

    const button = document.getElementById('load-more-btn');
    button.addEventListener('click', function () {
        const category = document.getElementById('photo-category').value;
        const format = document.getElementById('format').value;
        const order = document.getElementById('sort-by').value;
        fetchPhotos(category, format, order, false);
    });

    function fetchPhotos(category, format, order, replace = false) {
        const ajaxurl = button.getAttribute('data-ajaxurl');
        const data = new URLSearchParams();
        data.append('action', button.getAttribute('data-action'));
        data.append('nonce', button.getAttribute('data-nonce'));
        data.append('postid', button.getAttribute('data-postid'));
        data.append('page', currentPage);
    
        if (category) data.append('photo_category', category);
        if (format) data.append('format', format);
        if (order) data.append('order', order);
    
        fetch(ajaxurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache'
            },
            body: data
        })
            .then(response => response.json())
            .then(responseData => {
                if (responseData.success && responseData.data.html) {
                    const photosList = document.getElementById('photos-list');
                    const lightboxContainer = document.querySelector('.lightbox__container');
    
                    
                    if (replace) {
                        photosList.innerHTML = responseData.data.html;
                        lightboxContainer.innerHTML = responseData.data.html; 
                    } else {
                        photosList.insertAdjacentHTML('beforeend', responseData.data.html);
                        lightboxContainer.insertAdjacentHTML('beforeend', responseData.data.html); 
                    }
    
                    // Mise à jour des classes pour la Lightbox
                    lightboxContainer.querySelectorAll('.thumbnail').forEach(thumbnail => {
                        thumbnail.classList.remove('thumbnail'); 
                        thumbnail.classList.add('thumbnail-lightbox'); 
                    });
    
                    currentPage++;
                    addExpandIconsListeners(); 
                }
    
                if (!responseData.data.post_next_page) {
                    button.style.display = 'none';
                } else {
                    button.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Erreur Fetch:', error);
            });
    }
    
});


//---------------------- Menu Burger ------------------------------//



document.addEventListener('DOMContentLoaded', function() {
    const menuBurger = document.querySelector('.burgerBtn');
    const fullscreenMenu = document.querySelector('.fullscreenMenu');
    const menuLinks = document.querySelectorAll('.fullscreenMenu a');

    menuBurger.addEventListener('click', function() {
        menuBurger.classList.toggle('active');
        fullscreenMenu.classList.toggle('open');
        document.body.classList.toggle('no-scroll'); 
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuBurger.classList.remove('active');
            fullscreenMenu.classList.remove('open');
            document.body.classList.remove('no-scroll'); 
        });
    });
});



