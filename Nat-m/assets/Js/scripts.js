
const modalContainer = document.querySelector(".modal-container");


document.addEventListener("DOMContentLoaded", function () {

    const overlay = document.querySelector(".overlay");
    const modal = document.querySelector(".modal");
    const contactTrigger = document.querySelector(".menu-item-18 > a");


    contactTrigger.classList.add("modal-trigger");


    contactTrigger.addEventListener("click", function (event) {
        event.preventDefault();

        toggleModal();
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

        console.log("Données envoyées", data.toString());

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
                console.log("Réponse reçue", responseData);

                if (responseData.success && responseData.data.html) {
                    const photosList = document.getElementById('photos-list');
                    if (replace) {
                        photosList.innerHTML = responseData.data.html;
                    } else {
                        photosList.insertAdjacentHTML('beforeend', responseData.data.html);
                    }
                    currentPage++;
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




